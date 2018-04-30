<template>
  <div id="navigation" class="container navigation">
    <div class="row logo-search hidden-xs">
      <div class="col-sm-8">
        <logo></logo>
      </div>
      <div class="col-sm-4">
        <search-bar></search-bar>
      </div>
    </div>

    <div class="row">
      <nav-bar></nav-bar>
    </div>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue';
import NavBar from './NavBar.vue';
import Logo from './Logo.vue';

export default {
  components: {
    SearchBar,
    NavBar,
    Logo,
  },
};
</script>

<style>

</style>
