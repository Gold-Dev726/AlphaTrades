import * as actionTypes from "../actions/actionTypes";

export const defaultState = {
  loading: false,
  authLoading: false,
  data: null,
  error: null,
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {

    case actionTypes.CONNECT_WALLET_START:
      return {
        ...state,
        loading: true,
        authLoading: false,
        data: null,
        error: null,
      };

    case actionTypes.DISCONNECT_WALLET_SUCCESS:
    case actionTypes.CONNECT_WALLET_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        authLoading: false,
        error: null,
      };
    case actionTypes.CONNECT_WALLET_ERROR:
      return {
        ...state,
        loading: false,
        authLoading: false,
        data: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
