export default {
  SET_LANGUAGE(state, language) {
    state.language = language;
  },
  SET_USER(state, user) {
    state.user = {
      ...state.user,
      ...user,
    };
  },
};
