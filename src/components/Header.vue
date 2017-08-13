<template lang="html">
  <div class="navbar navbar-fixed-top">
    <div class="header">
      <header class="container">
        <div class="row">
          <div class="col-xs-12">
            <ul class="nav-list">

              <!-- Toggle the menu on mobile -->
              <li class="list-item-nav-toggle">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
              </li>
              <!-- End -->

              <!-- Toggles the search field on mobile / not visible on desktop -->
              <li class="list-item-search">
                <button type="button" class="search-toggle icon-magnifying-glass">
                  <span class="sr-only">{{ $t('search') }}</span>
                </button>
              </li>
              <!-- End -->

              <li class="list-item-store">
                <a href="" class="store-select icon-marker">
                  <span class="hidden-xs">{{ $t('stores') }}</span>
                </a>
              </li>

              <li class="list-item-help">
                <a href="" class="link-help">{{ $t('help') }}</a>
              </li>

              <li class="list-item-call">
                <a href="tel:0044123456000" class="link-hotline">{{ $t('callUs', {phoneNumber: '+44 123 456 000'}) }}</a>
              </li>

              <li class="list-item-bag">
                <mini-cart></mini-cart>
              </li>

              <li v-if="user" class="list-item-user">
                <a href="signOut()" class="link-user">
                  <span>{{ $t('signOut') }}</span>
                </a>
              </li>

              <li v-if="user" class="list-item-user">
                <router-link class="link-user icon-user" :to="{ name: 'MyAccount', params: { id: user.id } }">
                  <span class="hidden-xs hidden-sm">{{ user.firstName }}</span>
                </router-link>
              </li>

              <li v-else class="list-item-user">
                <router-link class="link-user icon-user" :to="{ name: 'SignIn' }">
                  <span class="hidden-xs hidden-sm">{{ $t('signIn') }}</span>
                </router-link>
              </li>

              <li class="list-item-location clearfix">
                <location-selector></location-selector>
              </li>

            </ul>
          </div>
        </div>
      </header>
    </div>

    <div id="navigation" class="container">
      <div class="row logo-search">
        <div class="col-sm-8">
          <logo></logo>
        </div>
        <div class="col-sm-4">
          <search-bar></search-bar>
        </div>
      </div>
    </div>

    <div class="row">
      <nav-bar></nav-bar>
    </div>
  </div>
</template>

<script>
import MiniCart from './MiniCart.vue';
import LocationSelector from './LocationSelector.vue';
import Logo from './Logo.vue';
import SearchBar from './SearchBar.vue';
import NavBar from './NavBar.vue';

export default {
  data() {
    return {};
  },
  props: ['user'],
  components: {
    MiniCart,
    LocationSelector,
    Logo,
    SearchBar,
    NavBar,
  },
};
</script>

<i18n>
en:
  title: Sunrise
  stores: Stores
  help: Help
  callUs: Call us on {phoneNumber}
  miniCart: Cart
  viewBag: View Bag
  checkout: Checkout
  search: Search
  signIn: Sign In
  signOut: Log Out
  country: Country
  location: Location
  allCategories: All categories
  teaser: Summer 2015 – What inspires you?
  new: New
  sale: Sale
  brands: Brands
de:
  title: Sunrise
  stores: Filiale
  help: Hilfe
  callUs: Rufen Sie uns auf {phoneNumber} an
  miniCart: Warenkorb
  viewBag: Warenkorb ansehen
  checkout: Checkout
  search: Suche
  signIn: Log In
  signOut: Log Out
  country: Land
  location: Ort
  allCategories: Alle Kategorien
  teaser: Sommer 2015 – Was ist Ihre Inspiration?
  new: Neu
  sale: Sale
  brands: Marken
</i18n>
