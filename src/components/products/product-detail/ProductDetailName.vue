<template>
  <div class="product-detail-name">
    <p>
      <h1 class="text-uppercase pdp-product-title">{{name}}</h1>
      <span class="grey-p quickview-sku">{{sku}}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    sku: String,
  },
  data() {
    return {};
  },
};
</script>
