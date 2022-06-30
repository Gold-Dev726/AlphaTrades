import * as actionTypes from "./actionTypes";
import profileService from "../services/profileService";
import { customToast } from "./../helpers/customToast";
import {
  UNEXPECTED_ERROR_MESSAGE,
  UPDATE_PROFILE_MESSAGE,
} from "./../constants/commonMessages";
import _ from "lodash";
import authenticationService from "../services/authenticationService";
import storage from "../services/storage";
import sessionStorage from "../services/sessionStorage";

const fetchProfileDetailsStart = () => {
  return {
    type: actionTypes.FETCH_PROFILEDETAILS_START,
  };
};

const fetchProfileDetailsSuccess = (data) => {
  return {
    type: actionTypes.FETCH_PROFILEDETAILS_SUCCESS,
    payload: data,
  };
};

const fetchProfileDetailsError = (error) => {
  return {
    type: actionTypes.FETCH_PROFILEDETAILS_ERROR,
    payload: error,
  };
};

export const fetchProfileDetails = (history) => {
  return (dispatch) => {
    dispatch(fetchProfileDetailsStart());
    return profileService
      .fetchProfileDetails()
      .then((data) => {
        dispatch(fetchProfileDetailsSuccess(data));
        return data;
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          storage.clearAll();
          sessionStorage.clearAll();
          if (history) {
            history.push("/sign-in");
          } else {
            window.location = "/sign-in";
          }
        }
        dispatch(fetchProfileDetailsError(err));
        customToast.error(UNEXPECTED_ERROR_MESSAGE);
      });
  };
};

const updateProfileDetailsStart = () => {
  return {
    type: actionTypes.UPDATE_PROFILEDETAILS_START,
  };
};

const updateProfileDetailsSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_PROFILEDETAILS_SUCCESS,
    payload: data,
  };
};

const updateProfileDetailsError = (error) => {
  return {
    type: actionTypes.UPDATE_PROFILEDETAILS_ERROR,
    payload: error,
  };
};

export const updateProfileDetails = (data) => {
  return (dispatch) => {
    dispatch(updateProfileDetailsStart());
    return profileService
      .updateProfileDetails(data)
      .then((data) => {
        dispatch(updateProfileDetailsSuccess(data));
        customToast.success(UPDATE_PROFILE_MESSAGE);
        return data;
      })
      .catch((err) => {
        dispatch(updateProfileDetailsError(err));
        customToast.error(UNEXPECTED_ERROR_MESSAGE);
      });
  };
};
