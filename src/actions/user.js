import AV from 'avoscloud-sdk';
import { actions as notifActions } from 're-notif';
import { updatePath } from 'redux-simple-router';

const LOGIN_ERROR_MESSAGES = {
  '211': '该用户不存在'
};

function _login(authInfo = {}) {
  return {
    type: 'LOGIN',
    payload: {
      promise: AV.User.logIn(username, password),
    }
  };
}

export function logout() {
  AV.User.logOut();
  return {
    type: 'LOGOUT',
  };
}

export function login(authInfo = {}) {
  const {
    username, password
  } = authInfo
  const loginPromise = AV.User.logIn(username, password);
  return (dispatch, getState) => {
    dispatch({
      type: 'LOGIN',
      payload: {
        promise: loginPromise,
      }
    });
    loginPromise.then(() => {
      let result = getState().routing.path.match(/[\?&]next=([^&]*)/);
      let nextPath = result ? result[1] : '/';
      dispatch(updatePath(nextPath));
    }).catch((error) =>
      dispatch(notifActions.notifSend({
        message: LOGIN_ERROR_MESSAGES[error.code] || error.message,
        kind: 'danger',
        dismissAfter: 5000,
      }))
    )
  }
}
