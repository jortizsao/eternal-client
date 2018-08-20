<template>
  <div class="product-detail-add-to-cart">
    <div class="row select-row">
      <ul class="list-inline">
        <!-- {{#each product.attributes}}
          {{> catalog/product-attribute attribute=this variants=../product.variants identifiers=../product.variantIdentifiers}}
        {{/each}} -->
        <li class="size-guide-li">
          <!-- {{> catalog/size-guide}} -->
        </li>
      </ul>
    </div>
    <div class="row">
      <ul class="product-actions-list list-inline">
        <li class="bag-items-li">
          <select v-model="quantitySelected" name="quantity" class="bag-items" required>
            <option v-for="qty in [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]" :key="qty" :value="qty">{{qty}}</option>
          </select>
        </li>
        <li>
          <button type="submit" class="add-to-bag-btn text-center">
            <img class="bag-thumb" src="~@/assets/img/hand-bag-2-black.png" :alt="$t('cartAdd')">
            {{ $t('cartAdd') }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantitySelected: 1,
    };
  },
};
</script>
<i18n>
en:
  cartAdd: Add to Bag
de:
  cartAdd: In den Warenkorb
</i18n>