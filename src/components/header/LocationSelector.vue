<template lang="html">
  <div class="location-selector-component">
    <button id="location-dropdown-toggle-btn" @click="toggleDropdown();" class="location-dropdown-toggle">
      <img class="pull-right" src="~@/assets/img/globe-2.png" alt="location">
    </button>
    <div v-if="isDropdownShown" v-on-clickaway="hideDropdown" class="location-dropdown">
      <span class="location-dropdown-label">{{ $t('language') }}</span>
      <el-select class="location-dropdown__select" :value="language" @input="onLanguageChanged">
        <el-option
          v-for="lang in languages"
          :key="lang.value"
          :label="lang.label"
          :value="lang.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
import { mapState } from 'vuex';

export default {
  mixins: [clickaway],
  data() {
    return {
      isDropdownShown: false,
      languages: [
        {
          value: 'en',
          label: 'English',
        },
        {
          value: 'de',
          label: 'German',
        },
      ],
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownShown = !this.isDropdownShown;
    },
    hideDropdown() {
      if (this.isDropdownShown) {
        this.isDropdownShown = false;
      }
    },
    onLanguageChanged(newLanguage) {
      this.isDropdownShown = false;
      this.$router.push({
        name: this.$route.name,
        params: { ...this.$route.params, locale: newLanguage },
        query: { ...this.$route.query },
      });
    },
  },
  computed: {
    ...mapState('general', ['language']),
  },
};
</script>

<i18n>
  en:
    language: Language
  de:
    language: Sprache
</i18n>
