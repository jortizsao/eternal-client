<template lang="html">
  <div class="dropdown-megamenu navbar navbar-default">
    <div id="menu">
      <ul class="nav navbar-nav">
        <li class="dropdown menu-large" v-for="rootCategory in categories.results">
          <a :href="getCategoryLink(rootCategory)" class="dropdown-toggle" :class="[isSale(rootCategory) ? 'sale icon-ribbon' : '']" data-toggle="dropdown">
            {{rootCategory.name}}
            <template v-if="rootCategory.children.length">
              <a href="#" v-show="!rootCategory.isExpanded" @click.prevent="expand(rootCategory)">
                <span class="glyphicon glyphicon-plus mobile-plus-content visible-xs" aria-hidden="true"></span>
              </a>
              <a href="#" v-show="rootCategory.isExpanded" @click.prevent="collapse(rootCategory)">
                <span class="glyphicon glyphicon-minus mobile-plus-content visible-xs" aria-hidden="true"></span>
              </a>
            </template>
          </a>
          <ul v-if="rootCategory.children.length" class="dropdown-menu megamenu row dropdown-submenu hidden-xs">
            <li class="col-sm-8">
              <div class="nav-accordion">
                <template v-for="firstChild in rootCategory.children">
                  <h3><a :href="getCategoryLink(firstChild)">{{firstChild.name}}</a></h3>
                  <ul>
                    <li v-for="secondChild in firstChild.children">
                      <a :href="getCategoryLink(secondChild)">{{secondChild.name}}</a>
                    </li>
                  </ul>
                </template>
              </div>
            </li>
          </ul>

          <ul v-if="rootCategory.children && rootCategory.isExpanded" class="visible-xs">
            <li class="col-sm-8">
              <div class="nav-accordion">
                <template v-for="firstChild in rootCategory.children">
                  <h3><a :href="getCategoryLink(firstChild)">{{firstChild.name}}</a></h3>
                  <ul>
                    <li v-for="secondChild in firstChild.children">
                      <a :href="getCategoryLink(secondChild)">{{secondChild.name}}</a>
                    </li>
                  </ul>
                </template>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import GET_MAIN_CATEGORIES_QUERY from '@/graphql/queries/categories/GetMainCategories.gql';
import GET_CATEGORIES_QUERY from '@/graphql/queries/categories/GetCategories.gql';
import GET_ALL_CATEGORIES_QUERY from '@/graphql/queries/categories/GetAllCategories.gql';
import CHILDREN_FRAGMENT from '@/graphql/fragments/categories/ChildrenFragment.gql';
import CATEGORY_FRAGMENT from '@/graphql/fragments/categories/CategoryFragment.gql';
import SET_IS_EXPANDED_FRAGMENT from '@/graphql/fragments/categories/SetIsExpandedFragment.gql';

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
    getCategoryLink(category) {
      return `categories/${category.slug}`;
    },
    expand(category) {
      this.$apollo.provider.defaultClient.writeFragment({
        id: `Category:${category.id}`,
        fragment: SET_IS_EXPANDED_FRAGMENT,
        fragmentName: 'SetIsExpandedFragment',
        data: {
          isExpanded: true,
          __typename: 'Category',
        },
      });
    },
    collapse(category) {
      this.$apollo.provider.defaultClient.writeFragment({
        id: `Category:${category.id}`,
        fragment: SET_IS_EXPANDED_FRAGMENT,
        fragmentName: 'SetIsExpandedFragment',
        data: {
          isExpanded: false,
          __typename: 'Category',
        },
      });
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
