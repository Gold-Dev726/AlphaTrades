import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getContactBalance } from "../../actions/smartChainAction";
import Web3 from "web3";
import styles from "./metamask-auth.module.css";

//let web3 = new Web3();
let web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
const Tx = require("ethereumjs-tx").Transaction;
const common = require("ethereumjs-common");
const addressFrom = "0x52cb13b5cb900ef34f6c23813fe8082b92b019f4";
const privateKey1 =
  "c429601ee7a6167356f15baa70fd8fe17b0325dab7047a658a31039e5384bffd";
const privateKey = Buffer.from(privateKey1, "hex");

// the destination address
const addressTo = "0x3714D19Aec44C2B85dBEB3e3F36163Cf805085bd";

function isMobileDevice() {
  return "ontouchstart" in window || "onmsgesturechange" in window;
}

// Function used to connect

async function connectMethod2(onConnected) {
  console.log("inside connectMethod2 - ");

  // Empty web3 instance

  if (typeof window.ethereum !== "undefined") {
    // Instance web3 with the provided information from the MetaMask provider information
    // web3 = new Web3(window.ethereum);

    try {
      // Create new account
      // const account = web3.eth.accounts.create();
      // console.log("account created - ", account);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("accounts - ", accounts);
      let balanceAmount = await web3.eth.getBalance(accounts[0]).then();
      console.log("balanceAmount - ", balanceAmount);
      onConnected(accounts[0]);
      /*
      web3.eth.sendTransaction(
        {
          from: accounts[0],
          value: "10000000",
        },
        function (err, transactionHash) {
          if (err) {
            console.log(err);
          } else {
            console.log(transactionHash);
          }
        }
      );
        */

      var amount = 0;
			//var amount = 174476930000000000;
			
      var tokens = web3.utils.toWei(amount.toString(), "ether");
      console.log("tokens ", tokens);
			var bntokens = web3.utils.toBN(tokens);

			console.log("web3.utils wei - ", web3.utils.toWei("100", "wei"));
      
			console.log("bntokens ", bntokens);


			console.log("gasLimit ", web3.utils.toHex(21000));
			console.log("gasPrice ", web3.utils.toHex(10e9));


      const txData = {
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(10e9), // 10 Gwei
        to: addressTo,
        from: addressFrom,
        //value: web3.utils.toHex(web3.utils.toWei("0.0001", "ether")),
        //value: web3.utils.toHex(web3.utils.toWei("1", "wei")),
        // value: web3.utils.toHex(0.17426693),
        // value: bntokens,
        // value:0.17426693
				value: web3.utils.toHex(web3.utils.toWei('100', 'ether')),
        // if you want to send raw data (e.g. contract execution) rather than sending tokens,
        // use 'data' instead of 'value' (thanks @AlecZadikian9001)
        // e.g. myContract.methods.myMethod(123).encodeABI() (thanks @NguyenHoangSon96)
      };

      /** Signs the given transaction data and sends it. Abstracts some of the details of
       * buffering and serializing the transaction for web3.
       * @returns A promise of an object that emits events: transactionHash, receipt, confirmaton, error
       */

      const sendRawTransaction = (txData) => {
        // get the number of transactions sent so far so we can create a fresh nonce
        console.log("sendRawTransaction - txData - ", txData);
        web3.eth.getTransactionCount(addressFrom).then((txCount) => {
          console.log("txCount - ", txCount);
          //const accountNonce = "0x" + (web3.eth.getTransactionCount(addressFrom) + 1).toString(16);
          const accountNonce = "0x" + (txCount + 1).toString(16);
          console.log("accountNonce - ", accountNonce);
          const newNonce = web3.utils.toHex(accountNonce);
          console.log("newNonce - ", newNonce);

          const chain = common.default.forCustomChain(
            "mainnet",
            {
              name: "bnb",
              networkId: 97,
              chainId: 97,
            },
            "petersburg"
          );
          //var rawTx = new Tx(txData, { common: chain });
          const rawTx = new Tx(
            { ...txData, nonce: newNonce },
            { common: chain }
          );
          console.log("rawTx - ", rawTx);
          rawTx.sign(privateKey);
          const serializedTrans = rawTx.serialize();
          const raw = "0x" + serializedTrans.toString("hex");

          web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            console.log("err:", err);
            console.log("txHash:", txHash);
          });

          // const serializedTx = rawTx.serialize().toString("hex");
          // console.log("serializedTx - ", serializedTx);
          // web3.eth.sendSignedTransaction("0x" + serializedTx);

          // const transaction = new Tx({ ...txData, nonce: newNonce }, { chain: "" }); // or mainnet 'rinkeby'
          // transaction.sign(privateKey);
          // const serializedTx = transaction.serialize().toString("hex");
          // console.log("serializedTx - ", serializedTx);
          // return web3.eth.sendSignedTransaction("0x" + serializedTx);
        });
      };

      // fire away!
      // (thanks @AndreiD)
      sendRawTransaction(txData);
      // sendRawTransaction(txData).then((result) =>
      //   result
      //     .on("transactionHash", (txHash) => {
      //       console.log("transactionHash:", txHash);
      //     })
      //     .on("receipt", (receipt) => {
      //       console.log("receipt:", receipt);
      //     })
      //     .on("confirmation", (confirmationNumber, receipt) => {
      //       if (confirmationNumber >= 1) {
      //         console.log("confirmations:", confirmationNumber, receipt);
      //       }
      //     })
      //     .on("error:", (error) => {
      //       console.error(error);
      //     })
      // );
    } catch (e) {
      // User denied access
      console.log("window.ethereum err - ", e);
      return false;
    }
  }
}

