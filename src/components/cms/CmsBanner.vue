<template>
  <div class="banner" :class="blok.type">
    <div class="aspect-ratio" :class="blok.aspectRatio">
      <picture>
        <img :src="blok.image" class="img-responsive">
      </picture>
    </div>

    <div class="banner-text">
      <h4 v-if="blok.title" class="banner-title">{{blok.title}}</h4>
      <p v-if="blok.subtitle" class="banner-paragraph">{{blok.subtitle}}</p>
      <p v-if="blok.description" class="hidden-xs hidden-sm" v-html="blok.description"></p>
      <cms-button v-if="blok.button[0]" :blok="blok.button[0]"></cms-button>
    </div>
      <!-- <img  :srcset="",
                    elva-fairy-480w.jpg 1200w,
                    elva-fairy-800w.jpg 800w"
            sizes="(min-width: 1200px) 1200px,
                    (min-width: 768px) 900,
                    768px"
            :src="blok.image" :alt="blok.alternateText" class="img-responsive"> -->
  </div>
</template>

<script>
import CmsButton from '@/components/cms/CmsButton.vue';

export default {
  props: ['blok'],
  components: {
    CmsButton,
  },
};
</script>
<style lang="scss" scoped>
.banner {
  img {
    width: 100%;
  }
}
</style>

