export default function ({ authentication, utilsAuthentication }) {
  const auth = {
    isUserAuthenticated() {
      return utilsAuthentication.isTokenExpired(
        authentication.token,
        authentication.tokenExpiresAt,
      );
    },
    getUser() {
      return authentication.user;
    },
  };

  return {
    install(Vue) {
      Object.defineProperty(Vue.prototype, '$authentication', {
        value: auth,
      });
    },
    ...auth,
  };
}
