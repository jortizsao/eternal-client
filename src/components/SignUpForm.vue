<template>
  <div id="sign-up">
    <div class="signup-box-wrapper">
      <form id="form-sign-up" @submit.prevent="signUp" method="post" action="/signUp">
        <div class="clearfix">
          <div class="pull-left">
            <div class="signup-box-title">{{ $t('title') }}</div>
          </div>
          <div class="pull-right">
            <div class="signup-box-required">{{ $t('required') }}*</div>
          </div>
        </div>
        <hr class="signup-box-hr">
        <div class="signup-box-description">{{ $t('description') }}</div>
        <div class="row">
          <div class="col-sm-6">
            <div class="signup-box-input">
              <span class="text-uppercase">{{ $t('selectTitle') }}</span><br>
              <el-select class="signup-title-dropdown" :placeholder="$t('choose')" clearable
                v-model="title">
                <el-option value="mr" :label="$t('personTitles.mr')"></el-option>
                <el-option value="mrs" :label="$t('personTitles.mrs')"></el-option>
                <el-option value="ms" :label="$t('personTitles.ms')"></el-option>
                <el-option value="dr" :label="$t('personTitles.dr')"></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="signup-box-input">
              <span>{{ $t('firstName') }}*</span><br>
              <input v-validate="'required'" type="text" name="firstName"
                v-model="firstName">
              <p class="text-danger" v-show="errors.has('firstName')">
                {{ errors.first('firstName') }}
              </p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="signup-box-input">
              <span>{{ $t('secondName') }}*</span><br>
              <input v-validate="'required'" type="text" name="lastName"
                v-model="lastName">
              <p class="text-danger" v-show="errors.has('lastName')">
                {{ errors.first('lastName') }}
              </p>
            </div>
          </div>
        </div>
        <hr class="signup-box-hr">
        <div class="signup-box-input">
          <span>{{ $t('email') }}*</span><br>
          <input v-validate="'required|email'" type="email" name="email"
            v-model="email">
          <p class="text-danger" v-show="errors.has('email')">{{ errors.first('email') }}</p>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="signup-box-input">
              <span>{{ $t('password') }}*</span><br>
              <input v-validate="'required'" type="password" name="signUpPassword"
                v-model="password">
              <p class="text-danger" v-show="errors.has('signUpPassword')">
                {{ errors.first('signUpPassword') }}
              </p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="signup-box-input">
              <span>{{ $t('confirmPassword') }}*</span><br>
              <input v-validate="'required|confirmed:signUpPassword'" type="password"
                name="confirmPassword" v-model="confirmPassword">
              <p class="text-danger" v-show="errors.has('confirmPassword')">
                {{ errors.first('confirmPassword') }}
              </p>
            </div>
          </div>
        </div>
        <hr class="signup-box-hr">
        <div class="signup-box-terms">
          <input v-validate="'required'" type="checkbox" name="agreeToTerms" :value="agreeToTerms">
          <span>{{ $t('agreeTo') }} <a href="#">{{ $t('termsAndConditions') }} </a></span>
          <p class="text-danger" v-show="errors.has('agreeToTerms')">
            {{ errors.first('agreeToTerms') }}
          </p>
        </div>
        <div class="signup-box-policy">{{ $t('personalInfo') }}
          <a href="#">{{ $t('privacyPolicy') }}</a>
        </div>
        <button class="signup-register-btn">{{ $t('registerNow') }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import customersService from '@/services/customers.service';

export default {
  data() {
    return {
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: '',
    };
  },
  methods: {
    signUp() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$Progress.start();
          return customersService
            .signUp({
              title: this.title,
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              password: this.password,
              confirmPassword: this.confirmPassword,
            })
            .then(customer => {
              this.$Progress.finish();
              this.$notify({
                type: 'success',
                text: `Welcome <b>${this.$options.filters.capitalize(
                  this.firstName.toLowerCase(),
                )}</b>!`,
              });
              this.$router.push({ name: 'MyAccount', params: { id: customer.id } });
            })
            .catch(err => {
              const text = err.response.status === 400 ? err.response.data.message : undefined;
              this.$notify({ type: 'error', text });
              this.$Progress.finish();
            });
        }
      });
    },
  },
  computed: {
    ...mapState('general', ['language']),
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
  title: New Customer Registration
  required: Required Fields
  description: Create an account to store your products, easy checkouts, customer discounts, benefits and more.
  titleSelect: Title
  firstName: First Name
  secondName: Second Name
  email: Email
  confirmEmail: Confirm Email
  password: Password
  confirmPassword: Confirm Password
  pleaseAddMe: Please add me to the
  newsletter: SUNRISE Newsletter
  agreeTo: I agree to the
  termsAndConditions: Terms and Conditions
  personalInfo: Sunrise does not share or sell personal information. See
  privacyPolicy: Privacy Policy
  registerNow: Register Now
  choose: Choose
  selectTitle: Title
  personTitles:
    mr: Mr.
    mrs: Mrs.
    ms: Ms.
    dr: Dr.
de:
  title: Neukunden Resigstrierung
  required: Pflichtfeld
  description: Konto einrichten, um das Shoppen noch einfacher zu machen.
  titleSelect: Titel
  firstName: Vorname
  secondName: Nachname
  email: E-Mail
  confirmEmail: E-Mail bestätigen
  password: Passwort
  confirmPassword: Passwort bestätigen
  pleaseAddMe: Anmeldung zum
  newsletter: SUNRISE Newsletter
  agreeTo: Ich stimme den \"\" zu.
  termsAndConditions: AGB
  personalInfo: Ihre persönliche Daten werden vertaulich behandelt.
  privacyPolicy: Datenschutz
  registerNow: Jetzt registieren
  choose: Auswählen
  selectTitle: Titel
  personTitles:
    mr: Herr
    mrs: Frau
    ms: Frau
    dr: Dr.
</i18n>
