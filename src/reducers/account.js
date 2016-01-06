import { combineReducers } from 'redux';

function referredUsers(state = [], action) {
  switch (action.type) {
    case 'FETCH_REFERRED_USERS_FULFILLED':
      return action.payload.map(user => user.toJSON());

    case 'LOGOUT':
      return [];

    default:
      return state;
  }
}

function withdrawals(state = [], action) {
  switch (action.type) {
    case 'FETCH_WITHDRAWAL_FULFILLED':
      return action.payload.map(withdrawal => withdrawal.toJSON());

    case 'LOGOUT':
      return [];

    default:
      return state;
  }
}

export const account = combineReducers({
  referredUsers,
  withdrawals,
});
