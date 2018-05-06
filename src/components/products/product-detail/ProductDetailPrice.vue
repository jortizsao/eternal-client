<template>
  <div class="product-detail-price">
    <p class="product-price">
      <span v-if="oldPrice" class="discounted-price">{{oldPrice | money}}</span>
      <span>{{currentPrice | money}}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    price: Object,
  },
  data() {
    return {};
  },
  computed: {
    oldPrice() {
      return this.price.discounted ? this.price.value : null;
    },
    currentPrice() {
      return this.price.discounted ? this.price.discounted.value : this.price.value;
    },
  },
};
</script>

