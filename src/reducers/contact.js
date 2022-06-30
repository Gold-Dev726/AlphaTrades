import * as actionTypes from "../actions/actionTypes";

export const defaultState = {
  loading: false,
  contact: {},
  error: null,
};

const states = {
  ...defaultState,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = states, action = {}) => {
  switch (action.type) {
    case actionTypes.CONTACT_SUBMIT_START:
      return {
        ...state,
        loading: true,
        contact: {},
        error: null,
      };
    case actionTypes.CONTACT_SUBMIT_SUCCESS:
      return {
        ...state,
        loading: false,
        contact: action.payload,
        error: null,
      };
    case actionTypes.CONTACT_SUBMIT_ERROR:
      return {
        ...state,
        loading: false,
        contact: {},
        error: action.payload,
      };

    default:
      return state;
  }
};
