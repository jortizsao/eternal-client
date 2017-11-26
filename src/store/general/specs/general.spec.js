import { createLocalVue } from 'vue-test-utils';
import Vuex from 'vuex';
import customersService from '@/services/customers.service';
import AuthenticationStore from '@/store/authentication/index';
import GeneralStore from '../index';

describe('General Store', () => {
  let store;

  const localVue = createLocalVue();

  localVue.use(Vuex);

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        general: {
          namespaced: true,
          ...GeneralStore(),
        },
        authentication: {
          namespaced: true,
          ...AuthenticationStore(),
        },
      },
    });
  });

  describe('actions', () => {
    const customerResponse = {
      customer: {
        id: 'id1',
        email: 'javier.ortizsaorin@gmail.com',
        firstName: 'javier',
        lastName: 'ortiz',
      },
      // JWT Token for the payload
      // {
      //   "id": "id1",
      //   "email": "javier.ortizsaorin@gmail.com",
      //   "iat": 382233600,
      //   "exp": 382320000
      // }
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImlkMSIsImVtYWlsIjoiamF2aWVyLm9ydGl6c2FvcmluQGdtYWlsLmNvbSIsImlhdCI6MzgyMjMzNjAwLCJleHAiOjM4MjMyMDAwMH0.3maGqzyZRqsX0VOrlz-6ZhkWbh9XJC-UPJx9ctoSoO8',
    };

    describe('when sign in a customer', () => {
      it('on success', () => {
        expect.assertions(2);

        const signInRequest = {
          email: 'javier.ortizsaorin@gmail.com',
          password: 'password',
        };

        customersService.signIn = jest.fn().mockReturnValue(Promise.resolve(customerResponse));

        return store.dispatch('general/SIGN_IN', signInRequest).then(() => {
          expect(customersService.signIn).toHaveBeenCalledWith(signInRequest);
          expect(store.state.authentication).toEqual({
            token: customerResponse.token,
            tokenExpiresAt: '1982-02-12T00:00:00.000Z', // new Date(382320000 * 1000).toISOString()
            user: customerResponse.customer,
          });
        });
      });

      it('on failure', () => {
        expect.assertions(2);

        const signInRequest = {
          email: 'javier.ortizsaorin@gmail.com',
          password: 'password',
        };

        customersService.signIn = jest.fn().mockReturnValue(
          Promise.reject({
            response: {
              status: 401,
              data: 'Unauthorized',
            },
          }),
        );

        return store.dispatch('general/SIGN_IN', signInRequest).catch(() => {
          expect(customersService.signIn).toHaveBeenCalledWith(signInRequest);
          expect(store.state.authentication).toEqual({
            token: '',
            tokenExpiresAt: '',
            user: null,
          });
        });
      });
    });

    describe('when sign up a customer', () => {
      it('on success', () => {
        expect.assertions(2);

        const signUpRequest = {
          firstName: 'javier',
          lastName: 'ortiz saorin',
          email: 'javier.ortizsaorin@gmail.com',
          password: 'password',
          confirmPassword: 'password',
        };

        customersService.signUp = jest.fn().mockReturnValue(Promise.resolve(customerResponse));

        return store.dispatch('general/SIGN_UP', signUpRequest).then(() => {
          expect(customersService.signUp).toHaveBeenCalledWith(signUpRequest);
          expect(store.state.authentication).toEqual({
            token: customerResponse.token,
            tokenExpiresAt: '1982-02-12T00:00:00.000Z', // new Date(382320000 * 1000).toISOString()
            user: customerResponse.customer,
          });
        });
      });

      it('on failure', () => {
        expect.assertions(2);

        const signUpRequest = {
          firstName: 'javier',
          lastName: 'ortiz saorin',
          email: 'javier.ortizsaorin@gmail.com',
          password: 'password',
          confirmPassword: 'password',
        };

        customersService.signUp = jest.fn().mockReturnValue(
          Promise.reject({
            response: {
              status: 400,
              data: 'Email already exists',
            },
          }),
        );

        return store.dispatch('general/SIGN_UP', signUpRequest).catch(() => {
          expect(customersService.signUp).toHaveBeenCalledWith(signUpRequest);
          expect(store.state.authentication).toEqual({
            token: '',
            tokenExpiresAt: '',
            user: null,
          });
        });
      });
    });

    describe('when sign out a customer', () => {
      it('on success', () => {
        expect.assertions(1);

        const signInRequest = {
          email: 'javier.ortizsaorin@gmail.com',
          password: 'password',
        };

        customersService.signIn = jest.fn().mockReturnValue(Promise.resolve(customerResponse));

        return store.dispatch('general/SIGN_IN', signInRequest).then(() => {
          store.dispatch('general/SIGN_OUT');

          expect(store.state.authentication).toEqual({
            token: '',
            tokenExpiresAt: '',
            user: null,
          });
        });
      });
    });
  });
});
