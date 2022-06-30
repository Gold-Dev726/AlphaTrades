import * as actionTypes from "./actionTypes";
import modelService from "../services/modelService";
import { customToast } from "../helpers/customToast";
import { StartLoading, StopLoading } from "./UIAction";
import localStorage from "../services/storage";
// Actions for models : starts
const startGetAllModels = () => {
  return {
    type: actionTypes.GET_ALL_MODEL_START,
  };
};

const successGetAllModels = (data) => {
  return {
    type: actionTypes.GET_ALL_MODEL_SUCCESS,
    payload: data,
  };
};
const errorGetAllModels = (error) => {
  return {
    type: actionTypes.GET_ALL_MODEL_ERROR,
    payload: error,
  };
};

export function getAllModels(data) {
  return (dispatch) => {

    console.log("getAllModels request data - ", data);
    dispatch(StartLoading());
    dispatch(startGetAllModels());
    return modelService.getAllModels(data)
      .then((data) => {
        console.log("getAllModels response data - ", data);
        dispatch(StopLoading());
        dispatch(successGetAllModels(data));
        return data;
      })
      .catch((err) => {
        dispatch(StopLoading());
        dispatch(errorGetAllModels(err));
      });
  };
}

// Actions for getAllModels : ends


// Actions for getSubscribed models : starts
const startgetSubscribedModels = () => {
  return {
    type: actionTypes.GET_PURCHASED_MODEL_START,
  };
};

const successgetSubscribedModels = (data) => {
  return {
    type: actionTypes.GET_PURCHASED_MODEL_SUCCESS,
    payload: data,
  };
};
const errorgetSubscribedModels = (error) => {
  return {
    type: actionTypes.GET_PURCHASED_MODEL_ERROR,
    payload: error,
  };
};

export function getSubscribedModels(data) {
  return (dispatch) => {

    console.log("getSubscribedModels request data - ", data);
    dispatch(StartLoading());
    dispatch(startgetSubscribedModels());
    return modelService.getSubscribedModels(data)
      .then((data) => {
        console.log("getSubscribedModels response data - ", data);
        dispatch(StopLoading());
        dispatch(successgetSubscribedModels(data));
        return data;
      })
      .catch((err) => {
        dispatch(StopLoading());
        dispatch(errorgetSubscribedModels(err));
      });
  };
}

// Actions for getAllModels : ends





// Actions for models : starts

const startPurchaseModels = () => {
  return {
    type: actionTypes.PURCHASE_MODEL_START,
  };
};

const successPurchaseModels = (data) => {
  return {
    type: actionTypes.PURCHASE_MODEL_SUCCESS,
    payload: data,
  };
};
const errorPurchaseModels = (error) => {
  return {
    type: actionTypes.PURCHASE_MODEL_ERROR,
    payload: error,
  };
};

export function purchaseModels(data) {
  return (dispatch) => {

    console.log("MODEL ACTION purchaseModels data - ", data);
    dispatch(StartLoading());
    dispatch(startPurchaseModels());
    console.log("MODEL ACTION purchaseModels data 2 - ", data);
    return modelService.purcahseModel(data)
      .then((data) => {
        console.log("purchaseModels response data - ", data);
        dispatch(StopLoading());
        dispatch(successPurchaseModels(data));
        return data;
      })
      .catch((err) => {
        dispatch(StopLoading());
        dispatch(errorPurchaseModels(err));
      });
  };
}

// Actions for getAllModels : ends
