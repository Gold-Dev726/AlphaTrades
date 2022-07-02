/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback, useReducer } from "react";
import { connect, useDispatch } from "react-redux";
import { useSpeechSynthesis } from "react-speech-kit";
import _ from "lodash";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Web3Modal from "web3modal";
import Web3 from "web3";
import { useTranslation } from "react-i18next";
import ModelElement from "./ModelElement";
import { getAllModels, purchaseModels } from "../../actions/modelAction";
import { connectWallet } from "../../actions/authenticationAction";
import {
  handleTransfer,
  handleConnectWallet,
  humanizeAddress,
  tokyoCoinManagement,
  evoCoinManagement,
  darrivalCoinManagement
} from "../../helpers";
import { customToast } from "../../helpers/customToast";
import { StartLoading, StopLoading } from "../../actions/UIAction";
import TradingHeader from "../common/TradingHeader";
import useCoinGeckoPrice from "../../helpers/useCoinGeckoPrice";
import localStorage from "../../services/storage";
import briseicon from "../../images/currency/briseicon.jpg";
import tokyoicon from "../../images/currency/tokyoicon.jpg";
import evoicon from "../../images/currency/evo.png";
import drvicon from "../../images/currency/drv.jpg";
import aibraicon from "../../images/currency/aibra.png";
import EmbrWidget from "./EmbrWidget";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      color: "blue"
    }
  }
};

