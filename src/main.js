// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueProgressBar from 'vue-progressbar';
import Notifications from 'vue-notification';
import Vue2Filters from 'vue2-filters';
import { Select, Option } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import store from './store';
import './validator';
import './assets/scss/main.scss';
import './assets/scss/custom/my-custom.scss';

// Set default url for api calls
axios.defaults.baseURL = process.env.API_URL;

Vue.config.productionTip = false;
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.use(VueProgressBar, { color: '#fff', failedColor: 'red', height: '3px' });
Vue.use(Notifications);
Vue.use(Vue2Filters);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  template: '<App/>',
  components: { App },
});
