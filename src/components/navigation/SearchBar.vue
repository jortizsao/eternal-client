<template lang="html">
  <div class="search-bar">
    <form id="form-search" action="/" class="search-box text-right">
      <input name="q" type="search" :placeholder="$t('search')" id="search-input" class="search-field" required/>
      <button type="submit" id="search-button" class="search-button">
        <span class="icon-font icon-magnifying-glass"></span>
        <span class="sr-only">{{ $t('search') }}</span>
      </button>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<i18n>
en:
  search: Search
de:
  search: Suche
</i18n>
