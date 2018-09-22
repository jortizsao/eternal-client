<template>
  <div class="product-list-page">
    <!-- this is the product list {{category}} {{query}} -->
    <div class="pop-page">
      <!-- <div class="row">
        <div class="col-xs-12 figure-col">
          {{> catalog/pop/banner banner=content.banner}}
        </div>
      </div> -->
      <div class="row row-offcanvas row-offcanvas-left">
        <!-- <div class="col-xs-12">
          {{> catalog/breadcrumb breadcrumb=content.breadcrumb}}
        </div> -->
        <div class="col-sm-12 nopadding">
          <!-- <div class="dark-overlay"></div> -->

          <!-- Mobile version -->
          <!-- <div class="row visible-xs">
            <div class="col-xs-12">
              <ul class="mobile-filter-list clearfix">
                <li class="pull-left">
                  <button type="button" class="offcanvas-btn offcanvas-open" data-toggle="modal" data-target="#sidebar-overlay">
                    {{i18n "catalog:filters.open"}}
                  </button>
                </li>
              </ul>
            </div>
            {{> catalog/pop/filters-sidebar-mobile}}
          </div> -->
          <!-- End mobile version -->
          <div class="jumbotron-row" v-if="category">
            <div class="jumbotron">
              <p v-if="category.parent">{{category.parent.name}}</p>
              <h2>{{category.name.toUpperCase()}}</h2>
            </div>
          </div>

          <div id="pop-product-list">
            <div v-for="product in products" :key="product.id" class="col-xs-6 col-md-3">
              <!-- {{> catalog/product-thumbnail thumbnail=this index=@index}} -->
              <product-thumbnail :product="product" :variant="product.masterData.current.allVariants[0]"></product-thumbnail>
            </div>
            <!-- {{> catalog/product-list products=content.products}} -->
            <infinite-loading ref="infiniteLoading" @infinite="fetchMore">
              <span slot="spinner">
                <!-- <div class="row" v-show="products">
                  <div class="col-sm-12 text-center">
                    <loader></loader>
                  </div>
                </div> -->
              </span>
              <span slot="no-more"></span>
              <span slot="no-results"></span>
            </infinite-loading>
            <div class="row" v-show="isProductSearchLoading">
              <div class="col-sm-12 text-center">
                <loader></loader>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import gql from 'graphql-tag';
import PRODUCTS_SEARCH_QUERY from '@/graphql/queries/products/ProductsSearch.gql';
import ProductThumbnail from '@/components/products/ProductThumbnail.vue';
import Loader from '@/components/commons/Loader.vue';

export default {
  name: 'productListPage',
  props: {
    categorySlug: String,
    categoryId: String,
    query: String,
  },
  data() {
    return {
      products: null,
      categories: null,
      page: 0,
      perPage: 16,
      categoriesMap: {},
    };
  },
  methods: {
    getCategory(categorySlug) {
      return this.categoriesMap[categorySlug];
    },
    createCategoryMap(category) {
      if (category.children && category.children.length) {
        const allChildrenCategories = category.children.reduce((allChildren, child) => {
          const allChildCategories = this.createCategoryMap(child);
          this.categoriesMap = {
            ...this.categoriesMap,
            [child.slug]: child,
          };
          return [...allChildren, ...allChildCategories];
        }, []);

        const allCategories = [...category.children, ...allChildrenCategories];
        this.categoriesMap = {
          ...this.categoriesMap,
          [category.slug]: category,
        };

        return allCategories;
      }

      return [];
    },
    createCategoriesMap() {
      this.categories.forEach(c => this.createCategoryMap(c));
    },
    fetchMore(infiniteState) {
      if (!this.products) {
        return this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
      }

      let filter = [];

      if (this.categoryFilter) {
        filter = [...filter, this.categoryFilter];
      }

      this.$apollo.queries.products.fetchMore({
        variables: {
          locale: this.language,
          // prettier-ignore
          offset: (this.currentPage * this.perPage) + 1,
          limit: this.perPage,
          filter,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newProducts = fetchMoreResult.productsSearch.results;

          if (!newProducts.length) {
            Vue.nextTick(() => {
              infiniteState.complete();
            });
            return previousResult.productsSearch;
          }

          Vue.nextTick(() => {
            infiniteState.loaded();
          });

          return {
            productsSearch: {
              // eslint-disable-next-line
              __typename: fetchMoreResult.productsSearch.__typename,
              results: [...previousResult.productsSearch.results, ...newProducts],
            },
          };
        },
      });
    },
    reset() {
      this.$apollo.queries.products.stop();
      this.products = null;
      this.$apollo.queries.products.start();
      if (this.$refs.infiniteLoading) {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
      }
    },
  },
  computed: {
    isProductSearchLoading() {
      return this.$apollo.queries.products.loading;
    },
    skipProductSearchQuery() {
      return Object.keys(this.categoriesMap).length === 0;
    },
    categoryFilter() {
      if (this.categoryId) {
        return `categories.id:subtree("${this.categoryId}")`;
      } else if (this.categorySlug) {
        if (this.category) {
          return `categories.id:subtree("${this.category.id}")`;
        }
        return '';
      } else {
        return '';
      }
    },
    currentPage() {
      return this.products ? Math.ceil(this.products.length / this.perPage) : 0;
    },
    category() {
      if (this.categoryId) {
        return Object.values(this.categoriesMap).find(category => category.id === this.categoryId);
      } else if (this.categorySlug) {
        return this.categoriesMap[this.categorySlug];
      } else {
        return null;
      }
    },
    ...mapState('general', ['language']),
  },
  apollo: {
    products() {
      return {
        query: PRODUCTS_SEARCH_QUERY,
        variables() {
          let filter = [];
          const variables = {
            locale: this.language,
            // prettier-ignore
            offset: 1,
            limit: this.perPage,
          };

          if (this.categoryFilter) {
            filter = [...filter, this.categoryFilter];
          }

          return filter.length ? { ...variables, filter } : variables;
        },
        update: data => data.productsSearch.results,
        error(err) {
          this.$notify({
            type: 'error',
            text: `Error getting products: ${err}`,
          });
        },
        skip() {
          return this.skipProductSearchQuery;
        },
      };
    },
    categories() {
      return {
        query: gql`
          query getCategories($locale: Locale) {
            categories(where: "parent is not defined") {
              results {
                ...CategoryFragment
                children {
                  ...CategoryFragment
                  children {
                    ...CategoryFragment
                  }
                }
              }
            }
          }

          fragment CategoryFragment on Category {
            id
            slug(locale: $locale)
            name(locale: $locale)
            parent {
              id
              name(locale: $locale)
            }
          }
        `,
        variables() {
          return {
            locale: this.language,
          };
        },
        update: data => data.categories.results,
        result() {
          this.createCategoriesMap();
        },
        error(err) {
          this.$notify({
            type: 'error',
            text: `Error getting categories: ${err}`,
          });
        },
      };
    },
  },
  watch: {
    $route: 'reset',
  },
  components: {
    ProductThumbnail,
    InfiniteLoading,
    Loader,
  },
};
</script>