const Models = (props) => {
  console.log("Models props - ", props);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const BrisePrice = useCoinGeckoPrice("bitrise-token");
  console.log("BrisePrice=================>", BrisePrice);

  const [pageNo, setCurrentPage] = useState(1);

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);
  const [totalCount, setTotalCount] = useState(0);
  const [refreshModel, setRefreshModel] = useState(false);
  const [modelList, setModelList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { isSubscribeModelOpen: false, selectedCurrency: "", tokenQauntiy: 0 }
  );

  function isMobileDevice() {
    return "ontouchstart" in window || "onmsgesturechange" in window;
  }

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
  };

  useEffect(() => {
    const filter = {
      skip,
      limit
    };

    if (searchTerm) {
      filter.searchText = searchTerm;
    }

    if (localStorage.get("userId")) {
      filter.userId = localStorage.get("userId");
    }

    props.getAllModels(filter).then((res) => {
      if (res) {
        console.log("getAllModels res - ", res);

        setModelList(res.data);
        const count = _.get(res, ["pagination", "totalCount"], 0);
        setTotalCount(count);
      }
    });

    console.log("test - ");
  }, [pageNo, refreshModel, searchTerm]);

  useEffect(() => {
    console.log("Do something after counter has changed", modelList);
  }, [modelList]);

  useEffect(() => {
    console.log("models state - ", state);
  }, [state]);

  // Search Start

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const debounceSearchFn = useCallback(
    _.debounce((value) => handleSearchChange(value), 500),
    []
  );

  const onSubscribeClick = async (item) => {
    console.log("onSubscribeClick - ", item);

    if (props.isAuthenticated) {
      if (isMobileDevice()) {
        customToast.warn(
          "Subscription via mobile device is under maintenance, please try subscribing via web/desktop."
        );
        return;
      }

      setState({ selectedModel: item, isSubscribeModelOpen: true });
    } else {
      console.log("Not authenticated...");

      const chainId = 32520;
      if (window.ethereum.networkVersion !== chainId) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: Web3.utils.toHex(chainId) }]
          });
        } catch (err) {
          // This error code indicates that the chain has not been added to MetaMask
          if (err.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainName: "BRISE Mainnet",
                  chainId: Web3.utils.toHex(chainId),
                  nativeCurrency: {
                    name: "BRISE",
                    decimals: 18,
                    symbol: "BRISE"
                  },
                  rpcUrls: ["https://mainnet-rpc.brisescan.com/"],
                  blockExplorerUrls: ["https://brisescan.com/"]
                }
              ]
            });
          }
        }
      }
      const walletId = await handleConnectWallet();
      console.log("TradingHeader walletId - ", walletId);
      if (!walletId) {
        customToast.error("Please connect with BRISE network");
        return;
      }
      const result = await props.connectWallet(walletId).then();
      console.log("props.connectWallet result - ", result);
      setState({
        isWalletConnected: true,
        address: humanizeAddress(result.walletId)
      });

      const filter = {
        skip: 0,
        limit: 100
      };
      filter.userId = result.userId;
      props.getAllModels(filter).then((res) => {
        if (res) {
          console.log("getAllModels res - ", res);
        }
      });
    }
  };

  const startTransaction = async () => {
    console.log("handleTransfer - ", state.selectedCurrency);
    let tx = null;
    if (state.selectedCurrency.trim().length == 0) {
      return;
    } else {
      setState({ isSubscribeModelOpen: false });
      if (state.selectedCurrency.trim() == "TOKYO") {
        tx = await tokyoCoinManagement(`0.000000000001`);
        //tx = await tokyoCoinManagement(`${state.tokenQauntiy}`);
      } else if (state.selectedCurrency.trim() == "DRV") {
        tx = await darrivalCoinManagement(`0.000000000001`);
        //tx = await tokyoCoinManagement(`${state.tokenQauntiy}`);
      } else if (state.selectedCurrency.trim() == "EVO") {
        tx = await evoCoinManagement(`0.000000000001`);
        //tx = await tokyoCoinManagement(`${state.tokenQauntiy}`);
      } else {
        tx = await handleTransfer(state.quantity);
      }

      //const tx = await handleTransfer(`${state.tokenQauntiy}`);
      //Temp
      console.log("tx at index -  ", tx);
      if (!tx) {
        customToast.error("oops! Something went wrong please try again later.");
        setState({ selectedCurrency: "", tokenQauntiy: 0, selectedModel: {} });
        return;
      } else {
        customToast.success(`Success! Your transaction hash is - ${tx.hash}`);
      }

      const purchaseModelsObject = {
        transactionHash: tx.hash,
        modelId: state.selectedModel.id,
        walletId: localStorage.get("walletId"),
        merchantWalletId: process.env.REACT_APP_MERCHANT_WALLET_ID,
        validityInDays: state.selectedModel.validityInDays,
        userId: localStorage.get("userId"),
        tokenQauntiy: state.tokenQauntiy,
        paymentCurrency: state.selectedCurrency
      };

      console.log("purchaseModelsObject - ", purchaseModelsObject);
      const purchaseResult = await props
        .purchaseModels(purchaseModelsObject)
        .then();
      console.log("purchaseResult - ", purchaseResult);
      // setModelList(modelResult.data);

      const filter = {
        skip,
        limit
      };
      if (localStorage.get("userId")) {
        filter.userId = localStorage.get("userId");
      }
      const modelResult = await props.getAllModels(filter).then();
      console.log("modelResult - ", modelResult);
      setState({ selectedCurrency: "", tokenQauntiy: 0, selectedModel: {} });
    }

    //await tokyoCoinManagement();
    //await evoCoinManagement();
  };

  // Search End

  return (
    <section className="content-wapper models">
      <div className="header-and-trading">
        <h1>Models</h1>
        <TradingHeader screen={"model"} />
      </div>

      <div className="common-panel panel-table-height">
        <div className="panel-body">
          <div className="model-listing">
            {props.models.map((item, id) => (
              <ModelElement
                isAuthenticated={props.isAuthenticated}
                item={item}
                onSubscribeClick={onSubscribeClick}
              />
            ))}
          </div>
        </div>
      </div>

      <Dialog
        className="currency-select-dialogue"
        open={state.isSubscribeModelOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Select payment method"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please select your preferred token
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="dialogue-content">
            <Select
              className="selectbox"
              IconComponent={""}
              displayEmpty
              value={state.selectedCurrency}
              onChange={(event) => {
                const {
                  target: { value }
                } = event;

                console.log("handleSwitchChange  -", value);
                const tokenQauntiy = 30 / BrisePrice;
                setState({
                  selectedCurrency: value,
                  tokenQauntiy: tokenQauntiy
                });
              }}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                console.log("currency - selected - ", selected);
                if (!selected || selected.length === 0) {
                  return <span>Choose Currency</span>;
                }
                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
              style={{ width: "100%" }}
            >
              <MenuItem value="BRISE">
                <img
                  src={briseicon}
                  alt="crypto-logo"
                  className="crypto-logo"
                />
                <span>BRISE</span>
              </MenuItem>

              <MenuItem disabled value="TOKYO">
                <img
                  src={tokyoicon}
                  alt="crypto-logo"
                  className="crypto-logo"
                />
                <span>TOKYO (Under maintenance)</span>
              </MenuItem>

              <MenuItem disabled value="EVO">
                <img src={evoicon} alt="crypto-logo" className="crypto-logo" />
                <span>EVO (Under maintenance)</span>
              </MenuItem>

              <MenuItem disabled value="DRV">
                <img src={drvicon} alt="crypto-logo" className="crypto-logo" />
                <span>DRV (Under maintenance)</span>
              </MenuItem>

              <MenuItem disabled value="AIBRA">
                <img
                  src={aibraicon}
                  alt="crypto-logo"
                  className="crypto-logo"
                />
                <span>AIBRA (Under maintenance)</span>
              </MenuItem>
            </Select>

            <span className="selected-token-quantity">
              Quantiy:{state.tokenQauntiy}
            </span>

            <div className="pay-cancel-button">
              <div class="subscribe pay-cancel-btn">
                <div
                  onClick={() => {
                    startTransaction();
                  }}
                  class="subscribe-button"
                  style={{ color: "rgb(255, 255, 255)" }}
                >
                  Pay
                </div>
              </div>

              <div class="subscribe pay-cancel-btn">
                <div
                  onClick={() => {
                    setState({
                      isSubscribeModelOpen: false,
                      tokenQauntiy: 0,
                      selectedCurrency: ""
                    });
                  }}
                  class="subscribe-button"
                  style={{ color: "rgb(255, 255, 255)" }}
                >
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </DialogActions>
      </Dialog>
      <EmbrWidget />
    </section>
  );
};

const mapStateToProps = (state) => {
  console.log("state we have at models - ", state);
  return {
    models: state.model.models ? state.model.models : [],
    isAuthenticated:
      state &&
      state.authentication &&
      state.authentication.data &&
      state.authentication.data.userId &&
      state.authentication.data.walletId
        ? true
        : false,
    userId:
      state &&
      state.authentication &&
      state.authentication.data &&
      state.authentication.data.userId
        ? state.authentication.data.userId
        : null,
    walletId:
      state &&
      state.authentication &&
      state.authentication.data &&
      state.authentication.data.walletId
        ? state.authentication.data.walletId
        : null
  };
};

export default connect(mapStateToProps, {
  getAllModels,
  purchaseModels,
  connectWallet
})(Models);
