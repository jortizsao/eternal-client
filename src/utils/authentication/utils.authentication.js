export default function () {
  return {
    decodeToken(token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(atob(base64));
    },
    isTokenExpired(token, tokenExpiresAt) {
      return token && tokenExpiresAt && new Date(tokenExpiresAt).getTime() > Date.now();
    },
  };
}
