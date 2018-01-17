import Vue from 'vue';

const myCommons = {
  getGraphqlErrorMessage(graphqlError) {
    return graphqlError.networkError
      ? graphqlError.networkError.message
      : graphqlError.graphQLErrors[0].message;
  },
  addOrUpdateArray(array, item) {
    const index = array.findIndex(c => c.id === item.id);

    if (index >= 0) {
      return [...array.slice(0, index), item, ...array.slice(index + 1)];
    }

    return [...array, item];
  },
  removeFromArray(array, item) {
    return array.filter(it => it.id !== item.id);
  },
};

export default {
  install() {
    Object.defineProperty(Vue.prototype, '$myCommons', { value: myCommons });
  },
};
