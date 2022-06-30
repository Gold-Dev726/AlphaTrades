import * as actionTypes from "./actionTypes";
import authService from "../services/authService";

import { StartLoading, StopLoading } from "./UIAction";
import { customToast } from "../helpers/customToast";
import {
  PASSWORD_CHANGED_SUCCESS_MESSAGE,
  UNEXPECTED_ERROR_MESSAGE,
} from "../constants/commonMessages";
import sessionStorage from "../services/sessionStorage";

const startDetail = () => {
  return {
    type: actionTypes.DETAIL_START,
  };
};

const successDetail = (data) => {
  return {
    type: actionTypes.DETAIL_SUCCESS,
    payload: data,
  };
};
const detailError = (error) => {
  return {
    type: actionTypes.DETAIL_ERROR,
    payload: error,
  };
};

export function getDetail() {
  return (dispatch) => {
    dispatch(startDetail());
    authService
      .getDetail()
      .then((res) => {
        dispatch(successDetail(res));
      })
      .catch((err) => {
        dispatch(detailError(err));
      });
  };
}

const signout = (history) => {
  sessionStorage.clearAll();
  history.push("/sign-in");
};

export const changePassword = (formProps, history) => async (dispatch) => {
  dispatch(StartLoading());
  return authService
    .changePassword(formProps)
    .then((res) => {
      dispatch(StopLoading());
      customToast.success(PASSWORD_CHANGED_SUCCESS_MESSAGE);
      signout(history);
      return res;
    })
    .catch((e) => {
      dispatch(StopLoading());
      if (e.response) {
        customToast.error(e.response.data.message);
        throw e;
      }
      customToast.error(UNEXPECTED_ERROR_MESSAGE);
      throw e;
    });
};
