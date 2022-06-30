import * as actionTypes from "./actionTypes";
import performanceService from "../services/performanceService";
import contactService from "../services/contactService";
import { customToast } from "../helpers/customToast";
import { StartLoading, StopLoading } from "./UIAction";
import {
  SUBMIT_CONTACT_SUCCESS_MESSAGE
} from "../constants/commonMessages";

// Actions for signals : starts
const startSubmitContact = () => {
  return {
    type: actionTypes.CONTACT_SUBMIT_START,
  };
};

const successSubmitContact = (data) => {
  return {
    type: actionTypes.CONTACT_SUBMIT_SUCCESS,
    payload: data,
  };
};
const errorSubmitContact = (error) => {
  return {
    type: actionTypes.CONTACT_SUBMIT_ERROR,
    payload: error,
  };
};

export function submitContact(data) {
  return (dispatch) => {
    dispatch(StartLoading());
    dispatch(startSubmitContact());
    return contactService
      .postContact(data)
      .then((data) => {

				console.log("submitContact data - ",data);
        customToast.success(SUBMIT_CONTACT_SUCCESS_MESSAGE);
        dispatch(StopLoading());
        dispatch(successSubmitContact(data));
        return data;
      })
      .catch((err) => {
        dispatch(StopLoading());
        dispatch(errorSubmitContact(err));
      });
  };
}

// Actions for signals : ends
