import Vue from 'vue';
import de from 'vee-validate/dist/locale/de';
import VeeValidate, { Validator } from 'vee-validate';
import attrsDe from './locale/attrs_de';
import attrsEn from './locale/attrs_en';

// Add locale helper.
Validator.addLocale(de);

Vue.use(VeeValidate, {
  dictionary: {
    en: { attributes: attrsEn },
    de: { attributes: attrsDe },
  },
});
