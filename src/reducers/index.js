import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import {reducer as formReducer} from 'redux-form';
import { reducer as notifReducer } from 're-notif';
import { user } from './user';
import { header } from './header';
import { sign } from './sign';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routeReducer,
  /* your reducers */
  notifs: notifReducer,
  user,
  header,
  sign,
});

export default rootReducer;
