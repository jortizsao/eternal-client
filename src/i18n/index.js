import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  messages: {},
});

Vue.prototype.$locale = {
  change(lang) {
    i18n.locale = lang;
  },
  current() {
    return i18n.locale;
  },
};

export default i18n;
