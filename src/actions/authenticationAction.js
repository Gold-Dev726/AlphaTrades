import * as actionTypes from "./actionTypes";
import authenticationService from "./../services/authenticationService";
import { customToast } from "./../helpers/customToast";
import { UNEXPECTED_ERROR_MESSAGE, FORGET_PASSWORD_SUCCESS_MESSAGE, RESET_PASSWORD_SUCCESS_MESSAGE } from "./../constants/commonMessages";
import localStorage from "./../services/storage";
import sessionStorage from "./../services/sessionStorage";
import { StartLoading, StopLoading } from "./UIAction";

const connectWalletStart = () => {
  return {
    type: actionTypes.CONNECT_WALLET_START,
  };
};

const connectWalletSuccess = (data) => {
  return {
    type: actionTypes.CONNECT_WALLET_SUCCESS,
    payload: data,
  };
};

const connectWalletError = (error) => {
  return {
    type: actionTypes.CONNECT_WALLET_ERROR,
    payload: error,
  };
};

export const connectWallet = (walletId) => {

  console.log("connectWallet- ",walletId);

  return (dispatch) => {
    dispatch(StartLoading());
    dispatch(connectWalletStart());
    return authenticationService
      .connectWallet({walletId:walletId})
      .then(async (data) => {
        localStorage.set("userId", data.userId);
        localStorage.set("walletId", data.walletId);
        dispatch(StopLoading());
        dispatch(connectWalletSuccess(data));
        return data;
      })
      .catch((err) => {
        dispatch(StopLoading());
        dispatch(connectWalletError(err));
        customToast.error("XXXX");
      });
  };
};
