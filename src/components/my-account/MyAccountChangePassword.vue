<template>
  <div id="my-account-change-password" class="change-password">
    <div class="change-password-wrapper">
      <div class="personal-details-title">
        <span>{{ $t('changePasswordTitle') }}</span>
        <span class="pull-right required-text">{{ $t('required') }}*</span>
      </div>
      <form id="form-change-password" @submit.prevent="changePassword" method="post" action="/changePassword">
        <div class="row">
          <div class="col-sm-6">
            <div class="form-sections">
              <span class="form-labels">{{ $t('currentPasswordLabelTxt') }}*</span><br>
              <input name="currentPassword" v-validate="'required'" v-model="currentPassword" class="form-inputs" type="password">
              <p class="text-danger" v-show="errors.has('currentPassword')">
                {{ errors.first('currentPassword') }}
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="form-sections">
              <span class="form-labels">{{ $t('newPasswordLabelTxt') }}*</span><br>
              <input name="newPassword" v-validate="'required'" v-model="newPassword" class="form-inputs" type="password">
              <p class="text-danger" v-show="errors.has('newPassword')">
                {{ errors.first('newPassword') }}
              </p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-sections">
              <span class="form-labels">{{ $t('confirmPasswordLabelTxt') }}*</span><br>
              <input name="confirmPassword" v-validate="'required|confirmed:newPassword'" v-model="confirmPassword" class="form-inputs" type="password">
              <p class="text-danger" v-show="errors.has('confirmPassword')">
                {{ errors.first('confirmPassword') }}
              </p>
            </div>
          </div>
        </div>
        <hr class="light-grey-hr">
        <div class="personal-details-edit-btn">
          <span>
            <button type="submit" class="update-btn password-change-btn">
              {{ $t('changeBtn') }}
            </button>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import CHANGE_CUSTOMER_PASSWORD_MUTATION from '@/graphql/mutations/customers/ChangeCustomerPassword.gql';

export default {
  props: {
    customer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  },
  methods: {
    changePassword() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$Progress.start();

          this.$apollo
            .mutate({
              mutation: CHANGE_CUSTOMER_PASSWORD_MUTATION,
              variables: {
                id: this.customer.id,
                currentPassword: this.currentPassword,
                newPassword: this.newPassword,
              },
            })
            .then(() => {
              this.$notify({ type: 'success', text: 'Password changed', duration: 1000 });
              this.reset();
              this.$validator.reset();
              this.$Progress.finish();
            })
            .catch(err => {
              this.$notify({
                type: 'error',
                text: `Error changing password. ${this.$myCommons.getGraphqlErrorMessage(err)}`,
              });
              this.$Progress.finish();
            });
        }
      });
    },
    reset() {
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
    },
  },
};
</script>
<i18n>
en:
  required: Required
  currentPasswordLabelTxt: Current password
  newPasswordLabelTxt: New password
  confirmPasswordLabelTxt: Confirm new password
  changePasswordTitle: Change your password
  changeBtn: Change password
  feedbackMessage: Password changed successfully.
de:
  required: Pflichtfeld
  currentPasswordLabelTxt: Aktuelles Passwort
  newPasswordLabelTxt: Neues Passwort
  confirmPasswordLabelTxt: Neues Passwort bestätigen
  changePasswordTitle: Passwort ändern
  changeBtn: Passwort ändern
  feedbackMessage: Kennwort erfolgreich geändert.
</i18n>
