<template lang="html">
  <li class="list-item-location clearfix">
    <button id="location-dropdown-toggle-btn" class="location-dropdown-toggle">
      <img class="pull-right" src="../assets/img/globe-2.png" alt="location">
    </button>
    <div class="location-dropdown">
      <form id="form-select-language" action="selectLanguage()" method="POST">
        <span class="location-dropdown-label">Language</span>
        <select v-model="language" name="language" id="language-select" class="select location-select">
          <option v-for="language in languages" :value="language">{{language}}</option>
        </select>
      </form>
    </div>
  </li>
</template>

<script>
export default {
  data() {
    return {
      language: '',
      languages: ['en', 'de'],
    };
  },
};
</script>

<style lang="css">
</style>
