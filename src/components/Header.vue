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
                  <span class="sr-only">Search</span>
                </button>
              </li>
              <!-- End -->

              <li class="list-item-store">
                <a href="" class="store-select icon-marker">
                  <span class="hidden-xs">Stores</span>
                </a>
              </li>

              <li class="list-item-help">
                <a href="" class="link-help">Help</a>
              </li>

              <li class="list-item-call">
                <a href="tel:0044123456000" class="link-hotline">Call us on +44 123 456 000</a>
              </li>

              <li class="list-item-bag">
                <mini-cart></mini-cart>
              </li>

              <li v-if="user" class="list-item-user">
                <a href="signOut()" class="link-user">
                  <span>Log out</span>
                </a>
              </li>

              <li v-if="user" class="list-item-user">
                <a href="myAccount()" class="link-user icon-user">
                  <span class="hidden-xs hidden-sm">{{user.name}}</span>
                </a>
              </li>

              <li v-else class="list-item-user">
                <a href="signIn()" class="link-user icon-user">
                  <span class="hidden-xs hidden-sm">Sign in</span>
                </a>
              </li>

              <li class="list-item-location clearfix">
                <location-selector></location-selector>
              </li>


            </ul>
          </div>
        </div>
      </header>
    </div>


  </div>


</template>

<script>
import MiniCart from './MiniCart.vue';
import LocationSelector from './LocationSelector.vue';

export default {
  data() {
    return {};
  },
  props: ['user'],
  components: {
    MiniCart,
    LocationSelector,
  },
};
</script>
