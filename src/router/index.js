import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import MyAccount from '@/components/my-account/MyAccount.vue';
import MyAccountPersonalDetails from '@/components/my-account/MyAccountPersonalDetails.vue';
import MyAccountChangePassword from '@/components/my-account/MyAccountChangePassword.vue';
import MyAccountAddressBook from '@/components/my-account/address-book/MyAccountAddressBook.vue';
import MyAccountAddressList from '@/components/my-account/address-book/MyAccountAddressList.vue';
import MyAccountAddressAddEditForm from '@/components/my-account/address-book/MyAccountAddressAddEditForm.vue';
import ForgotPassword from '@/components/ForgotPassword.vue';

export default function ({ authentication }) {
  Vue.use(Router);

  const scrollBehavior = (to, from, savedPosition) => savedPosition || { x: 0, y: 0 };

  const validateAuthentication = (to, from, next) => {
    if (
      to.matched.some(record => record.meta.requiresAuthentication) &&
      !authentication.isUserAuthenticated()
    ) {
      next({
        name: 'SignIn',
        // query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  };

  const router = new Router({
    mode: 'history',
    scrollBehavior,
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/user/:id/myAccount',
        name: 'MyAccount',
        component: MyAccount,
        props: true,
        meta: { requiresAuthentication: true },
        children: [
          {
            path: 'personalDetails',
            name: 'MyAccountPersonalDetails',
            meta: { tab: 'personalDetails' },
            component: MyAccountPersonalDetails,
          },
          {
            path: 'changePassword',
            name: 'MyAccountChangePassword',
            meta: { tab: 'changePassword' },
            component: MyAccountChangePassword,
          },
          {
            path: 'addressBook',
            component: MyAccountAddressBook,
            children: [
              {
                path: '',
                name: 'MyAccountAddressBookList',
                meta: { tab: 'addressBook' },
                component: MyAccountAddressList,
              },
              {
                path: 'add',
                name: 'MyAccountAddressBookAdd',
                meta: { tab: 'addressBook' },
                component: MyAccountAddressAddEditForm,
              },
              {
                path: 'edit/:addressId',
                name: 'MyAccountAddressBookEdit',
                meta: { tab: 'addressBook' },
                component: MyAccountAddressAddEditForm,
                props: true,
              },
            ],
          },
        ],
      },
      {
        path: '/user/signIn',
        name: 'SignIn',
        component: () => import('@/components/SignIn.vue'),
        beforeEnter: (to, from, next) => {
          if (authentication.isUserAuthenticated()) {
            next({
              name: 'MyAccount',
              params: { id: authentication.getUser().id },
            });
          } else {
            next();
          }
        },
      },
      {
        path: '/user/forgotPassword',
        name: 'ForgotPassword',
        component: ForgotPassword,
      },
    ],
  });

  router.beforeResolve(validateAuthentication);

  return router;
}
