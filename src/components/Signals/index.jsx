/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback, useReducer } from "react";
import useWebSocket from "react-use-websocket";
import { connect, useDispatch } from "react-redux";
import { useSpeechSynthesis } from "react-speech-kit";
import _ from "lodash";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { useTranslation } from "react-i18next";
import { getSignals } from "../../actions/signalAction";
import { getSubscribedModels } from "../../actions/modelAction";

import * as actionTypes from "../../actions/actionTypes";
import SignalElement from "./SignalElement";
import TradingHeader from "../common/TradingHeader";
import TradingFilterHeader from "../common/TradingFilterHeader";

import { getLocalToUTCDateTime, getCurrentUTCDateTime, getDateDifferenceBetweenTwoDates } from "../../helpers";

const signal = {};
let signalArraySorted = [];
//const SOCKET_URL_ONE = "ws://172.104.180.69:8765";
//const SOCKET_URL_ONE = "ws://74.207.243.93:8765";
const SOCKET_URL_ONE = "wss://app.alphatrades.co/websocket/";

const utter = new SpeechSynthesisUtterance();
utter.lang = "en-US";

utter.volume = 1;
utter.pitch = 1;
let is_speaking = false;

const currency = ["ADAUSDT", "ETHUSDT", "BTCUSDT"];
const interval = ["1m", "5m", "10m", "15m"];
const probability = ["> 10%", "> 20%", "> 30%", "> 40%", "> 50%", "> 60%", "> 70%", "> 80%", "> 90%"];
let commentArraySellGold = [];
let commentObjectArraySellGold = [];
let thresholdSellGold = 0;
let maxRangeSell = 0;

let commentArrayBuyGold = [];
let commentObjectArrayBuyGold = [];
let thresholdBuyGold = 0;
let maxRangeBuy = 0;

