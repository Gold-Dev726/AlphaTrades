import * as actionTypes from "../actions/actionTypes";

export const defaultState = {
  loading: false,
  performances: [],
  totalCount:0,
  error: null,
};

const states = {
  ...defaultState,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = states, action = {}) => {
  switch (action.type) {
    case actionTypes.PERFORMANCE_START:
      return {
        ...state,
        loading: true,
        performances: [],
        totalCount:0,
        error: null,
      };
    case actionTypes.PERFORMANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        performances: action.payload.data,
        totalCount:action.payload.totalCount,
        error: null,
      };
    case actionTypes.PERFORMANCE_ERROR:
      return {
        ...state,
        loading: false,
        performances: [],
        totalCount:0,

        error: action.payload,
      };

    default:
      return state;
  }
};
