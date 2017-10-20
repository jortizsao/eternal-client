<template>
  <div class="home-page">
    <component :blok="story.content" :is="story.content.component"></component>
  </div>
</template>

<script>
import cmsMixin from '@/mixins/cms.mixin';
import { mapState } from 'vuex';

export default {
  created() {
    this.setCmsStorySlug(`${this.language}/home`);
  },
  mixins: [cmsMixin],
  computed: {
    ...mapState('general', ['language']),
  },
  watch: {
    language() {
      this.setCmsStorySlug(`${this.language}/home`);
      this.getCmsStory(this.getCmsStorySlug(), this.getCmsVersion());
    },
  },
};
</script>
