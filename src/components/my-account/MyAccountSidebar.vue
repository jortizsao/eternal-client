<template lang="html">
  <div class="my-account-sidebar">
    <div class="my-account-sidebar-items">
      <a href="#">{{ $t('personalDetails') }}</a>
    </div>
    <div class="my-account-sidebar-items">
      <a href="#">{{ $t('changePassword') }}</a>
    </div>
    <div class="my-account-sidebar-items">
      <a href="#">{{ $t('addressBook') }}</a>
    </div>
    <div class="my-account-sidebar-items">
      <a href="#">{{ $t('paymentDetails') }}</a>
    </div>
    <div class="my-account-sidebar-items">
      <a href="#">{{ $t('myOrders') }}</a>
    </div>
    <div class="my-account-sidebar-items">
      <a href="#">{{ $t('returnsExchange') }}</a>
    </div>
    <div class="my-account-sidebar-items clearfix">
      <a href="#">
        <span>
          <img class="sidebar-wishlist-heart hidden-sm" src="../../assets/img/heart-1.png" alt="heart icon">
        </span>
        {{ $t('wishlist') }}
        <span class="sidebar-wishlist-quantity hidden-sm">{{wishlistItems}}</span>
      </a>
    </div>
    <div class="my-account-sidebar-items">
      <a href="#">{{ $t('signOut') }}</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wishlistItems: 1,
    };
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
