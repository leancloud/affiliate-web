import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import {reducer as formReducer} from 'redux-form';
import { reducer as notifReducer } from 're-notif';
import { items } from './items';
import { user } from './user';
import { header } from './header';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routeReducer,
  /* your reducers */
  notifs: notifReducer,
  items,
  user,
  header,
});

export default rootReducer;
