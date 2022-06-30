import React, { useEffect, useRef, useState, useReducer } from "react";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import Input from "@mui/material/Input";
import Web3Modal from "web3modal";
import Web3 from "web3";
import { providers, utils } from "ethers";
import _ from "lodash";

import WalletConnect from "@walletconnect/client";
//import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from "@walletconnect/web3-provider";


import NodeWalletConnect from "@walletconnect/node";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'


import * as actionTypes from "../../actions/actionTypes";
import { connectWallet } from "../../actions/authenticationAction";
import { getAllModels, getSubscribedModels } from "../../actions/modelAction";
import { handleConnectWallet, handleTransfer, humanizeAddress } from "../../helpers";
import { customToast } from "../../helpers/customToast";
import localStorage from "../../services/storage";


const APP_NAME = 'Alphatrades';
const APP_LOGO_URL = 'https://app.alphatrades.co/images/logo.svg';
const DEFAULT_ETH_JSONRPC_URL = 'https://mainnet-rpc.brisescan.com/';
const DEFAULT_CHAIN_ID = 32520;


const TradingHeader = (props) => {
  const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }), { isWalletConnected: false, address: "" });

  console.log("TradingHeader props - ", props);
  const dispatch = useDispatch();

  function isMobileDevice() {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
  }

  const connectWallet = async () => {


    if (props.isAuthenticated) {




      console.log("user is authenticated... disconnect");
      localStorage.remove("walletId");
      localStorage.remove("userId");


      dispatch(
        {
          type: actionTypes.DISCONNECT_WALLET_SUCCESS,
          payload: { userId: null, walletId: null },
        });


      const filter = {
        skip: 0,
        limit: 100,
      };

      props.getAllModels(filter).then((res) => {
        if (res) {
          console.log("getAllModels res in trading header - ", res);
        }
      });



    } else {

      let walletId = null;

      if (isMobileDevice()) {

        console.log("walletconnect 2 ");


        //  Create WalletConnect Provider
        const provider = new WalletConnectProvider({
          rpc: {
            32520: "https://chainrpc.com",
            qrcode: false,
          },
        });

        //  Enable session (triggers QR Code modal)

        await provider.enable();
        

        // Send JSON RPC requests

        try {


          // Subscribe to accounts change
          provider.on("accountsChanged", (accounts) => {
            console.log("accountsChanged - ", accounts);
            walletId = accounts[0];
          });

          // Subscribe to chainId change
          provider.on("chainChanged", (chainId) => {
            console.log(chainId);
          });

          // Subscribe to session disconnection
          provider.on("disconnect", (code, reason) => {
            console.log("disconnect - ", code, reason);
          });

          //  Get Accounts
          
          const web3 = new Web3(provider);
          if (!walletId) {
            const accounts = await web3.eth.getAccounts();
            console.log("accounts ", accounts);
            walletId = accounts[0];
          }

          //  Get Chain Id
          
          const chainId = await web3.eth.getChainId();
          console.log("chainId ", chainId);

          //  Get Network Id
          const networkId = await web3.eth.net.getId();
          console.log("networkId ", networkId);
          

        } catch (err) {

          console.log("err - ", err);
          console.log("err.code - ", err.code);


        }



      }
      else {


        const chainId = 32520;
        if (window.ethereum.networkVersion !== chainId) {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: Web3.utils.toHex(chainId) }],
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
                    nativeCurrency: { name: "BRISE", decimals: 18, symbol: "BRISE" },
                    rpcUrls: ["https://mainnet-rpc.brisescan.com/"],
                    blockExplorerUrls: ["https://brisescan.com/"],
                  },
                ],
              });
            }
          }
        }
        walletId = await handleConnectWallet();





      }


      console.log("TradingHeader walletId - ", walletId);
      if (!walletId) {
        customToast.error("Please connect with BRISE network");
        return;
      }
      const result = await props.connectWallet(walletId).then();
      console.log("props.connectWallet result - ", result);
      setState({ isWalletConnected: true, address: humanizeAddress(result.walletId) });


      const filter = {
        skip: 0,
        limit: 100,
      };
      filter.userId = result.userId;
      props.getAllModels(filter).then((res) => {
        if (res) {
          console.log("getAllModels res in tradingheader - ", res);
        }
      });


      const subscribedModels = await props.getSubscribedModels({ userId: result.userId }).then();
      console.log("subscribedModels in header - ", subscribedModels);



    }



  };

  useEffect(() => {
    console.log("useEffect humanizeAddress - ", state);
  }, [state]);

  return (
    <div className="trading">
      <div style={{ visibility: props.screenName && props.screenName === "signal" ? "visible" : "hidden" }} className="trading-div capitaltrad">
        <span className="title">Capital</span>
        <span className="value">
          $
          <Input
            disableUnderline={true}
            value={props.capitalTrade}
            placeholder="5000"
            disabled={!props.capitalTradeEditable}
            onBlur={() => {
              props.setCapitalTradeEditable(false);
            }}
            onChange={(event) => {
              props.setCapitalTrade(event.target.value);
            }}
            onClick={() => {
              console.log("we clicked capital");
              props.setCapitalTradeEditable(true);
            }}
          />
        </span>
      </div>
      <div style={{ visibility: props.screenName && props.screenName === "signal" ? "visible" : "hidden" }} className="trading-div leverage">
        <span className="title">Leverage</span>
        <span className="value">
          <Input
            disableUnderline={true}
            value={props.leverage}
            onChange={(event) => {
              props.setLeverage(event.target.value);
            }}
            onBlur={() => {
              console.log("we onBlur leverage");
              props.setLeverageEditable(false);
            }}
            onClick={() => {
              console.log("we clicked leverage");
              props.setLeverageEditable(true);
            }}
            disabled={!props.leverageEditable}
            placeholder="5"
            name="leverage"
          />
          X
        </span>
      </div>
      <div className="connect-wallet">
        <div onClick={connectWallet} className="connect-wallet-div">
          {props.isAuthenticated ? `Disconnect [${humanizeAddress(props.walletId)}]` : "Connect wallet"}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownprops) => {
  console.log("state at header - ", state);
  console.log("ownprops at header - ", ownprops);
  return {

    isAuthenticated: ((state && state.authentication && state.authentication.data && state.authentication.data.userId && state.authentication.data.walletId) ? true : false),
    userId: ((state && state.authentication && state.authentication.data && state.authentication.data.userId) ? state.authentication.data.userId : null),
    walletId: ((state && state.authentication && state.authentication.data && state.authentication.data.walletId) ? state.authentication.data.walletId : null),


  };
};

export default connect(mapStateToProps, {
  connectWallet,
  getAllModels,
  getSubscribedModels,
})(TradingHeader);
