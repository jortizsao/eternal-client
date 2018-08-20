export default {
  capitalizeAll(string) {
    if (string && typeof string === 'string') {
      return string.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    }
  },
  money(amount) {
    if (!amount) {
      return '-';
    }

    return `${amount.currencyCode} ${(amount.centAmount / 100).toFixed(2)}`;
  },
  install(Vue) {
    Vue.filter('capitalizeAll', this.capitalizeAll);
    Vue.filter('money', this.money);
  },
};