const regex = /[>%\s]/gim;
let voices = [];
//const Signals = React.memo(props => {
const Signals = (props) => {
  // console.log("Signals props -", props);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  if (!props.isAuthenticated && props.userId && props.walletId) {
    dispatch({
      type: actionTypes.CONNECT_WALLET_SUCCESS,
      payload: { userId: props.userId, walletId: props.walletId },
    });
  }

  const [subscribedSignals, setSubscribedSignals] = useState([]);

  const [selectedCurrency, setSelectedCurrency] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState([]);
  const [selectedProbability, setSelectedProbabilit] = useState([]);
  const [alertSounds, setAlertSounds] = useState([]);
  const [selectedAlertSound, setSelectedAlertSound] = useState("");
  const [buySellFilter, setBuySellFilter] = useState("All");

  const [confirmationModal, setConfirmationModal] = useState(false);
  const [signalList, setSignalList] = useState([]);
  const [searchInpValue, setSearchInpValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [cryptoSymbol, setCryptoSymbol] = useState("BTCUSDT");
  const [chartInterval, setChartInterval] = useState("15");

  const [capitalTrade, setCapitalTrade] = useState(5000);
  const [leverage, setLeverage] = useState(5);
  const [capitalTradeEditable, setCapitalTradeEditable] = useState(false);
  const [leverageEditable, setLeverageEditable] = useState(false);
  const [currentSocketUrl, setCurrentSocketUrl] = useState(SOCKET_URL_ONE);

  const [isSubscriptionFetched, setIsSubscriptionFetched] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(currentSocketUrl, {
    share: true,
    shouldReconnect: () => false,
    filter: (message) => {
      //console.log("filter: signal   - ", message);
      // console.log("filter: subscribedSignals   - ", subscribedSignals);

      message = JSON.parse(message.data);

      // console.log("filter: signal   - ", message);
      message.is_new_signal = false;
      if (props.isAuthenticated) {
        //console.log("checking new signal...");
        if (signal[message.pair_name] == null) {
          message.is_new_signal = true;
        } else {
          const currentSignal = signal[message.pair_name];
          if (currentSignal.open_time !== message.open_time) {
            message.is_new_signal = true;
          }
        }
      } else {
        //console.log("user is not loggedin...");
      }

      if (message.predict > 0) {
        message.probability = parseFloat((message.predict * 100) / message.comment_predict_buy_max_range).toFixed(2);
      } else {
        message.probability = parseFloat((message.predict * 100) / message.comment_predict_sell_max_range).toFixed(2);
      }


      message.buy_price = message.close;
      message.buying_power = parseFloat(capitalTrade * leverage).toFixed(2);
      message.quantity = parseFloat(message.buying_power / message.buy_price).toFixed(2);
      message.stop_loss_per = 0.2;
      message.target = 0.2;
      message.stop_loss_price = parseFloat(message.buy_price - (0.2 * message.buy_price) / 100).toFixed(2);
      message.target_price = parseFloat(message.buy_price + (0.2 * message.buy_price) / 100).toFixed(2);
      message.profit_potential = parseFloat((0.2 * message.buying_power) / 100).toFixed(2);
      message.profit_potential_per = parseFloat((message.profit_potential / message.buying_power) * 100).toFixed(2);

      signal[message.pair_name] = message;

      const signalArray = _.values(signal);
      signalArraySorted = signalArray.filter((obj) => {


        obj.is_visible = true;


        commentArraySellGold = [];
        commentObjectArraySellGold = [];
        thresholdSellGold = 0;
        maxRangeSell = 0;

        commentArrayBuyGold = [];
        commentObjectArrayBuyGold = [];
        thresholdBuyGold = 0;
        maxRangeBuy = 0;

        if (selectedCurrency.length > 0) {
          if (selectedCurrency.includes(obj.pair_name)) {
            obj.is_visible = true;
          } else {
            obj.is_visible = false;
            obj.is_new_signal = false;
            return false;
          }
        }

        if (selectedInterval.length > 0) {
          if (selectedInterval.includes(obj.interval)) {
            obj.is_visible = true;
          } else {
            obj.is_visible = false;
            obj.is_new_signal = false;
            return false;
          }
        }

        if (props.subscribedMoels.includes(obj.regression_model_name)) {
          obj.is_visible = true;
        } else {
          obj.is_visible = false;
          obj.is_new_signal = false;
          return false;
        }

        // SellGold
        if (commentArraySellGold.length === 0) {
          commentArraySellGold = obj.comment_sell_gold.split(",");

          commentArraySellGold.forEach((element) => {
            let objectItem = {};

            let elementItemArray = element.split("=");

            // console.log("elementItemArray - ",elementItemArray);

            elementItemArray.forEach((elementItem) => {
              //console.log("sell elementItem - ", elementItem);

              objectItem[elementItemArray[0]] = elementItemArray[1];
              if (elementItemArray[0] === "threshold") {
                thresholdSellGold = elementItemArray[1];
              } else if (elementItemArray[0] === "max_range") {
                maxRangeSell = elementItemArray[1];
              }
            });

            commentObjectArraySellGold.push(objectItem);
          });
        }

        //console.log("commentObjectArraySellGold - ", commentObjectArraySellGold);
        let queryFindCombinationFromSellGold = _.find(commentObjectArraySellGold, { combination: obj.combination });

        // console.log("queryFindCombinationFromSellGold - ", queryFindCombinationFromSellGold);
        // console.log("thresholdSellGold - ",thresholdSellGold);
        // console.log("maxRangeSell - ",maxRangeSell);

        //Buygold

        if (commentArrayBuyGold.length === 0) {
          commentArrayBuyGold = obj.comment_buy_gold.split(",");

          commentArrayBuyGold.forEach((element) => {
            let objectItem = {};

            let elementItemArray = element.split("=");

            // console.log("elementItemArray - ",elementItemArray);

            elementItemArray.forEach((elementItem) => {
              // console.log("elementItem - ",elementItem);

              objectItem[elementItemArray[0]] = elementItemArray[1];
              if (elementItemArray[0] === "threshold") {
                thresholdBuyGold = elementItemArray[1];
              } else if (elementItemArray[0] === "max_range") {
                maxRangeBuy = elementItemArray[1];
              }
            });

            commentObjectArrayBuyGold.push(objectItem);
          });
        }

        //console.log("commentObjectArrayBuyGold - ", commentObjectArrayBuyGold);
        //let queryFindCombinationFromBuyGold = _.find(commentObjectArrayBuyGold, { combination: "101" });
        let queryFindCombinationFromBuyGold = _.find(commentObjectArrayBuyGold, { combination: obj.combination });


        // console.log("queryFindCombinationFromBuyGold - ", queryFindCombinationFromBuyGold);
        // console.log("thresholdBuyGold - ",thresholdBuyGold);
        // console.log("maxRangeBuy - ",maxRangeBuy);

        //sell gold check....
        if (queryFindCombinationFromSellGold) {

          console.log("we got combination for sell ..",obj.regression_model_name);

          // console.log("queryFindCombinationFromSellGold - ", queryFindCombinationFromSellGold);
          
          // console.log("obj.predict - ", obj.predict);
          // console.log("thresholdSellGold - ", thresholdSellGold);
          // console.log("maxRangeSell - ", maxRangeSell);

          if (obj.predict <= thresholdSellGold) {
            obj.rank = "GOLD";
          }
        }

        //buy gold check....
        if (queryFindCombinationFromBuyGold) {

          // console.log("we got combination for buy ..");
          // console.log("queryFindCombinationFromBuyGold - ", queryFindCombinationFromBuyGold);
          // console.log("thresholdBuyGold - ", thresholdBuyGold);
          // console.log("maxRangeBuy - ", maxRangeBuy);

          if (obj.predict >= thresholdBuyGold) {
            console.log("we get group..");
            obj.rank = "GOLD";
          }
        }

        obj.model_score = "74";

        if (obj.predict >= obj.comment_predict_buy_thresh) {
          obj.signal = "buy";
        } else {
          obj.signal = "sell";
        }

        // console.log("obj.probability - ",obj.probability);

        if (selectedProbability && selectedProbability.length > 0) {
          const probability = selectedProbability.replace(regex, "");
          // console.log("probability selected - ",probability);

          if (obj.probability < probability) {
            obj.is_visible = false;
            obj.is_new_signal = false;
            return false;
          }
        }

        //console.log("buySellFilter - ", buySellFilter);
        if (buySellFilter != "All") {
          if (obj.signal !== buySellFilter) {
            obj.is_visible = false;
            obj.is_new_signal = false;
            return false;
          }
        }

        if (obj.is_new_signal === true && is_speaking === false) {
          is_speaking = true;
          utter.text = `${message.pair_name}, ${message.interval} , a new trading signal has arrived.`;

          utter.name = selectedAlertSound.trim().length > 0 ? selectedAlertSound : "Google US English";

          for (let i = 0; i < voices.length; i++) {
            if (voices[i].name === selectedAlertSound) {
              utter.voice = voices[i];
            }
          }

          window.speechSynthesis.speak(utter);
        }

        return obj;
      });
      // console.log("signalArraySorted at message - ", signalArraySorted);
    },
  });

  utter.onend = function () {
    //alert("Speech has finished");
    is_speaking = false;
    //console.log("Speech has finished");
  };

  //console.log("isSubscriptionFetched - ", isSubscriptionFetched);
  if (!isSubscriptionFetched && props.isAuthenticated && props.userId && !isFetching) {
    //console.log("fetching subscriptions - ",props.userId);
    setIsFetching(true);

    //const getSubscribedModelsResult = await props.getSubscribedModels({ userId: props.userId }).then();

    props.getSubscribedModels({ userId: props.userId }).then((res) => {
      console.log("getSubscribedModelsResult model res  - ", res);
      setIsSubscriptionFetched(true);
      setIsFetching(false);
      setSubscribedSignals(res.purchasedModels);
    });

    _.debounce(function () {
      console.log("_debouce");
    }, 1000);
  }

  // Search Start

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const debounceSearchFn = useCallback(
    _.debounce((value) => handleSearchChange(value), 500),
    []
  );

  const debouncedSearchChange = (event) => {
    const {
      target: { value },
    } = event;
    setSearchInpValue(value);

    debounceSearchFn(value.trim());
  };

  const handleSelectCrypto = (cryptoSymbol, interval) => {
    console.log("crypto symbol - ", cryptoSymbol);
    setCryptoSymbol(cryptoSymbol);
    const intervalMins = interval.replace("m", "");
    setChartInterval(intervalMins);
  };

  const allVoicesObtained = new Promise(function (resolve, reject) {
    let voices = window.speechSynthesis.getVoices();
    if (voices.length !== 0) {
      resolve(voices);
    } else {
      window.speechSynthesis.addEventListener("voiceschanged", function () {
        voices = window.speechSynthesis.getVoices();
        resolve(voices);
      });
    }
  });

  // setAlertSounds(voices);

  useEffect(() => {
    console.log("test...");
    allVoicesObtained.then((voices) => {
      console.log("All voices:", voices);
      setAlertSounds(voices);
    });
  }, []);

  useEffect(() => {
    console.log("useEffect for subscribedSignals - ", subscribedSignals);
  }, [subscribedSignals]);

  useEffect(() => {
    const interval = setInterval(() => {
      //console.log("interval signalArraySorted - ",signalArraySorted);

      let signalArrayTimeCalculation = signalArraySorted.filter((obj) => {
        let currentUTCTime = getCurrentUTCDateTime();
        // console.log('currentUTCTime ', currentUTCTime);

        const signalEndTime = obj.close_time.split(".")[0];
        //console.log("signalEndTime - ", signalEndTime);
        const timeDiff = getDateDifferenceBetweenTwoDates(signalEndTime, currentUTCTime, "YYYY-MM-DD HH:mm:ss", "seconds");
        obj.time_diff = timeDiff;
        // console.log("time_diff - ", timeDiff);

        if (timeDiff > 0) {
          const minutes = Math.floor(timeDiff / 60);
          const seconds = timeDiff - minutes * 60;
          const expire_in = `${minutes}M ${seconds}S`;
          obj.expire_in = expire_in;

          if (timeDiff < 45) {
            obj.is_new_signal = false;
          }

          // console.log("each second -----------START------------ ");
          // console.log("each second expire_in - ", expire_in);
          // console.log("each second obj - ", obj);
          // console.log("each second ------------END----------- ");
        } else {
          obj.expire_in = "EXPIRED";
          obj.is_new_signal = false;
        }

        return obj;
      });

      signalArrayTimeCalculation = _.orderBy(signalArrayTimeCalculation, ["time_diff"], ["asc"]);
      //console.log("interval signalArrayTimeCalculation - ",signalArrayTimeCalculation);
      // console.log("each second signalArrayTimeCalculation - ", signalArrayTimeCalculation);
      setSignalList(signalArrayTimeCalculation);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  let middleSection = <></>;

  if (!props.isAuthenticated) {
    middleSection = <div className="disconnected-message">Please connect your wallet to authenticate</div>;
  } else {
    // console.log("authenticated...");
    //if (isSubscriptionFetched && subscribedSignals.length == 0) {
    if (isSubscriptionFetched && props.subscribedMoels.length == 0) {
      middleSection = <div className="disconnected-message">You have not subscribed to any prediction model, subscribe now to get real-time signals.</div>;
    } else if (isSubscriptionFetched && props.subscribedMoels.length > 0 && signalList.length == 0) {
      middleSection = <div className="disconnected-message">Signal would show up here* when available</div>;
    } else {
      middleSection = (
        <div className="panel-body">
          <div className="signal-listing">
            {signalList.map((item, id) => (
              <SignalElement onClick={handleSelectCrypto} keyElement={item} currentItem={id} totalItes={signalList.length} />
            ))}
          </div>
          <div className="trading-view-widget">
            <TradingViewWidget symbol={cryptoSymbol} width="100%" height="400px" theme="dark" interval={chartInterval} timezone="Etc/UTC" style="1" locale="en" toolbar_bg="#f1f3f6" enable_publishing={false} hide_top_toolbar={true} save_image={false} container_id="tradingview_44c44" />
          </div>
        </div>
      );
    }
  }

  // Search End

  return (
    <section className="content-wapper signals">
      <div className="header-and-trading">
        <h1>Signals</h1>

        <TradingHeader setCapitalTrade={setCapitalTrade} setLeverage={setLeverage} capitalTrade={capitalTrade} capitalTradeEditable={capitalTradeEditable} setCapitalTradeEditable={setCapitalTradeEditable} leverage={leverage} leverageEditable={leverageEditable} setLeverageEditable={setLeverageEditable} screenName={"signal"} />
      </div>

      <TradingFilterHeader currency={currency} interval={interval} probability={probability} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} selectedInterval={selectedInterval} setSelectedInterval={setSelectedInterval} selectedProbability={selectedProbability} setSelectedProbabilit={setSelectedProbabilit} selectedAlertSound={selectedAlertSound} setSelectedAlertSound={setSelectedAlertSound} alertSounds={alertSounds} buySellFilter={buySellFilter} setBuySellFilter={setBuySellFilter} />

      {middleSection}
    </section>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log("state at signalmodel - ", state);
  console.log("ownProps at signalmodel - ", ownProps);

  //Need to work on state based on ownprops...

  return {
    isAuthenticated: state && state.authentication && state.authentication.data && state.authentication.data.userId && state.authentication.data.walletId ? true : false,
    userId: state && state.authentication && state.authentication.data && state.authentication.data.userId ? state.authentication.data.userId : null,
    walletId: state && state.authentication && state.authentication.data && state.authentication.data.walletId ? state.authentication.data.walletId : null,
    subscribedMoels: state && state.model && state.model.subscribedMoels ? state.model.subscribedMoels : [],
  };
};

export default connect(mapStateToProps, {
  getSignals,
  getSubscribedModels,
})(Signals);
