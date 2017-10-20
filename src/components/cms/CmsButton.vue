<template>
  <div class="cms-button">
    <a :href="blok.linkHref" :class="blok.cssClass">
      {{blok.label}}
    </a>
  </div>
</template>
<script>
export default {
  props: ['blok'],
};
</script>
