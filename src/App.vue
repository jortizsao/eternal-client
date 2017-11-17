<template>
  <div id="app">
    <div class="darkbg hidden"></div>
    <header-component :user="user"></header-component>
    <div :class="containerClass">
      <transition :name="transition">
        <router-view></router-view>
      </transition>
    </div>
    <vue-progress-bar></vue-progress-bar>
    <custom-notifications></custom-notifications>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CustomNotifications from '@/notifications/CustomNotifications.vue';
import HeaderComponent from './components/Header.vue';

export default {
  name: 'app',
  data() {
    return {
      transition: '',
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
    containerClass() {
      return this.$route.name === 'Home' ? 'container--home' : 'container';
    },
    ...mapState('general', ['language', 'user']),
  },
  watch: {
    language() {
      this.setLanguage(this.language);
    },
    $route(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transition = toDepth < fromDepth ? 'slideRight' : 'slideLeft';
    },
  },
  components: {
    HeaderComponent,
    CustomNotifications,
  },
};
</script>

<style lang="scss">
$bootstrap-sass-asset-helper: true;
@import '~bootstrap-sass/assets/stylesheets/_bootstrap';
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700');

.slideLeft-leave-active, .slideRight-leave-active {
  display: none;
}

.slideLeft-enter-active, .slideRight-enter-active {
  transition: 0.5s;
}

.slideLeft-enter {
  transform: translate(100%, 0);
}

.slideRight-enter {
  transform: translate(-100%, 0);
}
</style>
