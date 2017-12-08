<template lang="html">
  <div class="personal-details">
    <div class="personal-details-text-one">
      <span>{{ $t('welcomeBack') }}</span>
      <span>{{customer.firstName}}</span>
    </div>
    <div class="personal-details-text-two">
      {{ $t('welcomeDescription') }}
      <span class="customer-number">{{customer.customerNumber}}</span>
    </div>
      <div class="personal-details-title">
          <span>{{ $t('title') }}</span>
          <span v-show="isEditing" class="pull-right required-text">{{ $t('personalDetailsForm.required') }}*</span>
      </div>

      <div v-show="!isEditing">
        <div class="personal-details-box">
          <div>
              {{customer.title}}
              {{customer.firstName}}
              {{customer.lastName}}
          </div>
          <div>{{customer.email}}</div><br>
            <div v-show="customer.isSubscribed">{{ $t('subscribedToNewsletter') }}</div>
          <div class="personal-details-box-edit">
            <button class="personal-details-edit-show-btn" @click="setIsEditing(true)">
              <img src="../../assets/img/edit-1.png" alt="edit icon">{{ $t('edit') }}
            </button>
          </div>
        </div>
    </div>

    <div v-show="isEditing" class="personal-details-edit">
        <form id="form-edit-personal-details" @submit.prevent="updateDetails" method="post" action="/updateDetails">
          <div class="row">
            <div class="col-sm-12">
              <div class="form-sections">
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
              <div class="form-sections">
                <span class="form-labels">{{ $t('personalDetailsForm.firstName') }}*</span><br>
                <input class="form-inputs" v-validate="'required'" v-model="firstName" name="firstName" type="text">
              </div>
              <p class="text-danger" v-show="errors.has('firstName')">{{ errors.first('firstName') }}</p>
              <div class="form-sections">
                <span class="form-labels">{{ $t('personalDetailsForm.email') }}*</span><br>
                <input class="form-inputs" v-validate="'required|email'" v-model="email" name="email" type="email"><br>
                <span class="form-notes"></span>
              </div>
              <p class="text-danger" v-show="errors.has('email')">{{ errors.first('email') }}</p>
            </div>
            <div class="col-sm-6">
              <div class="form-sections">
                <span class="form-labels">{{ $t('personalDetailsForm.lastName') }}*</span><br>
                <input class="form-inputs" v-validate="'required'" v-model="lastName" name="lastName" type="text">
              </div>
              <p class="text-danger" v-show="errors.has('lastName')">{{ errors.first('lastName') }}</p>
            </div>
          </div>

          <hr class="light-grey-hr">

          <div class="personal-details-newsletter">
            <span>
              <input name="subscribeToNewsletter" type="checkbox" />
              {{ $t('personalDetailsForm.subscribeToNewsletter') }}
            </span>
          </div>
          <div class="personal-details-edit-btn">
            <span>
              <button type="submit" class="update-btn">{{ $t('updateBtn') }}</button>
              <button type="button" @click="cancelEdition" class="cancel-btn">{{ $t('cancelBtn') }}</button>
            </span>
          </div>
        </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    customer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      title: '',
      firstName: '',
      lastName: '',
      email: '',
    };
  },
  created() {
    this.setPersonalDetails(this.customer);
  },
  methods: {
    setIsEditing(isEditing) {
      this.isEditing = isEditing;
    },
    cancelEdition() {
      this.setIsEditing(false);
      this.setPersonalDetails(this.customer);
    },
    setPersonalDetails({ title, firstName, lastName, email }) {
      this.title = title;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
    },
    updateDetails() {
      this.$validator.validateAll().then(result => {
        if (result) {
          console.log('Updating details', this.firstName, this.lastName, this.email);
        }
      });
    },
  },
  watch: {
    customer() {
      this.setPersonalDetails(this.customer);
    },
  },
};
</script>
<i18n>
en:
  title: Your Personal Details
  shopAllBtn: Shop All
  updateBtn: Update Details
  cancelBtn: Cancel
  edit: Edit
  welcomeBack: Welcome back
  welcomeDescription: for an even better customer service please provide your customer number
  subscribedToNewsletter: Subscribed to weekly newsletter
  personalDetailsForm:
    required: Required
    title: Title
    firstName: First Name
    lastName: Last Name
    phone: Telephone Number
    email: Email Address
    password: Password
    confirmPassword: Confirm Password
    subscribeToNewsletter: Please add me to the Sunrise Newsletter
  choose: Choose
  selectTitle: Title
  personTitles:
    mr: Mr.
    mrs: Mrs.
    ms: Ms.
    dr: Dr.
de:
  title: Ihre Benutzerdaten
  shopAllBtn: Alles bestellen
  updateBtn: Details aktualisieren
  cancelBtn: Abbrechen
  edit: Bearbeiten
  welcomeBack: Willkommen zurück
  welcomeDescription: Für einen besseren Kundenservice geben Sie bitte Ihre Kundennummer an.
  subscribedToNewsletter: Subscribed to weekly newsletter
  personalDetailsForm:
    required: Pflichtfeld
    title: Titel
    firstName: Vorname
    lastName: Nachname
    phone: Telefon
    email: E-Mail
    password: Passwort
    confirmPassword: Passwort bestätigen
    subscribeToNewsletter: Please add me to the Sunrise Newsletter
  choose: Auswählen
  selectTitle: Titel
  personTitles:
    mr: Herr
    mrs: Frau
    ms: Frau
    dr: Dr.
</i18n>
