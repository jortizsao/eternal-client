<template>
  <transition name="appFade">
    <div id="app" v-show="isShown">
      <div class="darkbg hidden"></div>
      <header-component></header-component>
      <Slideout menu="#navigation" panel="#panel" :toggleSelectors="['.navbar-toggle']" :touch="false">
        <navigation-component></navigation-component>
        <div id=panel>
          <div :class="containerClass">
            <!-- <transition :name="transition"> -->
              <router-view></router-view>
            <!-- </transition> -->
          </div>
          <footer-component></footer-component>
        </div>
        <subfooter-component></subfooter-component>
      </Slideout>
      <vue-progress-bar></vue-progress-bar>
      <custom-notifications></custom-notifications>
    </div>
  </transition>
</template>

<script>
import Slideout from 'vue-slideout';
import { mapState } from 'vuex';
import CustomNotifications from '@/notifications/CustomNotifications.vue';
import HeaderComponent from './components/header/Header.vue';
import NavigationComponent from './components/navigation/Navigation.vue';
import FooterComponent from './components/footer/Footer.vue';
import SubfooterComponent from './components/footer/SubFooter.vue';

export default {
  name: 'app',
  data() {
    return {
      transition: '',
      isShown: false,
    };
  },
  created() {
    this.setLanguage(this.language);
  },
  mounted() {
    const splashDuration = process.env.SPLASH_DURATION
      ? parseInt(process.env.SPLASH_DURATION, 10)
      : 2000;
    const timeRemaining = splashDuration - (Date.now() - window.indexLoadedAt);

    if (timeRemaining > 0) {
      setTimeout(this.removeSplash, timeRemaining);
    } else {
      this.removeSplash();
    }
  },
  methods: {
    setLanguage(language) {
      this.$i18n.locale = language;
      this.$validator.setLocale(language);
    },
    removeSplash() {
      document.body.removeAttribute('style');
      document.getElementById('splash').classList.add('fadeout');
      this.isShown = true;
    },
  },
  computed: {
    containerClass() {
      switch (this.$route.name) {
        case 'Home':
          return 'container--home';
        case 'ProductDetailPage':
          return '';
        default:
          return 'container';
      }
    },
    ...mapState('general', ['language']),
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
    NavigationComponent,
    CustomNotifications,
    Slideout,
    FooterComponent,
    SubfooterComponent,
  },
};
</script>

<style lang="scss">
$bootstrap-sass-asset-helper: true;
@import "~bootstrap-sass/assets/stylesheets/_bootstrap";
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700");

.slideLeft-leave-active,
.slideRight-leave-active {
  display: none;
}

.slideLeft-enter-active,
.slideRight-enter-active {
  transition: 0.1s;
}

.slideLeft-enter {
  transform: translate(100%, 0);
}

.slideRight-enter {
  transform: translate(-100%, 0);
}

.appFade-enter-active,
.appFade-leave-active {
  transition: opacity 0.5s;
}
.appFade-enter,
.appFade-leave-to {
  opacity: 0.1;
}
</style>
