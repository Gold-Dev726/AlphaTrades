/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import { useSpeechSynthesis } from "react-speech-kit";
import _ from "lodash";
const Staking = (props) => {
  const dispatch = useDispatch();
  return (
    <section className="content-wapper staking">
      <div className="header-and-trading">
        <h1>Staking</h1>
      </div>

      <div className="common-panel panel-table-height">
        <div className="panel-body">
          <div className="stacking-section">
              <div className="comingsoon-message">Coming soon</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  console.log("Staking state we have ", state);
  return {

  };
};

export default connect(mapStateToProps, {
  
})(Staking);
