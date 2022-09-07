export const LOGGED_IN = 'LOGGED_IN';
export const LOGOUT = 'LOGOUT';

export const loggedIn = () => ({
    type: LOGGED_IN,
  });

export const logout = () =>({
    type: LOGOUT
})