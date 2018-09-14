<template>
  <div class="nav-bar-mobile">
    <div class="menu">
      <ul class="nav navbar-nav">
        <li class="dropdown menu-large" v-for="rootCategory in categories" :key="rootCategory.id">
          <a :href="getCategorySlug(rootCategory)" @click.prevent="onCategorySelected(rootCategory, rootCategory)" class="dropdown-toggle" :class="[isSale(rootCategory) ? 'sale icon-ribbon' : '']" data-toggle="dropdown">
            {{getCategoryName(rootCategory)}}
          </a>
          <template v-if="rootCategory.children.length">
            <a href="#" v-show="!rootCategory.isExpanded" @click.prevent="onExpand(rootCategory)" class="dropdown-collapse">
              <span class="glyphicon glyphicon-plus mobile-plus-content" aria-hidden="true"></span>
            </a>
            <a href="#" v-show="rootCategory.isExpanded" @click.prevent="onCollapse(rootCategory)" class="dropdown-collapse hidden-sm hidden-md hidden-lg">
              <span class="glyphicon glyphicon-minus mobile-plus-content" aria-hidden="true"></span>
            </a>
          </template>

          <ul v-if="rootCategory.children && rootCategory.isExpanded">
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
    onExpand(category) {
      this.$emit('expand', category);
    },
    onCollapse(category) {
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
