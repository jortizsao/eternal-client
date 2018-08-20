<template>
  <div class="product-detail-page">
    <div class="pdp-page">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 breadcrumb-col">
            <product-detail-breadcrumb :categories="breadcrumbCategories" :product-name="productName"></product-detail-breadcrumb>
          </div>
        </div>
        <div class="row product-info-row-pdp">
          <product-detail-info :product="product"></product-detail-info>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GET_PRODUCT_QUERY from '@/graphql/queries/products/GetProduct.gql';
import GET_PRODUCTS_QUERY from '@/graphql/queries/products/GetProducts.gql';
import ProductDetailBreadcrumb from './ProductDetailBreadcrumb.vue';
import ProductDetailInfo from './ProductDetailInfo.vue';
import productMixin from '../mixins/product-mixin';

export default {
  name: 'productDetailPage',
  props: {
    slug: {
      type: String,
      required: true,
    },
    id: String,
  },
  data() {
    return {
      product: null,
    };
  },
  mixins: [productMixin],
  computed: {
    breadcrumbCategories() {
      if (this.product && this.product.masterData.current.categories.length) {
        const topCategory = this.product.masterData.current.categories[0];

        return [...topCategory.ancestors, topCategory];
      }

      return [];
    },
    ...mapState('general', ['language']),
  },
  components: {
    ProductDetailBreadcrumb,
    ProductDetailInfo,
  },
  apollo: {
    product() {
      return {
        query() {
          if (this.id) {
            return GET_PRODUCT_QUERY;
          }

          return GET_PRODUCTS_QUERY;
        },
        variables() {
          if (this.id) {
            return {
              id: this.id,
              locale: this.language,
            };
          }

          return {
            where: `masterData(current(slug(en = "${this.slug}")))`,
            locale: this.language,
          };
        },
        update: data => {
          return data.products ? data.products.results[0] : data.product;
        },
        error(err) {
          this.$notify({
            type: 'error',
            text: `Error getting product: ${err}`,
          });
        },
      };
    },
  },
};
</script>
