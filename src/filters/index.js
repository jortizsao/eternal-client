export default {
  capitalizeAll(string) {
    if (string && typeof string === 'string') {
      return string.replace(/\b\w/g, l => l.toUpperCase());
    }
  },

  install(Vue) {
    Vue.filter('capitalizeAll', this.capitalizeAll);
  },
};
