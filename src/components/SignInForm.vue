<template>
  <div id="sign-in-form">
    <div class="login-box-wrapper">
      <div class="clearfix">
        <div class="pull-left">
          <div class="login-box-title">{{ $t('title') }}</div>
        </div>
        <div class="pull-right">
          <div class="login-box-required">{{ $t('required') }}*</div>
        </div>
      </div>
      <hr class="login-box-hr">
      <div class="login-box-description">{{ $t('description') }}</div>
      <div class="login-box-input-wrapper">
        <form id="form-sign-in" @submit.prevent="signIn" method="post" action="/signIn">
          <div class="login-box-input">
            <span>{{ $t('email') }}*</span><br>
            <input type="email" v-validate="'required|email'" name="email" v-model="email">
          </div>
          <p class="text-danger" v-show="errors.has('email')">{{ errors.first('email') }}</p>
          <div class="login-box-input">
            <span>{{ $t('password') }}*</span><br>
            <input type="password" v-validate="'required'" name="password" v-model="password">
          </div>
          <p class="text-danger" v-show="errors.has('password')">{{ errors.first('password') }}</p>
          <div class="clearfix">
            <div class="pull-left">
              <div class="login-box-remember-me">
                <input id="form-login-remember-me" type="checkbox" name="rememberMe" :value="rememberMe">
                <label for="form-login-remember-me">{{ $t('rememberMe') }}</label>
              </div>
            </div>
            <div class="pull-right">
              <div class="login-box-forgot-password">
                <router-link :to="{ name: 'ForgotPassword' }">{{ $t('forgotPassword') }}</router-link>
              </div>
            </div>
          </div>
          <button class="login-box-sign-in-btn">{{ $t('signIn') }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
    };
  },
  methods: {
    signIn() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$Progress.start();
          return this.SIGN_IN({
            email: this.email,
            password: this.password,
          })
            .then(() => {
              this.$Progress.finish();
              this.$router.push({
                name: 'MyAccount',
                params: { id: this.user.id },
              });
            })
            .catch(err => {
              const text = err.response.status === 401 ? 'Invalid credentials' : undefined;
              this.$notify({ type: 'error', text });
              this.$Progress.finish();
            });
        }
      });
    },
    ...mapActions('general', ['SIGN_IN']),
  },
  computed: {
    ...mapState('general', ['language']),
    ...mapState('authentication', ['user']),
  },
  watch: {
    language() {
      this.errors.clear();
    },
  },
};
</script>

<i18n>
en:
  title: Returning Customer Sign In
  required: Required Fields
  description: If you have an account, please sign in for a faster checkout
  email: Email
  password: Password
  rememberMe: Remember Me
  forgotPassword: Forgot Password
  signIn: Sign In
de:
  title: Kundenanmeldung
  required: Pflichtfeld
  description: Für einen schnelleren Checkout Prozess, melden Sie sich bitte mit Ihrem persönlichen Kundenkonto ein.
  email: E-Mail
  password: Passwort
  rememberMe: Angemeldet bleiben
  forgotPassword: Passwort vergessen
  signIn: Anmelden
</i18n>
