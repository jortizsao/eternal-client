<template>
  <div id="my-account-address-list">
    <div class="row">
      <div class="col-sm-6">
        <div class="box-addresses-title">
          {{ $t('defaultAddresses') }}
        </div>
        <transition-group name="default-address">
          <div v-if="defaultShippingAddress" :key="getAddressKey(defaultShippingAddress)" class="address-book-dark-box">
            <div :class="isDefaultBillingAndShipping ? 'address-book-dark-box-title-no-padding' : 'address-book-dark-box-title'">{{ $t('shippingAddress') }}</div>
            <div v-if="isDefaultBillingAndShipping" class="address-book-dark-box-title">{{ $t('billingAddress') }}</div>
            <my-account-address :address="defaultShippingAddress" @editAddress="onEditAddress" @deleteAddress="onDeleteAddress"></my-account-address>
          </div>
          <div v-if="defaultBillingAddress && !isDefaultBillingAndShipping" :key="getAddressKey(defaultBillingAddress)" class="address-book-dark-box">
            <div class="address-book-dark-box-title">{{ $t('billingAddress') }}</div>
            <my-account-address :address="defaultBillingAddress" @editAddress="onEditAddress" @deleteAddress="onDeleteAddress"></my-account-address>
          </div>
        </transition-group>
        <div class="row">
          <div class="col-sm-12">
            <div class="add-new-address-btn">
              <router-link :to="{ name: 'MyAccountAddressBookAdd', params: { id: customer.id } }">
                {{ $t('addNewAddress') }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="box-addresses-title">
          {{ $t('additionalAddresses') }}
        </div>
        <transition-group name="address-list" tag="div">
          <div v-for="additionalAddress in additionalAddresses" :key="getAddressKey(additionalAddress)" class="address-book-white-box">
            <my-account-address :address="additionalAddress" @editAddress="onEditAddress" @deleteAddress="onDeleteAddress"></my-account-address>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script>
import REMOVE_CUSTOMER_ADDRESS_MUTATION from '@/graphql/mutations/customers/RemoveCustomerAddress.gql';
import MyAccountAddress from './MyAccountAddress.vue';

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
  methods: {
    isAdditionalAddress(address) {
      return (
        address.id !== this.defaultBillingAddressId &&
        address.id !== this.defaultShippingAddressId
      );
    },
    onEditAddress(address) {
      this.$router.push({
        name: 'MyAccountAddressBookEdit',
        params: { id: this.customer.id, addressId: address.id },
      });
    },
    getOptimisticDefaultAddress(oldDefaultAddress, address) {
      if (oldDefaultAddress && oldDefaultAddress.id === address.id) {
        return null;
      }

      return oldDefaultAddress;
    },
    onDeleteAddress(address) {
      this.$apollo
        .mutate({
          mutation: REMOVE_CUSTOMER_ADDRESS_MUTATION,
          variables: {
            id: this.customer.id,
            addressId: address.id,
          },
          optimisticResponse: {
            __typename: 'Mutation',
            removeCustomerAddress: {
              __typename: 'Customer',
              ...this.customer,
              addresses: this.$myCommons.removeFromArray(
                this.customer.addresses,
                address,
              ),
              defaultShippingAddress: this.getOptimisticDefaultAddress(
                this.customer.defaultShippingAddress,
                address,
              ),
              defaultBillingAddress: this.getOptimisticDefaultAddress(
                this.customer.defaultBillingAddress,
                address,
              ),
            },
          },
          context: {
            secured: true,
          },
        })
        .catch(err => {
          this.$notify({
            type: 'error',
            text: `Error removing address ${err}`,
          });
        });
    },
    getAddressKey(address) {
      return address.key || address.id;
    },
  },
  computed: {
    additionalAddresses() {
      return this.customer.addresses
        ? this.customer.addresses.filter(this.isAdditionalAddress)
        : [];
    },
    isDefaultBillingAndShipping() {
      return (
        this.defaultShippingAddressId &&
        this.defaultShippingAddressId === this.defaultBillingAddressId
      );
    },
    defaultShippingAddress() {
      return this.customer.defaultShippingAddress;
    },
    defaultBillingAddress() {
      return this.customer.defaultBillingAddress;
    },
    defaultShippingAddressId() {
      return (
        this.customer.defaultShippingAddress &&
        this.customer.defaultShippingAddress.id
      );
    },
    defaultBillingAddressId() {
      return (
        this.customer.defaultBillingAddress &&
        this.customer.defaultBillingAddress.id
      );
    },
  },
  components: {
    MyAccountAddress,
  },
};
</script>
<style>
.address-list-leave-active {
  animation: bounceOutRight 0.5s;
}

.default-address-enter-active,
.address-list-enter-active {
  animation: bounceInUp 0.3s;
}

.default-address-leave-active {
  animation: bounceOutLeft 0.5s;
}
</style>

<i18n>
en:
  defaultAddresses: Default Addresses
  shippingAddress: Shipping Address
  billingAddress: Billing Address
  additionalAddresses: Additional addresses
  addNewAddress: Add New Address
de:
  defaultAddresses: Standard-Adressen
  shippingAddress: Lieferadresse
  billingAddress: Rechnungsadresse
  additionalAddresses: Weitere Adressen
  addNewAddress: Neue Adresse hinzufügen
</i18n>
