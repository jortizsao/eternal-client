import Vue from 'vue';
import StoryblokVue from 'storyblok-vue';
import CmsRoot from '@/components/cms/CmsRoot.vue';
import CmsGrid from '@/components/cms/CmsGrid.vue';
import CmsColumn from '@/components/cms/CmsColumn.vue';
import CmsBanner from '@/components/cms/CmsBanner.vue';
import CmsButton from '@/components/cms/CmsButton.vue';
import CmsMessage from '@/components/cms/CmsMessage.vue';
import CmsProductsCarousel from '@/components/cms/CmsProductsCarousel.vue';

export default {
  install() {
    if (window.storyblok) {
      if (process.env.CMS_ACCESS_TOKEN && process.env.CMS_ACCESS_TOKEN !== 'undefined') {
        window.storyblok.init({
          accessToken: process.env.CMS_ACCESS_TOKEN,
        });
        Object.defineProperty(Vue.prototype, '$storyblok', { value: window.storyblok });
      } else {
        console.warn('Storyblok CMS: Access token is not configured');
      }
    }

    Vue.component('CmsRoot', CmsRoot);
    Vue.component('CmsGrid', CmsGrid);
    Vue.component('CmsColumn', CmsColumn);
    Vue.component('CmsBanner', CmsBanner);
    Vue.component('CmsButton', CmsButton);
    Vue.component('CmsMessage', CmsMessage);
    Vue.component('CmsProductsCarousel', CmsProductsCarousel);
    Vue.use(StoryblokVue);
  },
};
