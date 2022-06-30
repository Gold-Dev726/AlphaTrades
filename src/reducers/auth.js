import * as actionTypes from "../actions/actionTypes";

export const defaultState = {
  loading: false,
  data: null,
  error: null,
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case actionTypes.DETAIL_START:
      return {
        ...state,
        loading: true,
        data: null,
        error: null,
      };
    case actionTypes.DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case actionTypes.DETAIL_ERROR:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
