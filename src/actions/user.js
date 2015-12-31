import AV from 'avoscloud-sdk';
import { actions as notifActions } from 're-notif';
import { pushPath } from 'redux-simple-router';

const LOGIN_ERROR_MESSAGES = {
  '211': '该用户不存在'
};

export function logout() {
  AV.User.logOut();
  return {
    type: 'LOGOUT',
  };
}

export function login(fields = {}) {
  const {
    username, password
  } = fields;
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
      let nextPath = result ? result[1] : '/account';
      dispatch(pushPath(nextPath));
    }).catch((error) =>
      dispatch(notifActions.notifSend({
        message: LOGIN_ERROR_MESSAGES[error.code] || error.message,
        kind: 'danger',
        dismissAfter: 5000,
      }))
    )
  }
}

export function signup(fields = {}) {
  const {
    username, password, email
  } = fields;
  const signupPromise = new AV.User({
    username,
    password,
    email,
  }).signUp();
  return (dispatch, getState) => {
    dispatch({
      type: 'SIGNUP',
      payload: {
        promise: signupPromise,
      }
    });
    signupPromise.then(() => {
      dispatch(login({
        username,
        password,
      }));
      dispatch(notifActions.notifSend({
        message: '注册成功',
        kind: 'success',
        dismissAfter: 2000,
      }))
    }).catch((error) =>
      dispatch(notifActions.notifSend({
        message: LOGIN_ERROR_MESSAGES[error.code] || error.message,
        kind: 'danger',
        dismissAfter: 5000,
      }))
    )
  }
}

export function updateUser() {
  return (dispatch) => {
    let user = AV.User.current();
    if (user) {
      dispatch({
        type: 'USER_UPDATED',
        payload: user
      });
      user.fetch().then(user =>
        dispatch({
          type: 'USER_UPDATED',
          payload: user
        })
      );
    }
  }
}
