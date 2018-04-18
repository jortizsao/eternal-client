<template>
  <div id="product-thumbnail">
    <a href="#">
      <div class="shop-item">
        <div v-if="product.sale" class="sale-flag">{{ $t('sale') }}</div>
        <div v-if="product.new" class="new-flag">{{ $t('new') }}</div>
        <!-- <form id="form-add-to-wishlist-mobile{{index}}" method="post" {{#if wishlist}}class="hidden"{{/if}} name="add-to-wishlist-mobile" action="{{@root.meta._links.addToWishlist.href}}">
            <input type="hidden" name="csrfToken" value="{{@root.meta.csrfToken}}"/>
            <input type="hidden" name="productId" value="{{product.productId}}">
            <input type="hidden" name="variantId" value="{{product.variantId}}">

            <button type="submit" class="heart-xs visible-xs">
            <span class="sr-only">{{i18n "catalog:wishlist.add"}}</span>
          </button>
        </form> -->
        <div class="pop-product-image">
          <img class="img-lazy" :src="mainImage" :alt="productName" />
        </div>
        <div class="pop-product-name">
          <span class="name-headline">{{productName}}</span>
          <span class="name-subline">{{productDescription}}</span>
        </div>
        <div class="pop-item-price">
          <template v-if="oldPrice">
            <span class="strikethrough">{{oldPrice | money}}</span>
            <span class="pop-item-price-old">{{price | money}}</span>
          </template>
          <template v-else>
            <span>{{price | money}}</span>
          </template>
        </div>
        <div class="pop-product-more-colors">
          <!-- {{!-- {{#if thumbnail.moreColors}}{{i18n "catalog:thumbnail.moreColors"}}{{/if}}&nbsp; --}} -->
          <ul class="list-inline">
            <li>
              <div class="product-thumbnail-swatch-red"></div>
            </li>
            <li>
              <div class="product-thumbnail-swatch-green"></div>
            </li>
            <li>
              <div class="product-thumbnail-swatch-blue"></div>
            </li>
          </ul>
        </div>
        <div class="shop-item-overlay hidden-xs">
          <button type="button" class="quickview">
            {{ $t('quickView') }}
          </button>
          <!--
          <button type="button" class="quickview" data-modal="quickview-modal{{index}}">
            {{i18n "catalog:thumbnail.quickView"}}
          </button>
          <form id="form-add-to-wishlist{{index}}" method="post" {{#if wishlist}}class="hidden"{{/if}} name="add-to-wishlist" action="{{@root.meta._links.addToWishlist.href}}">
              <input type="hidden" name="csrfToken" value="{{@root.meta.csrfToken}}"/>
              <input type="hidden" name="productId" value="{{product.productId}}">
              <input type="hidden" name="variantId" value="{{product.variantId}}">

              <button type="submit" class="heart">
              <span class="sr-only">{{i18n "catalog:wishlist.add"}}</span>
            </button>
          </form> -->
        </div>
      </div>
    </a>
    <!-- {{> catalog/quickview wishlist=wishlist}} -->
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    variant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    mainImage() {
      return this.variant.images && this.variant.images.length ? this.variant.images[0].url : '';
    },
    productName() {
      return this.product.masterData.current.name;
    },
    productDescription() {
      return this.product.masterData.current.description;
    },
    oldPrice() {
      return this.variant.price.discounted ? this.variant.price.value : null;
    },
    price() {
      return this.variant.price.discounted
        ? this.variant.price.discounted.value
        : this.variant.price.value;
    },
  },
  filters: {
    money(amount) {
      if (!amount) {
        return '-';
      }

      return `${amount.currencyCode} ${(amount.centAmount / 100).toFixed(2)}`;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
<i18n>
en:
  sale: Sale
  new: New
  quickView: Quick View
de:
  sale: Sale
  new: Neu
  quickView: Schnellansicht
</i18n>
