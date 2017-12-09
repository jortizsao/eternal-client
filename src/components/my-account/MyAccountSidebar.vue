<template lang="html">
  <div class="my-account-sidebar">
    <a href="#" @click.prevent="selectTab('personalDetails')">
      <div class="my-account-sidebar-items" :class="{ active: selectedTab === 'personalDetails' }">
        {{ $t('personalDetails') }}
      </div>
    </a>
    <a href="#" @click.prevent="selectTab('changePassword')">
      <div class="my-account-sidebar-items" :class="{ active: selectedTab === 'changePassword' }">
        {{ $t('changePassword') }}
      </div>
    </a>
    <a href="#" @click.prevent="selectTab('addressBook')">
      <div class="my-account-sidebar-items" :class="{ active: selectedTab === 'addressBook' }">
        {{ $t('addressBook') }}
      </div>
    </a>
    <a href="#" @click.prevent="selectTab('paymentDetails')">
      <div class="my-account-sidebar-items" :class="{ active: selectedTab === 'paymentDetails' }">
        {{ $t('paymentDetails') }}
      </div>
    </a>
    <a href="#" @click.prevent="selectTab('myOrders')">
      <div class="my-account-sidebar-items" :class="{ active: selectedTab === 'myOrders' }">
        {{ $t('myOrders') }}
      </div>
    </a>
    <a href="#" @click.prevent="selectTab('returnsExchange')">
      <div class="my-account-sidebar-items" :class="{ active: selectedTab === 'returnsExchange' }">
        {{ $t('returnsExchange') }}
      </div>
    </a>
    <a href="#" @click.prevent="selectTab('wishlist')">
      <div class="my-account-sidebar-items clearfix" :class="{ active: selectedTab === 'wishlist' }">
        <span>
          <img class="sidebar-wishlist-heart hidden-sm" src="../../assets/img/heart-1.png" alt="heart icon">
        </span>
        {{ $t('wishlist') }}
        <span class="sidebar-wishlist-quantity hidden-sm">{{wishlistItems}}</span>
      </div>
    </a>
    <a href="#">
      <div class="my-account-sidebar-items">
        {{ $t('signOut') }}
      </div>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wishlistItems: 1,
      selectedTab: 'personalDetails',
    };
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
      this.$emit('selected-tab', tab);
    },
  },
};
</script>
<i18n>
en:
  personalDetails: Personal Details
  addressBook: Address Book
  paymentDetails: Payment Details
  myOrders: My Orders
  returnsExchange: Returns / Exchange
  wishlist: Wishlist
  signOut: Sign Out
  changePassword: Change password
de:
  personalDetails: Meine Benutzerdaten
  addressBook: Adressbuch
  paymentDetails: Meine Zahlungdaten
  myOrders: Meine Bestellungen
  returnsExchange: Meine Retouren
  wishlist: Wunschliste
  signOut: Abmelden
  changePassword: Passwort ändern
</i18n>
