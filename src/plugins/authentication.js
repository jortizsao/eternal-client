import UtilsAuthentication from '@/utils/authentication/utils.authentication';

export default function ({ store }) {
  const utilsAuthentication = UtilsAuthentication();

  const authentication = {
    isUserAuthenticated() {
      return utilsAuthentication.isTokenExpired(
        store.state.authentication.token,
        store.state.authentication.tokenExpiresAt,
      );
    },
  };

  return {
    install(Vue) {
      Object.defineProperty(Vue.prototype, '$authentication', {
        value: authentication,
      });
    },
    ...authentication,
  };
}
