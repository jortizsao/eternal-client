<template>
  <div class="dropdown-megamenu navbar navbar-default">
    <nav-bar-desktop class="hidden-xs"
      :categories="categories.results"
      :get-category-slug="getCategorySlug" 
      :get-category-name="getCategoryName" 
      :is-sale="isSale" 
      @expand="expand" 
      @collapse="collapse">
    </nav-bar-desktop>
    <nav-bar-mobile class="hidden-sm hidden-md hidden-lg"
      :categories="categories.results"
      :get-category-name="getCategoryName"
      :get-category-slug="getCategorySlug"
      :is-sale="isSale" 
      @expand="expand" 
      @collapse="collapse">
    </nav-bar-mobile>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GET_MAIN_CATEGORIES_QUERY from '@/graphql/queries/categories/GetMainCategories.gql';
import GET_CATEGORIES_QUERY from '@/graphql/queries/categories/GetCategories.gql';
import GET_ALL_CATEGORIES_QUERY from '@/graphql/queries/categories/GetAllCategories.gql';
import CHILDREN_FRAGMENT from '@/graphql/fragments/categories/ChildrenFragment.gql';
import CATEGORY_FRAGMENT from '@/graphql/fragments/categories/CategoryFragment.gql';
import SET_IS_EXPANDED_FRAGMENT from '@/graphql/fragments/categories/SetIsExpandedFragment.gql';
import NavBarDesktop from './NavBarDesktop.vue';
import NavBarMobile from './NavBarMobile.vue';

export default {
  data() {
    return {
      categories: [],
      expandFunctions: [],
    };
  },
  created() {
    this.$apollo
      .query({
        query: GET_MAIN_CATEGORIES_QUERY,
        error(err) {
          this.$notify({
            type: 'error',
            text: `Error getting main categories: ${err}`,
          });
        },
      })
      .then(res => {
        return res.data.categories.results.reduce((childrenIds, category) => {
          return [...childrenIds, ...category.children.map(child => child.id)];
        }, []);
      })
      .then(secondLevelCategoryIds => {
        const ids = secondLevelCategoryIds.map(id => `"${id}"`).join(',');

        return this.$apollo.query({
          query: GET_CATEGORIES_QUERY,
          variables: {
            where: `parent(id in (${ids}))`,
          },
          error(err) {
            this.$notify({
              type: 'error',
              text: `Error getting children categories: ${err}`,
            });
          },
        });
      })
      .then(res => {
        const childrenMap = res.data.categories.results.reduce((acc, category) => {
          const existingValue = acc[category.parent.id];

          acc[category.parent.id] = existingValue ? [...existingValue, category] : [category];

          return acc;
        }, {});

        Object.keys(childrenMap).forEach(parentId => {
          const children = childrenMap[parentId];
          const parent = this.$apollo.provider.defaultClient.readFragment({
            id: `Category:${parentId}`,
            fragment: CATEGORY_FRAGMENT,
          });

          this.$apollo.provider.defaultClient.writeFragment({
            id: `Category:${parentId}`,
            fragment: CHILDREN_FRAGMENT,
            fragmentName: 'ChildrenFragment',
            data: {
              ...parent,
              children,
              __typename: 'Category',
            },
          });
        });

        this.$apollo.queries.categories.skip = false;
      });
  },
  methods: {
    isSale(category) {
      return category[`name_${this.language}`].toLowerCase() === 'sale';
    },
    getCategorySlug(category) {
      return category[`slug_${this.language}`];
    },
    expand(category) {
      if (!category.isExpanded) {
        this.$apollo.provider.defaultClient.writeFragment({
          id: `Category:${category.id}`,
          fragment: SET_IS_EXPANDED_FRAGMENT,
          fragmentName: 'SetIsExpandedFragment',
          data: {
            isExpanded: true,
            __typename: 'Category',
          },
        });
      }
    },
    collapse(category) {
      if (category.isExpanded) {
        this.$apollo.provider.defaultClient.writeFragment({
          id: `Category:${category.id}`,
          fragment: SET_IS_EXPANDED_FRAGMENT,
          fragmentName: 'SetIsExpandedFragment',
          data: {
            isExpanded: false,
            __typename: 'Category',
          },
        });
      }
    },
    getCategoryName(category) {
      return category[`name_${this.language}`];
    },
  },
  computed: {
    ...mapState('general', ['language']),
  },
  apollo: {
    categories() {
      return {
        query: GET_ALL_CATEGORIES_QUERY,
        error(err) {
          this.$notify({
            type: 'error',
            text: `Error getting all categories: ${err}`,
          });
        },
        skip: true,
        fetchPolicy: 'cache-only',
      };
    },
  },
  components: {
    NavBarDesktop,
    NavBarMobile,
  },
};
</script>
