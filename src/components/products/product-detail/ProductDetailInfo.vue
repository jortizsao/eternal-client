<template>
  <div class="product-detail-info" v-if="product">
    <div v-if="product" class="col-md-4 col-md-offset-1 col-sm-6">
      <product-detail-gallery :images="selectedVariant.images"></product-detail-gallery>
    </div>
    <div class="col-sm-6 product-description">
      <div class="row">
        <div class="col-sm-12">
          <product-detail-name :name="productName" :sku="selectedVariant.sku"></product-detail-name>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <product-detail-rating></product-detail-rating>
        </div>
      </div>
      <!-- 
      <div class="row">
        <div class="col-sm-12">
          <p class="pdp-product-description view-details more" data-text-show="{{i18n "catalog:description.show"}}" data-text-hide="{{i18n "catalog:description.hide"}}">{{{product.description}}}</p>
        </div>
      </div>  -->
      <div class="row">
        <div class="col-sm-12">
          <product-detail-price :price="selectedVariant.price"></product-detail-price>
        </div>
      </div>
      <product-detail-add-to-cart></product-detail-add-to-cart>
      <product-detail-add-to-wishlist></product-detail-add-to-wishlist>
      <!-- <product-detail-reserve-in-store></product-detail-reserve-in-store> -->
      <div class="row">
        <div class="col-sm-12">
          <div class="panel-group panel-group-pdp" id="accordion-product-info" role="tablist" aria-multiselectable="true">
            <product-detail-attributes :attributes="attributes"></product-detail-attributes>
            <product-detail-delivery-returns :deliveryRates="[]"></product-detail-delivery-returns>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <product-detail-social></product-detail-social>
        </div>
      </div>
      <!--
      {{> catalog/add-to-cart}}
      {{> catalog/add-to-wishlist-btn}}
      {{> catalog/reserve-in-store-btn}}
      <div class="row">
        <div class="col-sm-12">
          {{> catalog/product-availability availability=product.availability}}
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="panel-group panel-group-pdp" id="accordion-product-info" role="tablist" aria-multiselectable="true">
            {{> catalog/pdp/product-details}}
            {{> catalog/pdp/delivery-rates}}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          {{> catalog/pdp/product-social}}
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import ProductDetailGallery from './ProductDetailGallery.vue';
import ProductDetailName from './ProductDetailName.vue';
import ProductDetailRating from './ProductDetailRating.vue';
import ProductDetailPrice from './ProductDetailPrice.vue';
import ProductDetailAddToCart from './ProductDetailAddToCart.vue';
import ProductDetailAddToWishlist from './ProductDetailAddToWishlist.vue';
import ProductDetailReserveInStore from './ProductDetailReserveInStore.vue';
import ProductDetailAttributes from './ProductDetailAttributes.vue';
import ProductDetailDeliveryReturns from './ProductDetailDeliveryReturns.vue';
import ProductDetailSocial from './ProductDetailSocial.vue';
import productMixin from '../mixins/product-mixin';

export default {
  props: {
    product: Object,
  },
  data() {
    return {
      selectedVariantIndex: 0,
    };
  },
  mixins: [productMixin],
  computed: {
    masterVariant() {
      if (this.product) {
        return this.product.masterData.current.allVariants[0];
      }

      return {};
    },
    selectedVariant() {
      if (this.product) {
        return this.product.masterData.current.allVariants[this.selectedVariantIndex];
      }

      return {};
    },
    attributes() {
      return this.selectedVariant.attributesRaw;
    },
  },
  components: {
    ProductDetailGallery,
    ProductDetailName,
    ProductDetailRating,
    ProductDetailPrice,
    ProductDetailAddToCart,
    ProductDetailAddToWishlist,
    ProductDetailReserveInStore,
    ProductDetailAttributes,
    ProductDetailDeliveryReturns,
    ProductDetailSocial,
  },
};
</script>

<style>
</style>
