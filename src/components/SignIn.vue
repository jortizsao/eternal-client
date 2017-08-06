<template>
  <div id="sign-in">
    <div class="my-account-login-page-title">
      <span class="icon-user">{{ $t('pageTitle') }}</span>
    </div>

    <div class="login-signup-box-wrapper">
      <div class="row">
        <div class="col-sm-6">
          <sign-in-form></sign-in-form>
        </div>
        <div class="col-sm-6">
          <div class="signup-box-mobile">
            <sign-up-form></sign-up-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignInForm from './SignInForm.vue';
import SignUpForm from './SignUpForm.vue';

export default {
  data() {
    return {};
  },
  components: {
    SignInForm,
    SignUpForm,
  },
};
</script>

<i18n>
en:
  pageTitle: Customer Sign In
de:
  pageTitle: Kundenanmeldung
</i18n>
