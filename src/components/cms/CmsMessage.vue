<template>
  <div class="cms-message">
    <h4 class="home-suggestions-title">{{blok.title}}</h4>
    <hr class="home-suggestions-hr"/>
    <p class="home-suggestions-description">{{blok.description}}</p>
  </div>
</template>
<script>
export default {
  props: ['blok'],
};
</script>
