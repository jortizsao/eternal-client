import UtilsAuthentication from '@/utils/authentication/utils.authentication';
import Authentication from '../index';

describe('Authentication Plugin', () => {
  let utilsAuthentication;

  beforeEach(() => {
    utilsAuthentication = UtilsAuthentication();
  });

  it('should get the authenticated user', () => {
    const user = {
      id: 'id1',
      email: 'javier.ortizsaorin@gmail.com',
    };

    const authenticationPlugin = Authentication({
      authentication: {
        user,
      },
    });

    expect(authenticationPlugin.getUser()).toEqual(user);
  });

  it('should check if the user is authenticated', () => {
    const authenticationPlugin = Authentication({
      authentication: {
        token: '123456789ABCDEF',
        tokenExpiresAt: '1982-02-11T00:00:00.000Z',
      },
      utilsAuthentication,
    });

    utilsAuthentication.isTokenExpired = jest.fn();

    authenticationPlugin.isUserAuthenticated();

    expect(utilsAuthentication.isTokenExpired).toHaveBeenCalledWith(
      '123456789ABCDEF',
      '1982-02-11T00:00:00.000Z',
    );
  });
});
