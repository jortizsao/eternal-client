// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import vueProgressBar from 'vue-progressbar';
import notifications from 'vue-notification';
import vue2Filters from 'vue2-filters';
import { Select, Option } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from './App.vue';
import Router from './router';
import I18n from './i18n';
import storyblok from './plugins/storyblok';
import Store from './store';
import Authentication from './plugins/authentication';
import './validator';
import './assets/scss/main.scss';
import './assets/scss/custom/my-custom.scss';

const store = Store();
const i18n = I18n();
const authentication = Authentication({
  store,
});
const router = Router({ authentication });

// Set default url for api calls
axios.defaults.baseURL = process.env.API_URL;

Vue.config.productionTip = false;
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.use(vueProgressBar, { color: '#FFBA27', failedColor: 'red', height: '3px' });
Vue.use(notifications);
Vue.use(vue2Filters);
Vue.use(storyblok);
Vue.use(authentication);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  template: '<App/>',
  components: { App },
});
