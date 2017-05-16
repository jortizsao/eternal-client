<template>
  <div id="sign-up">
    <div class="signup-box-wrapper">
      <form id="form-sign-up" method="post" action="">
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
        <!-- <div class="row">
          {{> form/global-messages messages=form.messages}}
          {{> form/global-errors errors=form.errors}}
        </div> -->
        <div class="row">
          <div class="col-sm-6">
            <div class="signup-box-input">
              <span class="text-uppercase">{{ $t('selectTitle') }}</span><br>
              <select id="title" class="checkout-dropdown" :value="title">
                <option value="" selected>{{ $t('choose') }}</option>
                <option value="mr" >{{ $t('personTitles.mr') }}</option>
                <option value="mrs" >{{ $t('personTitles.mrs') }}</option>
                <option value="ms" >{{ $t('personTitles.ms') }}</option>
                <option value="dr" >{{ $t('personTitles.dr') }}</option>
              </select>
            </div>

         <!-- {{> form/choose-title containerClass="signup-box-input" selectId="title" selectName="title" options=settings.title}} -->
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="signup-box-input">
              <span>{{ $t('firstName') }}*</span><br>
              <input type="text" name="firstName" :value="firstName">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="signup-box-input">
              <span>{{ $t('secondName') }}*</span><br>
              <input type="text" name="lastName" :value="lastName">
            </div>
          </div>
        </div>
        <hr class="signup-box-hr">
        <div class="signup-box-input">
          <span>{{ $t('email') }}*</span><br>
          <input type="email" name="email" :value="email">
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="signup-box-input">
              <span>{{ $t('password') }}*</span><br>
              <input type="password" name="password" :value="password">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="signup-box-input">
              <span>{{ $t('confirmPassword') }}*</span><br>
              <input type="password" name="confirmPassword" :value="confirmPassword">
            </div>
          </div>
        </div>
        <hr class="signup-box-hr">
        <div class="signup-box-terms">
          <input type="checkbox" name="agreeToTerms" :value="agreeToTerms">
          <span>{{ $t('agreeTo') }} <a href="#">{{ $t('termsAndConditions') }} </a></span>
        </div>
        <div class="signup-box-policy">{{ $t('personalInfo') }} <a href="#">{{ $t('privacyPolicy') }}</a></div>
        <button class="signup-register-btn">{{ $t('registerNow') }}</button>
      </form>
    </div>
  </div>
</template>

<script>
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
    }
  }
}
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
