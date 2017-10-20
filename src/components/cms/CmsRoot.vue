<template>
  <div v-editable="blok" class="root">
    <component v-for="item in blok.body"
      :blok="item"
      :is="item.component"
      :key="item._uid"
    >
    </component>
  </div>
</template>

<script>
export default {
  props: ['blok'],
};
</script>
