<template>
  <div class="product-detail-add-to-whishlist">
    <div class="row">
      <ul class="product-actions-list list-inline">
        <li class="bag-items-li add-to-whishlist">
          <button type="submit" class="btn pdp-product-heart"></button>
        </li>
        <li>
          <a href="" class="btn pdp-product-reserve">
            <img class="store-thumb" src="~@/assets/img/store-icon-29-29px.png" :alt="$t('reserveInStore')">
            {{ $t('reserveInStore') }}
          </a>
        </li>
      </ul>
    </div>  
  </div>
</template>
<i18n>
en:
  reserveInStore: Reserve in store
de:
  reserveInStore: Im Shop reservieren
</i18n>