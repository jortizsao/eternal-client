import UtilsAuthentication from '../utils.authentication';

describe('Utils Authentication', () => {
  const utilsAuthentication = UtilsAuthentication();

  it('should decode a token', () => {
    // JWT Token for the payload
    // {
    //   "id": "id1",
    //   "email": "javier.ortizsaorin@gmail.com",
    //   "iat": 382233600,
    //   "exp": 382320000
    // }
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImlkMSIsImVtYWlsIjoiamF2aWVyLm9ydGl6c2FvcmluQGdtYWlsLmNvbSIsImlhdCI6MzgyMjMzNjAwLCJleHAiOjM4MjMyMDAwMH0.3maGqzyZRqsX0VOrlz-6ZhkWbh9XJC-UPJx9ctoSoO8';

    expect(utilsAuthentication.decodeToken(token)).toEqual({
      id: 'id1',
      email: 'javier.ortizsaorin@gmail.com',
      iat: 382233600,
      exp: 382320000,
    });
  });

  it('should check if the token has expired', () => {
    Date.now = jest.fn().mockReturnValue(new Date('2017-01-01T00:00:00.000Z').getTime());

    // no token and expiresAt after
    expect(utilsAuthentication.isTokenExpired(null, '2017-01-02T00:00:00.000Z')).toBeFalsy();
    expect(utilsAuthentication.isTokenExpired('', '2017-01-02T00:00:00.000Z')).toBeFalsy();
    // with token and no expiresAt
    expect(utilsAuthentication.isTokenExpired('123456789', '')).toBeFalsy();
    // with token and expiresAt before
    expect(utilsAuthentication.isTokenExpired('123456789', '2016-12-31T23:59:59.999Z')).toBeFalsy();
    // with token and expiresAt after
    expect(
      utilsAuthentication.isTokenExpired('123456789', '2017-01-01T00:00:00.001Z'),
    ).toBeTruthy();
  });
});
