import * as actionTypes from "../actions/actionTypes";

export const defaultState = {
  loading: false,
  models: [],
  subscribedMoels: [],
  error: null,
};

const states = {
  ...defaultState,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = states, action = {}) => {
  switch (action.type) {

    case actionTypes.GET_ALL_MODEL_START:
      return {
        ...state,
        loading: true,
        models: [],
        error: null,
      };
    case actionTypes.GET_ALL_MODEL_SUCCESS:
      console.log("actionTypes.GET_ALL_MODEL_SUCCESS - ", action.payload);
      return {
        ...state,
        loading: false,
        models: action.payload.data,
        error: null,
      };
    case actionTypes.GET_ALL_MODEL_ERROR:
      return {
        ...state,
        loading: false,
        models: [],
        error: action.payload,
      };


    case actionTypes.GET_PURCHASED_MODEL_SUCCESS:
      console.log("actionTypes.GET_PURCHASED_MODEL_SUCCESS - ", action.payload);
      return {
        ...state,
        loading: false,
        subscribedMoels: action.payload.purchasedModels,
        error: null,
      };



    case actionTypes.PURCHASE_MODEL_START:
      return {

        loading: true,
        lastModelPurchased: {},
        error: null,
        ...state,
      };


    case actionTypes.PURCHASE_MODEL_SUCCESS:
      return {
        ...state,
        loading: false,
        lastModelPurchased: action.payload.data,
        error: null,
        ...state,
      };

    default:
      return state;
  }
};
