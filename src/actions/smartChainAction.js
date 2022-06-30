import * as actionTypes from "./actionTypes";
import smartChainService from "../services/smartChainService";
import { customToast } from "../helpers/customToast";
import { StartLoading, StopLoading } from "./UIAction";
import {
  SUBMIT_CONTACT_SUCCESS_MESSAGE
} from "../constants/commonMessages";

// Actions for signals : starts
const startGetContactBalance = () => {
  return {
    type: actionTypes.GET_BALANCE_START,
  };
};

const successGetContactBalance = (data) => {
  return {
    type: actionTypes.GET_BALANCE_SUCCESS,
    payload: data,
  };
};
const errorGetContactBalance = (error) => {
  return {
    type: actionTypes.GET_BALANCE_ERROR,
    payload: error,
  };
};

export function getContactBalance(data) {
  return (dispatch) => {
    dispatch(StartLoading());
    dispatch(startGetContactBalance());
    return smartChainService
      .getContactBalance(data)
      .then((data) => {

				console.log("getContactBalance return data - ",data);
        //customToast.success(SUBMIT_CONTACT_SUCCESS_MESSAGE);
        dispatch(StopLoading());
        dispatch(successGetContactBalance(data));
        return data;
      })
      .catch((err) => {
        dispatch(StopLoading());
        dispatch(errorGetContactBalance(err));
      });
  };
}

// Actions for signals : ends
