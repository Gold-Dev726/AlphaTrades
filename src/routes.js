import React, { Component } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import Signals from "./components/Signals";
import Models from "./components/Models";
import Contact from "./components/Contact";
import Dao from "./components/Dao";

import Alerts from "./components/Alerts";
import Performance from "./components/Performance";
import Stacking from "./components/Stacking";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as actionTypes from "./actions/actionTypes";
import AuthenticationService from "./services/authenticationService";
import ErrorPage from "./components/Authentication/error";
import TradersLayout from "./container/TradersLayout";
import MetaMaskAuth from "./components/Authentication/MetamaskAuth";


import { ROLE } from "./constants/appConstant";
// import useFetchProfile from "./Hooks/useFetchProfile";
import localStorage from "./services/storage";
import sessionStorage from "./services/sessionStorage";

export const PublicRoute = ({ component: Component, isAllowed = true, ...rest }) => {
  
  let userId = localStorage.get("userId");
  let walletId = localStorage.get("walletId");

  console.log("Routes userId - ", userId);
  console.log("Routes walletId - ", walletId);



  return <Route {...rest} render={(props) => <Component isAuthenticated={userId && walletId ? true : false} userId={walletId} walletId={walletId} {...props} />} />;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function Routes() {

  const userId = localStorage.get("userId");
  const walletId = localStorage.get("walletId");

  console.log("function Routes userId - ", userId);
  console.log("function Routes walletId - ", walletId);

  const dispatch = useDispatch();

  if (userId && walletId) {
    dispatch(
      {
        type: actionTypes.CONNECT_WALLET_SUCCESS,
        payload: { userId: userId, walletId: walletId },
      });
  }
  



  const authenticationLoading = useSelector(
    (state) => state.authentication.authLoading // make authLoading true whenever we are saving the user role
  );
  if (authenticationLoading) {
    // need to show loader when we are saving user role
    return (
      <div class="wrapper-loading">
        <div class="loader-spin"></div>
      </div>
    );
  }
  return (
    <div>
      <ToastContainer position="top-center" hideProgressBar={true} draggable={false} closeOnClick={false} autoClose={6000} />
      <Switch>
        {/* <Route path="/login" component={JobOrder} /> */}
        <Route path="/" auth={true}>
          <Switch>
            {/* <PublicRoute path="/sign-in" component={SignIn} title={"SignIn"} exact />
            <PublicRoute path="/forgot-password" component={ForgetPassword} title="Forgot Password" exact />
            <PublicRoute path="/reset-password/:userId" exact title="Reset Password" component={ResetPassword} /> */}

            
            <PublicRoute path="/" exact auth={true} component={TradersLayout(Signals)} />
            <PublicRoute path="/models" exact auth={true} component={TradersLayout(Models)} />
            <PublicRoute path="/staking" exact auth={true} component={TradersLayout(Stacking)} />
            <PublicRoute path="/dao" exact auth={true} component={TradersLayout(Dao)} />
            <PublicRoute path="/performance" exact auth={true} component={TradersLayout(Performance)} />
            <PublicRoute path="/alerts" exact auth={true} component={TradersLayout(Alerts)} />
            <PublicRoute path="/contact" exact auth={true} component={TradersLayout(Contact)} />
            <PublicRoute path="/unauthorized" exact component={ErrorPage} />
            <Route component={ErrorPage} />
          </Switch>
        </Route>
      </Switch>
    </div>
  );
}
