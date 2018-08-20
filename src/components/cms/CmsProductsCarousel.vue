<template>
  <div v-editable="blok" class="recommended-products-slider">
    <product-thumbnail v-for="product in products"
      :product="product"
      :variant="getSelectedVariant(product)"
      :key="product.id">
    </product-thumbnail>
  </div>
</template>

<script>
import { tns } from 'tiny-slider/src/tiny-slider.module';
import { mapState } from 'vuex';
import GET_PRODUCTS_BY_SKUS_QUERY from '@/graphql/queries/products/GetProductsBySkus.gql';
import ProductThumbnail from '@/components/products/ProductThumbnail.vue';

export default {
  props: ['blok'],
  data() {
    return {
      products: [],
      slider: null,
    };
  },
  apollo: {
    products() {
      return {
        query: GET_PRODUCTS_BY_SKUS_QUERY,
        variables() {
          return {
            skus: this.blok.products.map(p => p.sku),
            locale: this.language,
          };
        },
        fetchPolicy: 'cache-and-network',
        update: data => data.products.results,
        error(err) {
          this.$notify({
            type: 'error',
            text: `Error getting products by skus: ${err}`,
          });
        },
      };
    },
  },
  methods: {
    createSlider() {
      if (this.slider) {
        this.slider.destroy();
      }

      this.$nextTick(() => {
        this.slider = tns({
          container: '.recommended-products-slider',
          loop: this.blok.loop,
          controls: false,
          autoplay: false,
          autoplayButtonOutput: false,
          mouseDrag: false,
          responsive: {
            768: {
              items: 2,
            },
            1024: {
              items: 3,
            },
            1200: {
              items: 4,
            },
          },
        });
      });
    },
    getSelectedVariant(product) {
      return product.masterData.current.allVariants[0];
    },
  },
  computed: {
    ...mapState('general', ['language']),
  },
  watch: {
    blok: 'createSlider',
    products: 'createSlider',
  },
  components: {
    ProductThumbnail,
  },
};
</script>

<style lang="scss" scoped>
.tns-item {
  display: inline-block;
  text-align: center;
}
</style>
