<template>
  <div class="cms-button">
    <router-link :to="urlLink" :class="blok.cssClass">{{blok.label}}</router-link>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: ['blok'],
  computed: {
    urlLink() {
      return `/${this.language}/${this.blok.linkHref.url}`;
    },
    ...mapState('general', ['language']),
  },
};
</script>
