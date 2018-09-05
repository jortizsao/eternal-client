import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';

export default function ({ authentication, defaultLanguage, setLanguage }) {
  Vue.use(Router);

  const scrollBehavior = (to, from, savedPosition) => savedPosition || { x: 0, y: 0 };

  const validateAuthentication = (to, from, next) => {
    if (
      to.matched.some(record => record.meta.requiresAuthentication) &&
      !authentication.isUserAuthenticated()
    ) {
      next({ name: 'SignIn' });
    } else {
      next();
    }
  };

  const setLocale = (to, from, next) => {
    const locales = ['en', 'de'];
    const { locale } = to.params;

    if (locales.some(l => l === locale)) {
      setLanguage(locale);
      next();
    } else {
      setLanguage(defaultLanguage);
      next({ path: `/${defaultLanguage}` });
    }
  };

  const router = new Router({
    mode: 'history',
    scrollBehavior,
    routes: [
      {
        path: '/',
        redirect: `/${defaultLanguage}`,
      },
      {
        path: '/:locale',
        component: {
          template: '<keep-alive include="home"><router-view /></keep-alive>',
        },
        children: [
          {
            path: '',
            name: 'Home',
            component: Home,
          },
          {
            path: 'user/:id/myAccount',
            name: 'MyAccount',
            component: () => import('@/components/my-account/MyAccount.vue'),
            props: true,
            meta: { requiresAuthentication: true },
            children: [
              {
                path: 'personalDetails',
                name: 'MyAccountPersonalDetails',
                meta: { tab: 'personalDetails' },
                component: () => import('@/components/my-account/MyAccountPersonalDetails.vue'),
              },
              {
                path: 'changePassword',
                name: 'MyAccountChangePassword',
                meta: { tab: 'changePassword' },
                component: () => import('@/components/my-account/MyAccountChangePassword.vue'),
              },
              {
                path: 'addressBook',
                component: () =>
                  import('@/components/my-account/address-book/MyAccountAddressBook.vue'),
                children: [
                  {
                    path: '',
                    name: 'MyAccountAddressBookList',
                    meta: { tab: 'addressBook' },
                    component: () =>
                      import('@/components/my-account/address-book/MyAccountAddressList.vue'),
                  },
                  {
                    path: 'add',
                    name: 'MyAccountAddressBookAdd',
                    meta: { tab: 'addressBook' },
                    component: () =>
                      import('@/components/my-account/address-book/MyAccountAddressAddEditForm.vue'),
                  },
                  {
                    path: 'edit/:addressId',
                    name: 'MyAccountAddressBookEdit',
                    meta: { tab: 'addressBook' },
                    component: () =>
                      import('@/components/my-account/address-book/MyAccountAddressAddEditForm.vue'),
                    props: true,
                  },
                ],
              },
            ],
          },
          {
            path: 'user/signIn',
            name: 'SignIn',
            component: () => import('@/components/SignIn.vue'),
            beforeEnter: (to, from, next) => {
              if (authentication.isUserAuthenticated()) {
                next({
                  name: 'MyAccountPersonalDetails',
                  params: { id: authentication.getUser().id },
                });
              } else {
                next();
              }
            },
          },
          {
            path: 'user/forgotPassword',
            name: 'ForgotPassword',
            component: () => import('@/components/ForgotPassword.vue'),
          },
          {
            path: 'products/:slug',
            name: 'ProductDetailPage',
            component: () => import('@/components/products/product-detail/ProductDetailPage.vue'),
            props: true,
          },
        ],
      },
    ],
  });

  router.beforeResolve(setLocale);
  router.beforeResolve(validateAuthentication);

  return router;
}
