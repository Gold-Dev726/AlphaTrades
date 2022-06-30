import * as actionTypes from "../actions/actionTypes";

export const defaultState = {
  loading: false,
  jobOrders: {},
  error: null,
};

const scheduleAppoinmentState = {
  scheduleAppoinmentStart: false,
  scheduleAppoinmentSuccess: null,
  scheduleAppoinmentError: null,
};

const autoSnapState = {
  autoSnapStart: false,
  autoSnapSuccess: {},
  autoSnapError: null,
};

const states = {
  ...defaultState,
  ...scheduleAppoinmentState,
  ...autoSnapState,
};

export default (state = states, action = {}) => {
  switch (action.type) {
    case actionTypes.JOB_ORDER_START:
      return {
        ...state,
        loading: true,
        jobOrders: {},
        error: null,
      };
    case actionTypes.JOB_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        jobOrders: action.payload,
        error: null,
      };
    case actionTypes.JOB_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        jobOrders: {},
        error: action.payload,
      };
    case actionTypes.SCHEDULE_APPOINMENT_START:
      return {
        ...state,
        scheduleAppoinmentStart: true,
        scheduleAppoinmentSuccess: null,
        scheduleAppoinmentError: null,
      };
    case actionTypes.SCHEDULE_APPOINMENT_SUCCESS:
      return {
        ...state,
        scheduleAppoinmentStart: false,
        scheduleAppoinmentSuccess: action.payload,
        scheduleAppoinmentError: null,
      };
    case actionTypes.SCHEDULE_APPOINMENT_ERROR:
      return {
        ...state,
        scheduleAppoinmentStart: false,
        scheduleAppoinmentSuccess: null,
        scheduleAppoinmentError: action.payload,
      };
    case actionTypes.AUTO_SNAP_START:
      return {
        ...state,
        autoSnapStart: true,
        autoSnapSuccess: {},
        autoSnapError: null,
      };
    case actionTypes.AUTO_SNAP_SUCCESS:
      return {
        ...state,
        autoSnapStart: false,
        autoSnapSuccess: action.payload,
        autoSnapError: null,
      };
    case actionTypes.AUTO_SNAP_ERROR:
      return {
        ...state,
        autoSnapStart: false,
        autoSnapSuccess: {},
        autoSnapError: action.payload,
      };
    default:
      return state;
  }
};
