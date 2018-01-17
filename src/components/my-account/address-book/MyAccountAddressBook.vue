<template>
  <div id="my-account-address-book" class="address-book">
    <div class="address-book-content">
      <div class="row">
        <div class="col-sm-12">
          <div class="address-book-title hidden-xs">
            {{ $t('title') }}
          </div>
        </div>
      </div>
      <router-view :customer="customer"></router-view>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    customer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<i18n>
en:
  title: Address Book
de:
  title: Addressbuch
</i18n>
