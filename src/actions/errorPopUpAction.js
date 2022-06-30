import * as actionTypes from "./actionTypes";

export const StartErrorModal = (payload) => {
  return {
    type: actionTypes.ERROR_POPUP_START,
    payload,
  };
};

export const StopErrorModal = () => {
  return {
    type: actionTypes.ERROR_POPUP_STOP,
  };
};
