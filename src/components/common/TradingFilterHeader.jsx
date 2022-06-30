import React from "react";
import classnames from "classnames";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import btcIcon from "../../images/currency/btc.svg";
import timerIcon from "../../images/timer-icon.svg";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      color: "blue",
    },
  },
};

const TradingFilterHeader = (props) => {
  // console.log("props.alertSounds - ", props);

  return (
    <div className="trading-operations">
      <div className="show-all-buy-sell">
        <div className="show">Show:</div>

        <div className="all">
          <Radio
            className={classnames("buy-sell-radio", {
              active: props.buySellFilter === "All",
            })}
            checked={props.buySellFilter === "All" ? true : false}
            value="All"
            name="radio-buttons"
            inputProps={{ "aria-label": "All" }}
            onClick={(event) => {
              const {
                target: { value },
              } = event;
              props.setBuySellFilter(value);
            }}
          />
          <span className="title">All</span>
        </div>
        <div className="buy-radio">
          <Radio
            className={classnames("buy-sell-radio", {
              active: props.buySellFilter === "buy",
            })}
            checked={props.buySellFilter === "buy" ? true : false}
            value="buy"
            name="radio-buttons"
            inputProps={{ "aria-label": "Buy" }}
            onClick={(event) => {
              const {
                target: { value },
              } = event;

              console.log("radio value  -", value);

              props.setBuySellFilter(value);
            }}
          />

          <span className="title">Buy</span>
        </div>
        <div className="sell-radio">
          <Radio
            className={classnames("buy-sell-radio", {
              active: props.buySellFilter === "sell",
            })}
            checked={props.buySellFilter === "sell" ? true : false}
            value="sell"
            name="radio-buttons"
            inputProps={{ "aria-label": "Sell" }}
            onClick={(event) => {
              const {
                target: { value },
              } = event;

              console.log("radio value  -", value);

              props.setBuySellFilter(value);
            }}
          />

          <span className="title">Sell</span>
        </div>
      </div>

      <div className="trading-operations-separator"></div>

      <div className="selectbox currency-select">
        <span className="title">Currency:</span>

        <Select
          className="selectbox"
          IconComponent={""}
          multiple
          displayEmpty
          value={props.selectedCurrency ? props.selectedCurrency : []}
          onChange={(event) => {
            const {
              target: { value },
            } = event;

            console.log("handleSwitchChange  -", value);

            props.setSelectedCurrency(
              // On autofill we get a stringified value.
              typeof value === "string" ? value.split(",") : value
            );
          }}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected) {
              if (selected.length === 0) {
                return <span>Currency</span>;
              }
              return selected.join(", ");
            }
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
          style={{ width: "100%" }}
        >
          <MenuItem disabled value="">
            <span>Currency</span>
          </MenuItem>

          {props.currency ? (
            props.currency.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))
          ) : (
            <>Y</>
          )}
        </Select>
      </div>

      <div className="trading-operations-separator"></div>

      <div className="selectbox interval-select">
        <span className="title">Interval:</span>

        <Select
          className="selectbox"
          IconComponent={""}
          multiple
          displayEmpty
          value={props.selectedInterval ? props.selectedInterval : []}
          onChange={(event) => {
            const {
              target: { value },
            } = event;

            console.log("Interval  -", value);

            props.setSelectedInterval(
              // On autofill we get a stringified value.
              typeof value === "string" ? value.split(",") : value
            );
          }}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected) {
              if (selected.length === 0) {
                return <span>All</span>;
              }
              return selected.join(", ");
            }
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
          style={{ width: "100%" }}
        >
          <MenuItem disabled value="">
            <span>All</span>
          </MenuItem>

          {props.interval ? (
            props.interval.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))
          ) : (
            <>-</>
          )}
        </Select>
      </div>

      <div className="trading-operations-separator"></div>

      <div className="selectbox signals-select">
        <span className="title">Probability:</span>

        <Select
          className="selectbox"
          IconComponent={""}
          displayEmpty
          value={props.selectedProbability ? props.selectedProbability : null}
          onChange={(event) => {
            const {
              target: { value },
            } = event;

            console.log("Probability  -", value);

            props.setSelectedProbabilit(value);
          }}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            //console.log("probability rendered -> ", selected);
            if (!selected || selected.length === 0) {
              return <span>All</span>;
            }
            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
          style={{ width: "100%" }}
        >
          <MenuItem value="">
            <span>All</span>
          </MenuItem>

          {props.probability ? (
            props.probability.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))
          ) : (
            <></>
          )}
        </Select>
      </div>

      <div className="trading-operations-separator"></div>

      <div className="selectbox alert-signals-select">
        <span className="title">Alert sound:</span>

        <Select
          className="selectbox"
          IconComponent={""}
          displayEmpty
          value={props.selectedAlertSound ? props.selectedAlertSound : null}
          onChange={(event) => {
            const {
              target: { value },
            } = event;

            console.log("Alert sound  -", value);

            props.setSelectedAlertSound(value);
          }}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (!selected || selected.trim().length === 0) {
              return <span>Default</span>;
            }
            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
          style={{ width: "100%" }}
        >
          <MenuItem value="">
            <span>Default</span>
          </MenuItem>

          {props.alertSounds ? (
            props.alertSounds.map((voice) => (
              <MenuItem key={voice.name} value={voice.name}>
                {voice.name + " (" + voice.lang + ")"}
              </MenuItem>
            ))
          ) : (
            <></>
          )}
        </Select>
      </div>
    </div>
  );
};

export default TradingFilterHeader;
