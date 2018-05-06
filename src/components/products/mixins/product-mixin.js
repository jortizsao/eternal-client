export default {
  computed: {
    productName() {
      return this.product ? this.product.masterData.current.name : 'not defined';
    },
  },
};
