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
              <my-account-sidebar @selected-tab="onSelectedTab" :selectedTab="selectedTab"></my-account-sidebar>
            </div>
            <div id="my-account-desktop-content" class="col-sm-9">
              <router-view :customer="customer"></router-view>
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

export default {
  name: 'myAccount',
  props: ['id'],
  data() {
    return {
      customer: {},
    };
  },
  methods: {
    onSelectedTab(tab) {
      switch (tab) {
        case 'changePassword':
          return this.$router.push({ name: 'MyAccountChangePassword' });
        case 'addressBook':
          return this.$router.push({ name: 'MyAccountAddressBookList' });
        default:
          this.$router.push({ name: 'MyAccountPersonalDetails' });
      }
    },
  },
  computed: {
    selectedTab() {
      return this.$route.meta.tab;
    },
  },
  components: {
    MyAccountSidebar,
  },
  apollo: {
    customer() {
      return {
        query: GET_CUSTOMER_QUERY,
        variables: {
          id: this.id,
        },
        error(err) {
          this.$notify({ type: 'error', text: `Error getting customer: ${err}` });
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
