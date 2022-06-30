import * as actionTypes from "./actionTypes";
import performanceService from "../services/performanceService";
import { customToast } from "../helpers/customToast";
import { StartLoading, StopLoading } from "./UIAction";

// Actions for signals : starts
const startPerformance = () => {
  return {
    type: actionTypes.PERFORMANCE_START,
  };
};

const successPerformance = (data) => {
  return {
    type: actionTypes.PERFORMANCE_SUCCESS,
    payload: data,
  };
};
const errorPerformance = (error) => {
  return {
    type: actionTypes.PERFORMANCE_ERROR,
    payload: error,
  };
};

export function getPerformance(data) {
  return (dispatch) => {
    dispatch(StartLoading());
    dispatch(startPerformance());
    return performanceService
      .getPerformance(data)
      .then((data) => {

				console.log("getPerformance data - ",data);

        dispatch(StopLoading());
        dispatch(successPerformance(data));
        return data;
      })
      .catch((err) => {
        dispatch(StopLoading());
        dispatch(errorPerformance(err));
      });
  };
}

// Actions for signals : ends
