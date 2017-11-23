import Vue from 'vue';
import Vuex from 'vuex';
import createPersist from 'vuex-localstorage';
import general from './general';
import authentication from './authentication';

export default function () {
  Vue.use(Vuex);

  return new Vuex.Store({
    modules: {
      general: {
        namespaced: true,
        ...general(),
      },
      authentication: {
        namespaced: true,
        ...authentication(),
      },
    },
    plugins: [
      createPersist({
        namespace: 'eternal',
        initialState: {},
        expires: 7 * 24 * 60 * 60 * 1000, // one week
      }),
    ],
    strict: process.env.NODE_ENV !== 'production',
  });
}
