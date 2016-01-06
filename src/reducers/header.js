import { UPDATE_PATH } from 'redux-simple-router';

export function header(state = {}, action) {
  switch (action.type) {
    case 'TOGGLE_HEADER_MENU':
      return {
        ...state,
        menuOnshow: !state.menuOnshow,
      };

    case UPDATE_PATH:
    case 'HIDE_HEADER_MENU':
      return {
        ...state,
        menuOnshow: false,
      };

    default:
      return state;
  }
}
