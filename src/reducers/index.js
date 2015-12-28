import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import {reducer as formReducer} from 'redux-form';
import { reducer as notifReducer } from 're-notif';
import { user } from './user';
import { header } from './header';
import { sign } from './sign';
import { account } from './account';
import { withdrawModal } from './withdrawModal';

const rootReducer = combineReducers({
  form: formReducer.normalize({
    withdraw: {
      // redux 得到的类型是 string，转换为 number
      amount: value => value && Number(value)
    }
  }),
  routing: routeReducer,
  /* your reducers */
  notifs: notifReducer,
  user,
  header,
  sign,
  account,
  withdrawModal,
});

export default rootReducer;
