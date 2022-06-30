import * as actionTypes from "../actions/actionTypes";
import { ROLE } from "../constants/appConstant";

const profileState = {
  fetchProfileDetailsStart: true,
  fetchProfileDetailsSuccess: {
    userRole: ROLE.TECHNICIAN,
    userId: null,
  },
  fetchProfileDetailsError: null,
};

const updateProfileState = {
  updateProfileDetailsStart: false,
  updateProfileDetailsSuccess: null,
  updateProfileDetailsError: null,
};

const signoutState = {
  signoutStart: false,
};

const defaultStates = {
  ...profileState,
  ...updateProfileState,
  ...signoutState,
};

export default function profile(state = defaultStates, action = {}) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        fetchProfileDetailsSuccess: {
          ...state.fetchProfileDetailsSuccess,
          userRole: action.payload.userRole,
        },
      };
    case actionTypes.FETCH_PROFILEDETAILS_START:
      return {
        ...state,
        fetchProfileDetailsStart: true,
        fetchProfileDetailsSuccess: {
          ...state.fetchProfileDetailsSuccess,
        },
        fetchProfileDetailsError: null,
      };
    case actionTypes.FETCH_PROFILEDETAILS_SUCCESS:
      return {
        ...state,
        fetchProfileDetailsStart: false,
        fetchProfileDetailsSuccess: action.payload,
        fetchProfileDetailsError: null,
      };
    case actionTypes.FETCH_PROFILEDETAILS_ERROR:
      return {
        ...state,
        fetchProfileDetailsStart: false,
        // fetchProfileDetailsSuccess: null,
        fetchProfileDetailsError: action.payload,
      };
    case actionTypes.UPDATE_PROFILEDETAILS_START:
      return {
        ...state,
        updateProfileDetailsStart: true,
        updateProfileDetailsSuccess: null,
        updateProfileDetailsError: null,
      };
    case actionTypes.UPDATE_PROFILEDETAILS_SUCCESS:
      return {
        ...state,
        updateProfileDetailsStart: false,
        fetchProfileDetailsSuccess: action.payload,
        updateProfileDetailsError: null,
      };
    case actionTypes.UPDATE_PROFILEDETAILS_ERROR:
      return {
        ...state,
        updateProfileDetailsStart: false,
        updateProfileDetailsSuccess: null,
        updateProfileDetailsError: action.payload,
      };
    case actionTypes.SIGN_OUT_START:
      return {
        ...state,
        signoutStart: true,
      };
    case actionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        signoutStart: false,
        fetchProfileDetailsSuccess: null,
      };
    case actionTypes.SIGN_OUT_ERROR:
      return {
        ...state,
        signoutStart: false,
      };
    default:
      return state;
  }
}
