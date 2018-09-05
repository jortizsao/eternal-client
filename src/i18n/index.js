import Vue from 'vue';
import VueI18n from 'vue-i18n';

export default function ({ locale, fallbackLocale }) {
  Vue.use(VueI18n);

  return new VueI18n({
    locale,
    fallbackLocale,
  });
}
