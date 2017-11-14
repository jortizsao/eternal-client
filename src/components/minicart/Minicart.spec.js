import { shallow } from 'vue-test-utils';
import MiniCart from './MiniCart.vue';

describe('Minicart', () => {
  describe(':props', () => {
    describe(':cart', () => {
      it('should render the number of items in the cart', () => {
        expect.assertions(1);
        const wrapper = shallow(MiniCart, {
          propsData: {
            cart: {
              lineItems: [
                {
                  id: '1',
                  name: 'product1',
                },
              ],
            },
          },
          mocks: {
            $t: () => {},
          },
        });

        expect(wrapper.find('.cart-item-number').text()).toBe('1');
      });

      it('should render 0 items when there is no cart', () => {
        expect.assertions(1);
        const wrapper = shallow(MiniCart, {
          mocks: {
            $t: () => {},
          },
        });

        expect(wrapper.find('.cart-item-number').text()).toBe('0');
      });
    });
  });
});
