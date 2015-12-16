import AV from 'avoscloud-sdk';

export function fetchReferredUsers() {
  var query = new AV.Query('ReferredUser')
    .equalTo('inviter', AV.User.current())
    .descending('totalPayment');

  return {
    type: 'FETCH_REFERRED_USERS',
    payload: {
      promise: query.find(),
    }
  };
}

export function fetchWithdrawal() {
  return {
    type: 'FETCH_WITHDRAWAL',
  };
}
