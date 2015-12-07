import AV from 'avoscloud-sdk';

export function login(authInfo = {}) {
  const { username, password } = authInfo
  return {
    type: 'LOGIN',
    payload: {
      promise: AV.User.logIn(username, password),
    }
  };
}

export function logout() {
  return {
    type: 'LOGOUT',
  };
}
