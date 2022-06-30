import { combineReducers } from "redux";

import authReducers from "./auth";
import jobReducers from "./job";
import performanceReducers from "./performance";
import modelReducers from "./model";
import contactReducers from "./contact";
import authentication from "./authentication";
import profile from "./profile";
import errorPopUp from "./errorPopUp";
import uiReducers from "./ui";



const Reducers = combineReducers({
  auth: authReducers,
  job: jobReducers,
  ui: uiReducers,
  authentication: authentication,
  profile: profile,
	performance:performanceReducers,
  model:modelReducers,
  contact:contactReducers,
  errorReducer: errorPopUp,
  
});

export default Reducers;
