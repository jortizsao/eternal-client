import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import MyAccount from '../components/MyAccount.vue';
import SignIn from '../components/SignIn.vue';
import ForgotPassword from '../components/ForgotPassword.vue';

Vue.use(Router);

export default new Router({
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
      component: SignIn,
    },
    {
      path: '/user/forgotPassword',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },
  ],
});
