<template lang="html">
  <div id="my-account">
    <div class="my-account-title">
      <span class="my-account-title-text icon-user">{{ $t('title') }}</span>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="my-account-content">
          <div class="row">
            <div class="col-sm-3">
              <my-account-sidebar></my-account-sidebar>
            </div>
            <div id="my-account-desktop-content" class="col-sm-9">
              <my-account-personal-details :customer="customer"></my-account-personal-details>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GET_CUSTOMER_QUERY from '@/graphql/queries/customers/GetCustomer.gql';
import MyAccountSidebar from './MyAccountSidebar.vue';
import MyAccountPersonalDetails from './MyAccountPersonalDetails.vue';

export default {
  name: 'myAccount',
  props: ['id'],
  data() {
    return {
      selectedTab: 'personalDetails',
      customer: {},
    };
  },
  components: {
    MyAccountSidebar,
    MyAccountPersonalDetails,
  },
  apollo: {
    customer() {
      return {
        query: GET_CUSTOMER_QUERY,
        variables: {
          id: this.id,
        },
      };
    },
  },
};
</script>
<i18n>
en:
  title: My Account
de:
  title: Mein Konto
</i18n>
