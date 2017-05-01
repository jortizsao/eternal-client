<template lang="html">
  <div class="minicart">
    <div v-if="cart && cart.lineItems > 0">
      <button class="not-empty link-your-bag icon-hand-bag">
        <span class="hidden-xs hidden-sm">Cart</span>
        <span class="cart-item-number">{{cart.lineItems.length}}</span>
      </button>
      <div class="col-xs-12">
        <div class="nav-minicart">
        </div>
      </div>
    </div>
    <div v-else>
      <a href="" class="not-empty link-your-bag icon-hand-bag">
        <span class="hidden-xs hidden-sm">Cart</span>
        <span class="cart-item-number">0</span>
      </a>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {};
  },
  props: ['cart'],
};
</script>

<style lang="css">
</style>
