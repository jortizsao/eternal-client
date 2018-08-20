<template>
<div class="panel panel-default">
  <div class="panel-heading" role="tab" id="headingDelivery">
    <h4 class="panel-title product-accordion-title text-uppercase">
      <a href="" @click.prevent="toggleIsVisible">
        {{ $t('title') }}
        <img class="accordion-plus" v-show="!isVisible" src="~@/assets/img/plus79.png" alt="accordion content">
        <img class="accordion-plus" v-show="isVisible" src="~@/assets/img/minus-1.png" alt="accordion content">
      </a>
    </h4>
  </div>
  <div id="collapseDelivery" v-show="isVisible">
    <div class="panel-body panel-body-pdp">
      <ul class="product-delivery-list">

        <li v-for="deliveryRate in deliveryRates" :key="deliveryRate.id">
          <span>{{deliveryRate.name}}: {{deliveryRate.price}}</span> 
          <span v-if="delivery.freeAbove">(FREE for orders above {{delivery.freeAbove}})</span>
          <span v-if="deliveryRate.description">{{deliveryRate.description}}</span>
        </li>
        <li>{{ $t('freeReturns') }}</li>
      </ul>
    </div>
  </div>
</div>  
</template>

<script>
export default {
  props: {
    deliveryRates: {
      type: Array,
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    toggleIsVisible() {
      this.isVisible = !this.isVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
.panel-heading {
  border-bottom: none;
}
</style>

<i18n>
en:
  title: Delivery & Returns
  freeReturns: Free return for all orders.
de:
  title: Versand & Retoure
  freeReturns: Kostenlose Retoure
</i18n>