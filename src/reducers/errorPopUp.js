import * as actionTypes from "../actions/actionTypes";

const defaultState = {
  errorModalloading: false,
  errorPayload: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case actionTypes.ERROR_POPUP_START:
      return {
        ...state,
        errorPayload: action.payload,
        errorModalloading: true,
      };
    case actionTypes.ERROR_POPUP_STOP:
      return {
        ...state,
        errorPayload: null,
        errorModalloading: false,
      };
    default:
      return state;
  }
};
