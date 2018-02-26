<template>
  <div id="my-account-address-add-edit-form">
    <form id="my-account-address-add-edit" @submit.prevent="saveAddress" method="post" action="/saveAddress">
      <div class="row">
        <div class="col-sm-12">
          <div class="row">
            <div class="col-sm-4">
              <div class="input-block">
                <span class="text-uppercase">{{ $t('title') }}</span><br>
                <el-select class="select-title-dropdown" placeholder="" clearable v-model="address.title">
                  <el-option
                    v-for="item in titleOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="row">
            <form-input columnWidth="6" name="firstName" :required="true" :labelKey="$t('firstName')" :value="address.firstName" @valueChanged="onInputValueChange('firstName', $event)"></form-input>
            <form-input columnWidth="6" name="lastName" :required="true" :labelKey="$t('lastName')" :value="address.lastName" @valueChanged="onInputValueChange('lastName', $event)"></form-input>
            <form-input columnWidth="12" name="streetName" :required="true" :labelKey="$t('streetName')" :value="address.streetName" @valueChanged="onInputValueChange('streetName', $event)"></form-input>
            <form-input columnWidth="12" name="additionalStreetInfo" :required="false" :labelKey="$t('additionalStreetInfo')" :value="address.additionalStreetInfo" @valueChanged="onInputValueChange('additionalStreetInfo', $event)"></form-input>
            <form-input columnWidth="8" name="city" :required="true" :labelKey="$t('city')" :value="address.city" @valueChanged="onInputValueChange('city', $event)"></form-input>
            <form-input columnWidth="4" name="postalCode" :required="true" :labelKey="$t('postalCode')" :value="address.postalCode" @valueChanged="onInputValueChange('postalCode', $event)"></form-input>
            <div class="col-sm-6">
              <div class="input-block">
                <span class="text-uppercase">{{ $t('country') }}<abbr :title="$t('required')">*</abbr></span><br>
                <el-select class="select-country-dropdown" name="country" v-validate="'required'" placeholder="" clearable v-model="address.country">
                  <el-option
                    v-for="item in countryOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <p class="text-danger" v-show="errors.has('country')">{{ errors.first('country') }}</p>
              </div>
            </div>
            <form-input columnWidth="6" name="region" :required="false" :labelKey="$t('region')" :value="address.region" @valueChanged="onInputValueChange('region', $event)"></form-input>
          </div>
          <hr>
          <div class="row">
            <div class="col-sm-6">
              <div class="input-block">
                <label for="billing-checkbox">
                  <span>
                    <input id="default-billing-checkbox" type="checkbox" name="defaultBillingAddress" v-model="address.isDefaultBilling">
                  </span>
                  <span>{{$t('useAsDefaultBillingAddress')}}</span>
                </label>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="input-block">
                <label for="delivery-checkbox">
                  <span>
                    <input id="default-shipping-checkbox" type="checkbox" name="defaultShippingAddress" v-model="address.isDefaultShipping">
                  </span>
                  <span>{{$t('useAsDefaultShippingAddress')}}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="edit-address-book-footer">
            <a href="" @click.prevent="cancel">
              <div class="btn-grey push-left cancel-editting-address-btn">
                {{$t('cancelAddressButton')}}
              </div>
            </a>
            <div class="add-new-address-btn push-right">
              <button type="submit">{{ saveAddressButtonLabel }}</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Vue from 'vue';
import uuidv4 from 'uuid/v4';
import FormInput from '@/components/commons/FormInput.vue';
import SAVE_CUSTOMER_ADDRESS_MUTATION from '@/graphql/mutations/customers/SaveCustomerAddress.gql';

