import * as actionTypes from "../actions/actionTypes";

export const defaultState = {
  loading: false,
  signals: {},
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

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = states, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};
