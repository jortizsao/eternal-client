import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
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
        component: () => import('@/components/my-account/MyAccount.vue'),
        props: true,
        meta: { requiresAuthentication: true },
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
