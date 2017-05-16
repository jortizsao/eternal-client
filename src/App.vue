<template>
  <div id="app">
    <div class="darkbg hidden"></div>
    <header-component :user="user"></header-component>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeaderComponent from './components/Header.vue';

export default {
  name: 'app',
  data() {
    return {
      user: '',
    };
  },
  components: {
    HeaderComponent,
  },
};
</script>

<style lang="scss">
$bootstrap-sass-asset-helper: true;
@import '~bootstrap-sass/assets/stylesheets/_bootstrap';
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700');

</style>
