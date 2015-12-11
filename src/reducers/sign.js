export function sign(state = {}, action) {
  switch (action.type) {
    case 'AGREE_TERMS':
      return {
        ...state,
        termsAgreed: true,
      };

    default:
      return state;
  }
}
