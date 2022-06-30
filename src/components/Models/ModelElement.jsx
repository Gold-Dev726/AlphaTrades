import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import classnames from "classnames";
import btcIcon from "../../images/currency/btc.svg";
import timerIcon from "../../images/timer-icon.svg";

const ModelElement = (props) => {
  console.log("props.d we are getting  - ", props.item);
  const item = props.item;

  return (
    <div key={item.id} className={classnames("model-element")}>
      <div className="model-statistics">
        <div className="model-name">{item.name}</div>
        <div className="model-score">
          <div className="model-title">Model score</div>
          <div className="model-val">{item.score}</div>
        </div>
        <div className="model-interval">
          <div className="model-title">Interval</div>
          <div className="model-val">{item.interval}</div>
        </div>
        <div className="model-pair">
          <div className="model-title">Pair</div>
          <div className="model-val">
            <div className="crypto-icon">
              <img src={btcIcon} alt="crypto-logo" className="crypto-logo" />
            </div>
            <div className="crypto-name">{item.pair}</div>
          </div>
        </div>
      </div>
      <div className="model-information">
        <div className="paragraph">{item.description}</div>
        <div className="separator"></div>
        <div className="info-stats">
          <div className="wolf-text">{`${item.price} ${item.currencySymbol}`}</div>
          <div className="wolf-price">{`(~${item.validityInDays})`}</div>
        </div>
        <div className="subscribe">
          <div
            className="subscribe-button"
            style={{ color: item.isUserSubscribed ? "gray" : "#FFFFFF" }}
            onClick={() => {
              console.log("clicked 1");
              if (!item.isUserSubscribed) {
                console.log("clicked 2");
                props.onSubscribeClick(item);
              }
            }}
          >
           {props.isAuthenticated?(item.isUserSubscribed?"Subscribed":"Subscribe"):"Connect"} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelElement;
