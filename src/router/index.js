import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import MyAccount from '../components/MyAccount.vue';
import ForgotPassword from '../components/ForgotPassword.vue';

Vue.use(Router);

const scrollBehavior = (to, from, savedPosition) => savedPosition || { x: 0, y: 0 };

export default new Router({
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
    },
    {
      path: '/user/signIn',
      name: 'SignIn',
      component: () => import('../components/SignIn.vue'),
    },
    {
      path: '/user/forgotPassword',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },
  ],
});
