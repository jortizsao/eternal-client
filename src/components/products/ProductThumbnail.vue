<template>
  <div class="product-thumbnail">
    <router-link :to="{ name: 'ProductDetailPage', params: { slug, id: product.id }}">
      <div class="shop-item">
        <div v-if="isSale" class="sale-flag">{{ $t('sale') }}</div>
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
          <transition name="fade">
            <img :src="mainImage" v-show="isImgLoaded" alt="productName" @load="isImgLoaded = true">
          </transition>
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
        </div>
      </div>
    </router-link>
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
    return {
      isImgLoaded: false,
    };
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
    slug() {
      return this.product.masterData.current.slug;
    },
    isSale() {
      return this.variant.price.discounted !== null;
      // if (this.product.masterData.current.categories.length) {
      //   return (
      //     this.product.masterData.current.categories
      //       .reduce((acc, category) => {
      //         return [...acc, ...category.ancestors, category];
      //       }, [])
      //       .filter(category => category.slug === 'sale').length > 0
      //   );
      // }

      // return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter {
  opacity: 0;
}
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
