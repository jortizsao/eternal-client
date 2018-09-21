<template>
  <div class="home-viewall">
    <router-link :to="urlLink" class="home-viewall-btn">{{blok.message}}</router-link>
    <hr class="home-viewall-hr">
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: ['blok'],
  computed: {
    urlLink() {
      return `/${this.language}/${this.blok.link}`;
    },
    ...mapState('general', ['language']),
  },
};
</script>
