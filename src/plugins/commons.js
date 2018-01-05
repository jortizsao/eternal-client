import Vue from 'vue';

const myCommons = {
  getGraphqlErrorMessage(graphqlError) {
    return graphqlError.networkError
      ? graphqlError.networkError.message
      : graphqlError.graphQLErrors[0].message;
  },
};

export default {
  install() {
    Object.defineProperty(Vue.prototype, '$myCommons', { value: myCommons });
  },
};
