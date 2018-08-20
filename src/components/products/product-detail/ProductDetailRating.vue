<template>
  <div class="product-detail-rating">
    <rate :length="5" :readonly="true" v-model="productRate"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productRate: Math.floor(Math.random() * 5) + 1,
    };
  },
};
</script>