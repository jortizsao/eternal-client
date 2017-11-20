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
});
