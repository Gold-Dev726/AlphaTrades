import * as actionTypes from "../actions/actionTypes";

const defaultState = {
  uiloading: false,
  isNavOpen: true,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case actionTypes.UI_LOADER_START:
      return {
        ...state,
        uiloading: true,
      };
    case actionTypes.UI_LOADER_STOP:
      return {
        ...state,
        uiloading: false,
      };
    case actionTypes.UI_NAV_TOGGLE:
      return {
        ...state,
        isNavOpen: !state.isNavOpen,
      };
    default:
      return state;
  }
};
