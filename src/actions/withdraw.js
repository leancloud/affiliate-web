import AV from 'avoscloud-sdk';
import { fetchWithdrawals } from './account';
const Withdrawal = AV.Object.extend('Withdrawal');

export function submitWithdrawApply(fields = {}) {
  return (dispatch) => {
    dispatch({
      type: 'WITHDRAW_NEXT_STEP'
    });
    dispatch({
      type: 'WITHDRAW_DATA_UPDATED',
      payload: fields
    })
  };
}

export function back(steps) {
  return {
    type: 'WITHDRAW_PREV_STEP',
    payload: steps
  };
}

export function cancel() {
  return {
    type: 'WITHDRAW_CANCELED'
  };
}

export function finish() {
  return (dispatch) => {
    dispatch({
      type: 'WITHDRAW_FINISHED'
    });
    dispatch(fetchWithdrawals());
  }
}

export function newWithdrawal() {
  return (dispatch, getState) => {
    let withdrawal = new Withdrawal(getState().withdrawModal.data);
    dispatch({
      type: 'CREATE_WITHDRAWAL',
      payload: {
        promise: withdrawal.save()
      }
    });
    dispatch({
      type: 'WITHDRAW_NEXT_STEP'
    });
  };
}
