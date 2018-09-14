<template>
  <div class="product-detail-attributes">
    <div class="panel panel-default">
      <div class="panel-heading" role="tab" id="headingProductDetails">
        <h4 class="panel-title product-accordion-title text-uppercase">
          <a href="" @click.prevent="toggleIsVisible">
            {{ $t('details') }}
            <img class="accordion-plus" v-show="!isVisible" src="~@/assets/img/plus79.png" alt="accordion content">
            <img class="accordion-plus" v-show="isVisible" src="~@/assets/img/minus-1.png" alt="accordion content">
          </a>
        </h4>
      </div>
      <div id="collapseProductDetails" v-if="isVisible">
        <div class="panel-body panel-body-pdp">
          <ul class="product-features-list">
            <li v-for="attr in attributes" :key="attr.attributeDefinition.name">
              <span>{{attr.attributeDefinition.label}}:</span> 
              {{getAttributeValue(attr)}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    attributes: {
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
    getAttributeValue(attribute) {
      switch (attribute.attributeDefinition.type.name) {
        case 'lenum':
          return attribute.value.label[this.$i18n.locale];
        case 'enum':
          return attribute.value.label;
        case 'ltext':
          return attribute.value.label;
        default:
          return attribute.value;
      }
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
  details: Product Details
de:
  details: Produktdetails
</i18n>

