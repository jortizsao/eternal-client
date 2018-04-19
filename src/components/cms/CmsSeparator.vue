<template>
  <div class="home-viewall">
    <a :href="blok.link" class="home-viewall-btn">
      {{blok.message}}
    </a>
    <hr class="home-viewall-hr">
  </div>
</template>
<script>
export default {
  props: ['blok'],
};
</script>
