import customersService from '@/services/customers.service';
import UtilsAuthentication from '@/utils/authentication/utils.authentication';

export default function () {
  const utilsAuthentication = UtilsAuthentication();

  function setAuthenticationData({ commit }, { user, token }) {
    const { exp } = utilsAuthentication.decodeToken(token);

    commit('SET_USER', user);
    commit('authentication/SET_TOKEN', token, { root: true });
    commit('authentication/SET_TOKEN_EXPIRES_AT', new Date(exp * 1000).toISOString(), {
      root: true,
    });
  }

  return {
    SIGN_IN({ commit }, params) {
      return customersService
        .signIn(params)
        .then(({ customer, token }) =>
          setAuthenticationData({ commit }, { user: customer, token }),
        );
    },
    SIGN_UP({ commit }, params) {
      return customersService
        .signUp(params)
        .then(({ customer, token }) =>
          setAuthenticationData({ commit }, { user: customer, token }),
        );
    },
    SIGN_OUT({ commit }) {
      commit('SET_USER', null);
      commit('authentication/SET_TOKEN', '', { root: true });
      commit('authentication/SET_TOKEN_EXPIRES_AT', '', { root: true });
    },
  };
}
