import React, { Component } from "react";
import { connect } from "react-redux";
import Routes from "./routes";
import "./App.css";
import "./styles/index.scss";
import "./styles/styles/responsive.scss";
class App extends Component {
  render() {
    const childProps = {};
    return (
      <div className="App">
        <Routes childProps={childProps} />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  details: auth.data,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