export default {
  props: {
    customer: {
      type: Object,
      required: true,
    },
    addressId: String,
  },
  data() {
    return {
      address: {
        firstName: '',
        lastName: '',
        streetName: '',
        additionalStreetInfo: '',
        city: '',
        postalCode: '',
        country: '',
        region: '',
        isDefaultShipping: false,
        isDefaultBilling: false,
      },
    };
  },
  created() {
    this.setAddress();
  },
  methods: {
    setAddress() {
      if (this.customer.addresses && this.addressId) {
        const addr = this.customer.addresses.find(address => address.id === this.addressId);
        this.address = {
          ...addr,
          isDefaultShipping: this.isDefaultShipping(this.customer, addr),
          isDefaultBilling: this.isDefaultBilling(this.customer, addr),
        };
      }
    },
    onInputValueChange(name, newValue) {
      this.address[name] = newValue;
    },
    isDefaultBilling(customer, address) {
      if (customer && address) {
        return Boolean(
          customer.defaultBillingAddress && customer.defaultBillingAddress.id === address.id,
        );
      }

      return false;
    },
    isDefaultShipping(customer, address) {
      if (customer && address) {
        return Boolean(
          customer.defaultShippingAddress && customer.defaultShippingAddress.id === address.id,
        );
      }

      return false;
    },
    getAddressDraft() {
      return {
        id: this.addressId,
        key: this.address.key || uuidv4(),
        title: this.address.title,
        firstName: this.address.firstName,
        lastName: this.address.lastName,
        streetName: this.address.streetName,
        additionalStreetInfo: this.address.additionalStreetInfo,
        city: this.address.city,
        postalCode: this.address.postalCode,
        country: this.address.country,
        region: this.address.region,
        isDefaultShipping: this.address.isDefaultShipping,
        isDefaultBilling: this.address.isDefaultBilling,
      };
    },
    getOptimisticDefaultAddress(oldDefaultAddress, address, isDefault) {
      if (isDefault) {
        return address;
      }

      if (oldDefaultAddress && oldDefaultAddress.id === address.id) {
        return null;
      }

      return oldDefaultAddress;
    },
    cancel() {
      this.$router.push({
        name: 'MyAccountAddressBookList',
        params: { id: this.customer.id },
      });
    },
    saveAddress() {
      this.$validator.validateAll().then(result => {
        if (result) {
          const addressDraft = this.getAddressDraft();
          const addressDraftOptimisticUpdate = {
            ...addressDraft,
            id: addressDraft.id || '-1',
            __typename: 'Address',
          };

          this.$router.push({
            name: 'MyAccountAddressBookList',
            params: { id: this.customer.id },
          });

          Vue.nextTick(() => {
            this.$apollo
              .mutate({
                mutation: SAVE_CUSTOMER_ADDRESS_MUTATION,
                variables: {
                  id: this.customer.id,
                  addressDraft,
                },
                optimisticResponse: {
                  __typename: 'Mutation',
                  saveCustomerAddress: {
                    __typename: 'Customer',
                    ...this.customer,
                    addresses: this.$myCommons.addOrUpdateArray(
                      this.customer.addresses,
                      addressDraftOptimisticUpdate,
                    ),
                    defaultShippingAddress: this.getOptimisticDefaultAddress(
                      this.customer.defaultShippingAddress,
                      addressDraftOptimisticUpdate,
                      addressDraftOptimisticUpdate.isDefaultShipping,
                    ),
                    defaultBillingAddress: this.getOptimisticDefaultAddress(
                      this.customer.defaultBillingAddress,
                      addressDraftOptimisticUpdate,
                      addressDraftOptimisticUpdate.isDefaultBilling,
                    ),
                  },
                },
              })
              .catch(err => {
                this.$notify({ type: 'error', text: `Error saving address ${err}` });
                this.$router.push({
                  name: 'MyAccountAddressBookEdit',
                  params: { id: this.customer.id, addressId: this.addressId },
                });
              });
          });
        }
      });
    },
  },
  computed: {
    titleOptions() {
      return ['mr', 'mrs', 'ms', 'dr'].map(value => ({
        value,
        label: this.$t(`personTitles.${value}`),
      }));
    },
    countryOptions() {
      return ['UK', 'DE', 'US', 'ES'].map(value => ({
        value,
        label: this.$t(`countries.${value}`),
      }));
    },
    saveAddressButtonLabel() {
      return this.addressId ? this.$t('updateAddressButton') : this.$t('addAddressButton');
    },
  },
  watch: {
    addressId: 'setAddress',
    customer: 'setAddress',
  },
  components: {
    FormInput,
  },
};
</script>
<i18n>
en:
  required: Required
  title: Title
  personTitles:
    mr: Mr.
    mrs: Mrs.
    ms: Ms.
    dr: Dr.
  firstName: First Name
  lastName: Last Name
  streetName: Address 1
  additionalStreetInfo: Address 2
  city: City
  postalCode: Post Code
  country: Country
  countries:
    UK: United Kingdom
    DE: Germany
    US: United States
    ES: Spain
  region: Region
  useAsDefaultShippingAddress: Use as default address for shipping
  useAsDefaultBillingAddress: Use as default address for billing
  cancelAddressButton: Cancel
  updateAddressButton: Save Changes
  addAddressButton: Add Address
de:
  required: Pflichtfeld
  title: Titel
  personTitles:
    mr: Herr
    mrs: Frau
    ms: Frau
    dr: Dr.
  firstName: Vorname
  lastName: Nachname
  streetName: Adresse 1
  additionalStreetInfo: Adresse 2
  city: Stadt
  postalCode: Plz
  country: Land
  countries:
    UK: Großbritannien
    DE: Deutschland
    US: Vereinigte Staaten
    ES: Spanien
  region: Region
  useAsDefaultShippingAddress: Als meine Lieferadresse verwenden
  useAsDefaultBillingAddress: Als meine Rechnungadresse verwenden
  cancelAddressButton: Abbrechen
  updateAddressButton: Änderungen Speichern
  addAddressButton: Adresse Hinzufügen
</i18n>
