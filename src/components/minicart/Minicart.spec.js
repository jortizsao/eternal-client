import { shallow } from 'vue-test-utils';
import { createRenderer } from 'vue-server-renderer';
import MiniCart from './MiniCart.vue';

describe('Minicart', () => {
  describe(':props', () => {
    describe(':cart', () => {
      let renderer;
      let wrapper;

      beforeEach(() => {
        renderer = createRenderer();
        wrapper = shallow(MiniCart, {
          mocks: {
            $t: () => {},
          },
        });
      });

      afterEach(() => {
        renderer.renderToString(wrapper.vm, (err, str) => {
          expect(str).toMatchSnapshot();
        });
      });

      it('should render the number of items in the cart', () => {
        wrapper.setProps({
          cart: {
            lineItems: [
              {
                id: '1',
                name: 'product1',
              },
            ],
          },
        });
      });

      it('should render 0 items when there is no cart', () => {
        wrapper.setProps({});
      });
    });
  });
});
