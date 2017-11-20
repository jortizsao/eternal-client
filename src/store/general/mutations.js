export default function () {
  return {
    SET_LANGUAGE(state, language) {
      state.language = language;
    },
    SET_USER(state, user) {
      if (user) {
        state.user = {
          ...state.user,
          ...user,
        };
      } else {
        state.user = null;
      }
    },
  };
}
