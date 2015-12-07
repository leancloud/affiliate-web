export function user(state = {}, action) {
  switch (action.type) {
  case 'LOGIN_PENDING':
    return {
      ...state
    };

  case 'LOGIN_FULFILLED':
    return {
      ...state
    };

  case 'LOGIN_REJECTED':
    return {
      ...state
    };

  case 'LOGOUT':
    return {
      ...state
    };

  default:
    return state;
  }
}
