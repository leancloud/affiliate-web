import AV from 'leancloud-storage';
import { actions as notifActions } from 're-notif';
import { pushPath } from 'redux-simple-router';

const ERROR_MESSAGES = {
  '210': '密码不正确',
  '211': '此用户不存在',
  '202': '此用户名已被注册',
  '203': '此邮箱已被注册',
  '205': '没有用此邮箱注册的用户',
};

export function logout() {
  AV.User.logOut();
  return {
    type: 'LOGOUT',
  };
}

export function login(fields = {}) {
  const {
    username,
    password,
  } = fields;
  const loginPromise = AV.User.logIn(username, password);
  return (dispatch, getState) => {
    dispatch({
      type: 'LOGIN',
      payload: {
        promise: loginPromise,
      },
    });
    loginPromise.then(() => {
      const result = getState().routing.path.match(/[\?&]next=([^&]*)/);
      const nextPath = result ? result[1] : '/account';
      dispatch(pushPath(nextPath));
    }).catch((error) =>
      dispatch(notifActions.notifSend({
        message: ERROR_MESSAGES[error.code] || error.message,
        kind: 'danger',
        dismissAfter: 5000,
      }))
    );
  };
}

export function signup(fields = {}) {
  const {
    username,
    password,
    email,
  } = fields;
  const signupPromise = new AV.User({
    username,
    password,
    email,
  }).signUp();
  return (dispatch) => {
    dispatch({
      type: 'SIGNUP',
      payload: {
        promise: signupPromise,
      },
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
      }));
    }).catch((error) =>
      dispatch(notifActions.notifSend({
        message: ERROR_MESSAGES[error.code] || error.message,
        kind: 'danger',
        dismissAfter: 5000,
      }))
    );
  };
}

export function changePassword(fields = {}) {
  const {
    newPassword,
    password,
  } = fields;
  return (dispatch) => {
    AV.User.current().updatePassword(password, newPassword).then(() =>
      dispatch(notifActions.notifSend({
        message: '修改密码成功',
        kind: 'success',
        dismissAfter: 2000,
      }))
    ).catch((error) =>
      dispatch(notifActions.notifSend({
        message: ERROR_MESSAGES[error.code] || error.message,
        kind: 'danger',
        dismissAfter: 5000,
      }))
    );
  };
}

export function updateUser(event) {
  if (event) {
    event.preventDefault();
  }
  return (dispatch) => {
    const user = AV.User.current();
    if (user) {
      dispatch({
        type: 'USER_UPDATED',
        payload: user,
      });
      user.fetch().then(updatedUser =>
        dispatch({
          type: 'USER_UPDATED',
          payload: updatedUser,
        })
      );
    }
  };
}

export function updateInfo(fields = {}) {
  return (dispatch) => {
    AV.User.current().set(fields).save().then(() => {
      dispatch(notifActions.notifSend({
        message: '更新信息成功',
        kind: 'success',
        dismissAfter: 2000,
      }));
      dispatch(updateUser());
    }).catch((error) =>
      dispatch(notifActions.notifSend({
        message: ERROR_MESSAGES[error.code] || error.message,
        kind: 'danger',
        dismissAfter: 5000,
      }))
    );
  };
}

export function requestEmailVerify() {
  return (dispatch, getState) => {
    const email = getState().user.email;
    AV.User.requestEmailVerify(email).then(() =>
      dispatch(notifActions.notifSend({
        message: '验证邮件发送成功',
        kind: 'success',
        dismissAfter: 2000,
      }))
    ).catch((error) =>
      dispatch(notifActions.notifSend({
        message: ERROR_MESSAGES[error.code] || error.message,
        kind: 'danger',
        dismissAfter: 5000,
      }))
    );
  };
}

export function resetPassword(fields = {}) {
  return (dispatch) => {
    AV.User.requestPasswordReset(fields.email).then(() =>
      dispatch(notifActions.notifSend({
        message: '密码重设邮件发送成功',
        kind: 'success',
        dismissAfter: 2000,
      }))
    ).catch((error) =>
      dispatch(notifActions.notifSend({
        message: ERROR_MESSAGES[error.code] || error.message,
        kind: 'danger',
        dismissAfter: 5000,
      }))
    );
  };
}
