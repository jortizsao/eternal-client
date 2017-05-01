<template>
  <div id="app">
    <div class="darkbg hidden"></div>
    <header-component :user="user"></header-component>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import HeaderComponent from './components/Header.vue';

export default {
  name: 'app',
  data() {
    return {
      user: {
        name: 'javier',
      },
    };
  },
  components: {
    HeaderComponent,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700');

</style>
