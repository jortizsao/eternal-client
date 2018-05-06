<template>
  <div class="product-detail-breadcrumb">
    <ol class="breadcrumb">
      <li>
        <router-link :to="{ name: 'Home' }" :class="{ active: !categories }">
          {{ $t('home') }}
        </router-link>  
      </li>
      <li v-if="categories" v-for="(category, index) in categories" :key="category.slug">
        <a :href="'categories/' + category.slug" :class="{ active: index === categories.length - 1 }">{{category.name}}</a>
      </li>
      <li>{{productName}}</li>
    </ol>
  </div>
</template>

<script>
export default {
  props: {
    categories: Array,
    productName: String,
  },
};
</script>
<i18n>
en:
  home: Home
de:
  home: Home
</i18n>