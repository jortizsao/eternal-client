<template lang="html">
  <div class="dropdown-megamenu navbar navbar-default">
    <div class="navbar-collapse collapse">
      <ul class="nav navbar-nav">
        <li class="dropdown menu-large" v-for="rootCategory in categories.results">
          <a href="#" class="dropdown-toggle" :class="[isSale(rootCategory) ? 'sale icon-ribbon' : '']" data-toggle="dropdown">
            {{rootCategory.name}}
            <!-- <img class="mobile-plus-content visible-xs" src="{{@root.meta.assetsPath}}img/plus79.png" alt="{{i18n "main:more"}}"> -->
          </a>
          <!-- {{> common/nav-menu-category category=this}} -->
        </li>
        <!-- {{> common/nav-menu navMenu=header.navMenu}}
        {{#if header.location}}
        <li class="visible-xs location-xs">
          {{> common/location-selector-mobile location=header.location}}
        </li>
        {{/if}} -->
      </ul>
      <!-- {{> common/nav-menu-extension navMenu=header.navMenu}} -->
    </div>
  </div>
</template>

<script>
import GET_MAIN_CATEGORIES_QUERY from '@/graphql/queries/categories/GetMainCategories.gql';
import GET_CATEGORIES_QUERY from '@/graphql/queries/categories/GetCategories.gql';
import GET_ALL_CATEGORIES_QUERY from '@/graphql/queries/categories/GetAllCategories.gql';
import CHILDREN_FRAGMENT from '@/graphql/fragments/categories/ChildrenFragment.gql';
import CATEGORY_FRAGMENT from '@/graphql/fragments/categories/CategoryFragment.gql';

export default {
  data() {
    return {
      categories: [],
    };
  },
  created() {
    this.$apollo
      .query({
        query: GET_MAIN_CATEGORIES_QUERY,
        error(err) {
          this.$notify({ type: 'error', text: `Error getting main categories: ${err}` });
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
            this.$notify({ type: 'error', text: `Error getting children categories: ${err}` });
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
      return category.name.toLowerCase() === 'sale';
    },
  },
  apollo: {
    categories() {
      return {
        query: GET_ALL_CATEGORIES_QUERY,
        error(err) {
          this.$notify({ type: 'error', text: `Error getting all categories: ${err}` });
        },
        skip: true,
        fetchPolicy: 'cache-only',
      };
    },
  },
};
</script>
