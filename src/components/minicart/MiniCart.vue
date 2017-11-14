<template lang="html">
  <div class="minicart">
    <template v-if="cart && cart.lineItems.length">
      <button class="not-empty link-your-bag icon-hand-bag">
        <span class="hidden-xs hidden-sm cart">{{ $t('miniCart') }}</span>
        <span class="cart-item-number">{{cart.lineItems.length}}</span>
      </button>
      <div class="col-xs-12">
        <div class="nav-minicart">
        </div>
      </div>
    </template>
    <template v-else>
      <a href="" class="not-empty link-your-bag icon-hand-bag">
        <span class="hidden-xs hidden-sm cart">{{ $t('miniCart') }}</span>
        <span class="cart-item-number">0</span>
      </a>
    </template>
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

<i18n>
en:
  miniCart: Cart
de:
  miniCart: Warenkorb
</i18n>
