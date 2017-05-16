<template lang="html">
  <div class="location-selector-component">
    <button id="location-dropdown-toggle-btn" @click="toggleDropdown();" class="location-dropdown-toggle">
      <img class="pull-right" src="../assets/img/globe-2.png" alt="location">
    </button>
    <div v-if="isDropdownShown" v-on-clickaway="hideDropdown" class="location-dropdown">
      <span class="location-dropdown-label">{{ $t('language') }}</span>
      <el-select class="location-dropdown__select" v-model="language">
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

export default {
  mixins: [clickaway],
  data() {
    return {
      isDropdownShown: false,
      language: 'en',
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
  },
  watch: {
    language(value) {
      this.$locale.change(value);
      this.isDropdownShown = false;
    },
  },
};
</script>

<i18n>
  en:
    language: Language
  de:
    language: Sprache
</i18n>

<style lang="scss">
@import '../assets/scss/_general';

.location-dropdown__select {
  margin-top: 10px;

  .el-input {
    .el-input__inner {
      background: $ebony-clay;
      border: 1px solid;
      border-radius: 0;
      color: $white;
      height: 42px;
      left: 2px;
      position: relative;
    }

    .el-input__icon {
      color: $white;
      z-index: 1;
    }
  }
}
</style>
