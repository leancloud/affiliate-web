import AV from 'leancloud-storage';
import { fetchWithdrawals } from './account';
import { updateUser } from './user';
const Withdrawal = AV.Object.extend('Withdrawal');

export function submitWithdrawApply(fields = {}) {
  return (dispatch) => {
    dispatch({
      type: 'WITHDRAW_NEXT_STEP',
    });
    dispatch({
      type: 'WITHDRAW_DATA_UPDATED',
      payload: fields,
    });
  };
}

export function back(steps) {
  return {
    type: 'WITHDRAW_PREV_STEP',
    payload: steps,
  };
}

export function cancel() {
  return {
    type: 'WITHDRAW_CANCELED',
  };
}

export function finish() {
  return (dispatch) => {
    dispatch({
      type: 'WITHDRAW_FINISHED',
    });
    dispatch(fetchWithdrawals());
    dispatch(updateUser());
  };
}

export function newWithdrawal() {
  return (dispatch, getState) => {
    const withdrawal = new Withdrawal(getState().withdrawModal.data);
    dispatch({
      type: 'CREATE_WITHDRAWAL',
      payload: {
        promise: withdrawal.save(),
      },
    });
    dispatch({
      type: 'WITHDRAW_NEXT_STEP',
    });
  };
}
