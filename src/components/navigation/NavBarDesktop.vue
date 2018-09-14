<template>
  <div class="nav-bar-desktop">
    <ul class="nav navbar-nav">
      <li class="dropdown menu-large" @mouseover="onRootCategoryMouseOver(rootCategory)" @mouseleave="onRootCategoryMouseLeave(rootCategory)" v-for="rootCategory in categories" :key="rootCategory.id">
        <a :href="getCategorySlug(rootCategory)" @click.prevent="onCategorySelected(rootCategory, rootCategory)" class="dropdown-toggle" :class="[isSale(rootCategory) ? 'sale icon-ribbon' : '']" data-toggle="dropdown">
          {{getCategoryName(rootCategory)}}
        </a>
        <ul v-show="rootCategory.children.length && rootCategory.isExpanded" class="dropdown-menu megamenu row dropdown-submenu">
          <li class="col-sm-8">
            <div class="nav-accordion">
              <template v-for="firstChild in rootCategory.children">
                <h3 :key="firstChild.id"><a :href="getCategorySlug(firstChild)" @click.prevent="onCategorySelected(firstChild, rootCategory)">{{getCategoryName(firstChild)}}</a></h3>
                <ul :key="firstChild.id">
                  <li v-for="secondChild in firstChild.children" :key="secondChild.id">
                    <a :href="getCategorySlug(secondChild)" @click.prevent="onCategorySelected(secondChild, rootCategory)">{{getCategoryName(secondChild)}}</a>
                  </li>
                </ul>
              </template>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    categories: Array,
    getCategoryName: Function,
    getCategorySlug: Function,
    isSale: Function,
  },
  data() {
    return {
      expandFunctions: [],
    };
  },
  methods: {
    onRootCategoryMouseOver(category) {
      this.expandFunctions.map(fn => clearTimeout(fn));
      const fn = setTimeout(() => this.$emit('expand', category), 300);
      this.expandFunctions.push(fn);
    },
    onRootCategoryMouseLeave(category) {
      this.expandFunctions.map(fn => clearTimeout(fn));
      this.$emit('collapse', category);
    },
    onCategorySelected(category, rootCategory) {
      this.$emit('collapse', rootCategory);
      this.$router.push({
        name: 'ProductListPageCategory',
        params: { categorySlug: this.getCategorySlug(category), categoryId: category.id },
      });
    },
  },
};
</script>

<style>
</style>
