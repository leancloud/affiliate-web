export function account(state = {}, action) {
  switch (action.type) {
    case 'TOGGLE_HEADER_MENU':
      return {
        ...state,
        menuOnshow: !state.menuOnshow,
      };

    default:
      return state;
  }
}
