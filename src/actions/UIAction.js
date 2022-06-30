import * as actionTypes from "./actionTypes";

export const StartLoading = () => {
  return {
    type: actionTypes.UI_LOADER_START,
  };
};

export const StopLoading = () => {
  return {
    type: actionTypes.UI_LOADER_STOP,
  };
};

export const ToggleNavBar = () => {
  return {
    type: actionTypes.UI_NAV_TOGGLE,
  };
};

export const updateNavBar = () => (dispatch) => {
  return dispatch(ToggleNavBar());
};
