export function user(state = {}, action) {
  switch (action.type) {
    case 'LOGIN_PENDING':
      return {
        loading: true,
      };

    case 'USER_UPDATED':
    case 'LOGIN_FULFILLED':
      return Object.assign({
        loading: false,
        isAuthenticated: true,
      }, action.payload.toJSON());

    case 'LOGIN_REJECTED':
      return {
        loading: false
      };

    case 'LOGOUT':
      return {};

    default:
      return state;
  }
}
