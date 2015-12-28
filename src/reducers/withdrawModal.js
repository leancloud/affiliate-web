import { combineReducers } from 'redux'

function step(state = 0, action) {
  switch (action.type) {
    case 'WITHDRAW_START':
      return 1;
    case 'WITHDRAW_CANCELED':
    case 'WITHDRAW_FINISHED':
      return 0;
    case 'WITHDRAW_NEXT_STEP':
      return state + 1;
    case 'WITHDRAW_PREV_STEP':
      let steps = action.payload;
      if (typeof steps !== 'number') {
        steps = 1;
      }
      return state - steps;
    default:
      return state;
  }
}

function data(state = {}, action) {
  switch (action.type) {
    case 'WITHDRAW_CANCELED':
    case 'WITHDRAW_FINISHED':
      return {};
    case 'WITHDRAW_DATA_UPDATED':
      return action.payload;
    default:
      return state;
  }
}

function withdrawal(state = {}, action) {
  switch (action.type) {
    case 'CREATE_WITHDRAWAL_PENDING':
      return {
        loading: true
      };
    case 'CREATE_WITHDRAWAL_FULFILLED':
      return {
        loading: false
      };
    case 'CREATE_WITHDRAWAL_REJECTED':
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export const withdrawModal = combineReducers({
  step,
  data,
  withdrawal,
});
