import React, { Component } from "react";
import Home from "../components/Home";

export default function TradersLayout(WrappedComponent) {
  return class AdminComponent extends Component {
    render() {
      return (
        <>
          <Home>
            <WrappedComponent {...this.props} />
          </Home>
        </>
      );
    }
  };
}
