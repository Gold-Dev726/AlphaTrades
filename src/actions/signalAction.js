import * as actionTypes from "./actionTypes";
import signalService from "../services/signalService";
import { customToast } from "../helpers/customToast";
import { StartLoading, StopLoading } from "./UIAction";

// Actions for signals : starts
const startSignals = () => {
  return {
    type: actionTypes.JOB_ORDER_START,
  };
};

const successSignals = (data) => {
  return {
    type: actionTypes.JOB_ORDER_SUCCESS,
    payload: data,
  };
};
const errorSignals = (error) => {
  return {
    type: actionTypes.JOB_ORDER_ERROR,
    payload: error,
  };
};

export function getSignals(data) {
  return (dispatch) => {
    dispatch(StartLoading());
    dispatch(startSignals());
    return signalService
      .getSignals(data)
      .then((data) => {
        dispatch(StopLoading());
        dispatch(successSignals(data));
        return data;
      })
      .catch((err) => {
        dispatch(StopLoading());
        dispatch(errorSignals(err));
      });
  };
}

// Actions for signals : ends
