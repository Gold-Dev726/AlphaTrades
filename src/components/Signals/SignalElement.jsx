import React from "react";
import Slider from '@mui/material/Slider';
import classnames from "classnames";
import timerIcon from "../../images/timer-icon.svg";





const SignalElement = (props) => {



  // console.log("signal element - keyElement we are getting  - ", props.keyElement);

  let marks = [];

  let mark = {
    value: 0,
    label: '',
  };

  marks.push(mark);

  // let valueInPer = 0;
  // if (props.keyElement.predict > 0) {
  //   valueInPer = parseFloat((props.keyElement.predict * 100) / props.keyElement.comment_predict_buy_max_range).toFixed(2);
  // } else {
    
  //   valueInPer = parseFloat((props.keyElement.predict * 100) / props.keyElement.comment_predict_sell_max_range).toFixed(2);
  // }

  let valueInPer = props.keyElement.probability;
  if(valueInPer >= 100){
    valueInPer = 95;
  }
  // valueInPer = 99;
  // console.log("valueInPer - ",valueInPer);

  

  mark = {
    value: valueInPer,
    label: `${valueInPer}%`,
  };
  marks.push(mark);

  mark = {
    value: 100,
    label: '',
  };

  marks.push(mark);

  function valuetext(value) {
    return `${value}`;
  }
  

  return (
    <div
      key={props.keyElement.is_new_signal ? Math.random() : props.currentItem}
      className={classnames("signal-element", {
        "fade-in-signal": props.keyElement.is_new_signal === true,
      })}
      onClick={() => {
        props.onClick(props.keyElement.pair_name, props.keyElement.interval);
      }}
      style={{ display: props.keyElement.is_visible === false ? 'none' : 'flex' }}

    >
      <div className="token-information">
        <div className="token-logo">
          <div className="l
          ogo-details">
            <img src={`/images/currency/${props.keyElement.pair_name}.svg`} alt="crypto-logo" className="crypto-logo" />

            <div className="crypto-name-and-update">
              <div className="crypto-name">{props.keyElement.pair_name}</div>
              <div className="crypto-update">
                <img src={timerIcon} alt="timer-logo" className="timer-logo" />
                <div className="crypto-update-time">Just now</div>
              </div>
            </div>
          </div>
          <div className="model-details">
            <div

              className={classnames("model-tier", {
                "gold": props.keyElement.rank === "GOLD",
                "silver": props.keyElement.rank === "Silver",
                "bronze": props.keyElement.rank === "Free",
              })}
            >{props.keyElement.rank}</div>
          </div>
        </div>

        <div className="token-buy-sell">
          <div className="buy-or-sell">
            <div

              className={classnames("buy-sell", {
                "buy": props.keyElement.signal === "buy",
                "sell": props.keyElement.signal === "sell",
              })}

            >

              {props.keyElement.signal === "buy" ? "Buy" : "Sell"}



            </div>
          </div>
          <div className="interval">
            <div className="interval-text">Interval</div>
            <div className="interval-time">{props.keyElement.interval}</div>
          </div>
          <div className="profit-potential">
            <div className="profit-potential-text">Profit potential</div>

            <div className="profit-potential-val">${props.keyElement.profit_potential} | %{props.keyElement.profit_potential_per}</div>
          </div>
        </div>
        <div className="token-expire">
          <img src={timerIcon} alt="timer-logo" className="timer-logo" />
          <div className="expirein-lbl-time">
            <div className="expirein-text">EXPIRING IN:</div>
            <div className="expirein-val">{props.keyElement.expire_in}</div>
          </div>
        </div>
      </div>
      <div className="token-pricing-information">
        <div className="pricing-info">
          <div className="pricing-info-text">Buy price</div>
          <div className="pricing-info-val">{props.keyElement.buy_price}</div>
        </div>

        <div className="pricing-info">
          <div className="pricing-info-text">Stop loss</div>
          <div className="pricing-info-val">{props.keyElement.stop_loss_price}</div>
        </div>

        <div className="pricing-info">
          <div className="pricing-info-text">Stop loss %</div>
          <div className="pricing-info-val">{props.keyElement.stop_loss_per}</div>
        </div>

        <div className="pricing-info">
          <div className="pricing-info-text">Exit price</div>
          <div className="pricing-info-val">{props.keyElement.target_price}</div>
        </div>

        <div className="pricing-info">
          <div className="pricing-info-text">Target %</div>
          <div className="pricing-info-val">{props.keyElement.stop_loss_per}</div>
        </div>

        <div className="pricing-info">
          <div className="pricing-info-text">Qty</div>
          <div className="pricing-info-val">{props.keyElement.quantity}</div>
        </div>
      </div>
      <div className="token-prob-and-score">

        <div className="token-name">
          <div className="prob-and-score-text token-probability-text"></div>
          <div className="prob-and-score-val token-probability-val">{props.keyElement.regression_model_name}</div>
        </div>


        <div className="probability-and-score">

          <div className="token-probability">
            <div className="prob-and-score-text token-probability-text">probability</div>
            <div className="prob-and-score-val token-probability-val">{parseFloat(props.keyElement.predict * 100).toFixed(2)}%</div>
          </div>

          <div className="token-score">
            <div className="prob-and-score-text token-score-text">score</div>
            <div className="prob-and-score-val token-score-val">{props.keyElement.model_score}%</div>
          </div>


        </div>

        <div className="slider-element">
          <Slider

            defaultValue={valueInPer}
            getAriaValueText={valuetext}
            step={null}
            marks={marks}
            valueLabelDisplay="off"
            disableSwap={true}
            disabled={true}
            value={valueInPer}
          />
        </div>



      </div>
    </div>
  );
};

export default SignalElement;
