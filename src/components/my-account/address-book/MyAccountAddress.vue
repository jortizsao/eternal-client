<template>
  <div id="my-account-address">
    <div>{{address.title | capitalizeAll}} {{address.firstName | capitalizeAll}} {{address.lastName | capitalizeAll}}</div>
    <div>{{address.streetName | capitalizeAll}}</div>
    <div>{{address.additionalStreetInfo | capitalizeAll}}</div>
    <div>{{address.city | capitalizeAll}}</div>
    <div>{{address.postalCode}} {{address.region | capitalizeAll}}</div>
    <div>{{address.country}}</div>
    <div class="address-book-edit-delete">
      <div>
        <a :href="'edit/' + address.id" @click.prevent="onEditAddress">
          <img src="~@/assets/img/edit-1.png" alt="edit icon">
          {{ $t('edit') }}
        </a>
      </div>
      <div>
        <button type="submit" @click.prevent="onDeleteAddress">
          <img src="~@/assets/img/delete-60px.png" alt="delete icon">
          {{ $t('delete') }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    onEditAddress() {
      this.$emit('editAddress', this.address);
    },
    onDeleteAddress() {
      this.$emit('deleteAddress', this.address);
    },
  },
};
</script>
<i18n>
en:
  edit: Edit
  delete: Delete
de:
  edit: Bearbeiten
  delete: Löschen
</i18n>