async function checkIfWalletIsConnected(onConnected) {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }

    if (isMobileDevice()) {
      await connect(onConnected);
    }
  }
}

const MetaMaskAuth = (props) => {
  const [accounts, setAccounts] = useState([]);
  const [web3Enabled, setWeb3Enabled] = useState(false);
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, []);

  useEffect(() => {
    console.log("WE FINALLY GOT userAddress - ", userAddress);

    async function fetchData() {
      // You can await here

      let result = await props.getContactBalance(userAddress);
      console.log("WE FINALLY GOT userbalance 1 - ", result);
      console.log("WE FINALLY GOT userbalance 2 - ", result.status);
      console.log(
        "WE FINALLY GOT userbalance 3- ",
        web3.utils.fromWei(result.result, "ether")
      );

      /* Method 1
			web3.eth.sendTransaction({
        from: '0x52cb13b5cb900ef34f6c23813fe8082b92b019f4',
        to: '0x52cb13b5cb900ef34f6c23813fe8082b92b019f4',
        value: '1000000000000000000'
        
        
    }, function(err, transactionHash) {
      if (err) {
        console.log("err - ",err);
        } else {
        console.log(transactionHash);
       }
    });

		*/
    }
    fetchData();
  }, [userAddress]);

  return userAddress ? (
    <div>
      {/* Connected with <Address userAddress={userAddress} /> */}
      <Connect setUserAddress={setUserAddress} />
    </div>
  ) : (
    <Connect setUserAddress={setUserAddress} />
  );
};

function Connect({ setUserAddress }) {
  /*
  if (isMobileDevice()) {
    //const dappUrl = "metamask-auth.ilamanov.repl.co"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
    const dappUrl = "metamask-auth.mvp.findscan.net"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
    const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
    return (
      <a href={metamaskAppDeepLink}>
        <button className={styles.button}>Connect to MetaMask</button>
      </a>
    );
  }
  */

  return (
    <button
      className={styles.button}
      onClick={() => {
        // on button click we are calling connect function and passing setUserAddress as arg
        connectMethod2(setUserAddress);
      }}
    >
      Connect to MetaMask
    </button>
  );
}

function Address({ userAddress }) {
  return (
    <span className={styles.address}>
      {userAddress.substring(0, 5)}…
      {userAddress.substring(userAddress.length - 4)}
    </span>
  );
}

const mapStateToProps = (state) => {
  console.log("MetamaskAuth state we have ", state);
  return {
    job: state.job,
    profile: state.profile,
  };
};

export default connect(mapStateToProps, {
  getContactBalance,
})(MetaMaskAuth);
