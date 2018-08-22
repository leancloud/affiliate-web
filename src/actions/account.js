import AV from 'leancloud-storage';

export function fetchReferredUsers() {
  const query = new AV.Query('ReferredUser')
    .limit(999)
    .equalTo('inviter', AV.User.current())
    .descending('totalPayment');

  return {
    type: 'FETCH_REFERRED_USERS',
    payload: {
      promise: query.find(),
    },
  };
}

export function fetchWithdrawals() {
  const query = new AV.Query('Withdrawal')
    .limit(999)
    .equalTo('user', AV.User.current())
    .descending('createdAt');

  return {
    type: 'FETCH_WITHDRAWAL',
    payload: {
      promise: query.find(),
    },
  };
}

export function startWithdraw() {
  return {
    type: 'WITHDRAW_START',
  };
}
