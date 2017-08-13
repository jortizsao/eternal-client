<template>
  <div id="app">
    <div class="darkbg hidden"></div>
    <header-component :user="user"></header-component>
    <div class="container">
      <router-view></router-view>
    </div>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import HeaderComponent from './components/Header.vue';

export default {
  name: 'app',
  data() {
    return {
      user: '',
    };
  },
  created() {
    this.setLanguage(this.language);
  },
  methods: {
    setLanguage(language) {
      this.$i18n.locale = language;
      this.$validator.setLocale(language);
    },
  },
  computed: {
    ...mapState('general', ['language']),
  },
  watch: {
    language() {
      this.setLanguage(this.language);
    },
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
