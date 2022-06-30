import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import Web3Modal from "web3modal";
import { providers, utils, ethers } from "ethers";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { METAMASK_CONFIG } from "../constants/appConstant";
let web3ModalRef = null;

const abi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",
  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];


export const handleConnectWallet = async () => {
  console.log("test");

  try {
    web3ModalRef = new Web3Modal({
      network: "bsctestnet",
      theme: "dark",
    });

    await web3ModalRef.connect();

    const signer = await getProviderOrSigner(true);
    console.log("signer - ", signer);
    if (signer) {
      let _address = await signer.getAddress();

      console.log("_address - ", _address);
      console.log("humanizeAddress _address - ", humanizeAddress(_address));
      subscribeProvider(signer);
      return _address;
    }
  } catch (err) {
    toast.error("Failed to connect wallet");
  }
};

export const tokyoCoinManagement = async (amount) => {
  // A Human-Readable ABI; for interacting with the contract, we
  // must include any fragment we wish to use



  // This can be an address or an ENS name
  const address = "0x38EA4741d100cAe9700f66B194777F31919142Ee";

  const signer = await getProviderOrSigner(true);
  if (!signer) {
    console.log("signer is not....");
    return;
  }


  // Read-Write; By connecting to a Signer, allows:
  // - Everything from Read-Only (except as Signer, not anonymous)
  // - Sending transactions for non-constant functions
  const erc20_rw = new ethers.Contract(address, abi, signer);
  console.log("erc20_rw - ", erc20_rw);

  const balance = await erc20_rw.balanceOf(signer.getAddress())
  console.log("balance...", balance);

  const balanceInTokyo = utils.formatEther(balance);
  console.log("balanceInTokyo...", balanceInTokyo);

  if (Number(amount) > Number(balanceInTokyo)) {
    console.log("You dont have enough TOKYO balance");
    console.log(`balanceAmount: ${balanceInTokyo} , Required: ${amount} `);
    return;
  }

  try {

    const adressTo = "0x3714D19Aec44C2B85dBEB3e3F36163Cf805085bd";
    const tx = await erc20_rw.transfer(adressTo, utils.parseEther(amount));
    //toast.success("Transfer success at tx: " + tx.hash);
    console.log("evoCoinManagement tx we have ", tx);
    return tx;


  } catch (err) {

    console.log("evoCoinManagement err we have ", err);
    return null;

  }


};

export const darrivalCoinManagement = async (amount) => {
  // A Human-Readable ABI; for interacting with the contract, we
  // must include any fragment we wish to use



  // This can be an address or an ENS name
  const address = "0xeB18A16A08530b811523fA49310319809ac4c979";

  const signer = await getProviderOrSigner(true);
  if (!signer) {
    console.log("signer is not....");
    return;
  }


  // Read-Write; By connecting to a Signer, allows:
  // - Everything from Read-Only (except as Signer, not anonymous)
  // - Sending transactions for non-constant functions
  const erc20_rw = new ethers.Contract(address, abi, signer);
  console.log("erc20_rw - ", erc20_rw);

  const balance = await erc20_rw.balanceOf(signer.getAddress())
  console.log("balance...", balance);

  const balanceInDRV = utils.formatEther(balance);
  console.log("balanceInDRV...", balanceInDRV);

  if (Number(amount) > Number(balanceInDRV)) {
    console.log("You dont have enough DRV balance");
    console.log(`balanceAmount: ${balanceInDRV} , Required: ${amount} `);
    return;
  }


  try {

    const adressTo = "0x3714D19Aec44C2B85dBEB3e3F36163Cf805085bd";
    const tx = await erc20_rw.transfer(adressTo, utils.parseEther(amount));
    //toast.success("Transfer success at tx: " + tx.hash);
    console.log("darrivalCoinManagement tx we have ", tx);
    return tx;


  } catch (err) {

    console.log("darrivalCoinManagement err we have ", err);
    return null;

  }


};


export const evoCoinManagement = async (amount) => {
  // A Human-Readable ABI; for interacting with the contract, we
  // must include any fragment we wish to use



  // This can be an address or an ENS name
  const address = "0x267Ae4bA9CE5ef3c87629812596b0D89EcBD81dD";

  const signer = await getProviderOrSigner(true);
  if (!signer) {
    console.log("signer is not....");
    return;
  }


  // Read-Write; By connecting to a Signer, allows:
  // - Everything from Read-Only (except as Signer, not anonymous)
  // - Sending transactions for non-constant functions
  const erc20_rw = new ethers.Contract(address, abi, signer);
  console.log("erc20_rw - ", erc20_rw);

  const balance = await erc20_rw.balanceOf(signer.getAddress())
  console.log("balance...", balance);

  const balanceInEvo = utils.formatEther(balance);
  console.log("balanceInEvo...", balanceInEvo);


  if (Number(amount) > Number(balanceInEvo)) {
    console.log("You dont have enough EVO balance");
    console.log(`balanceAmount: ${balanceInEvo} , Required: ${amount} BNB`);

    return null;
  }

  try {

    const adressTo = "0x3714D19Aec44C2B85dBEB3e3F36163Cf805085bd";
    const amount = '0.00000000001';
    const tx = await erc20_rw.transfer(adressTo, utils.parseEther(amount));
    //toast.success("Transfer success at tx: " + tx.hash);
    console.log("evoCoinManagement tx we have ", tx);


  } catch (err) {

    console.log("evoCoinManagement err we have ", err);

  }


};

const subscribeProvider = async (provider) => {
  console.log("subscribeProvider - ", provider);

  if (!provider.on) {
    console.log("! provider.on - ");
    return;
  }
  provider.on("close", () => resetApp());
  provider.on("accountsChanged", async (accounts) => {
    console.log("accountsChanged - ", accounts[0]);
    //setUserAddress(accounts[0]);
  });
  provider.on("chainChanged", async (chainId) => {
    toast("chainChanged", chainId);
    if (!METAMASK_CONFIG.SUPPORTED_CHAID_IDS.includes(chainId)) {
      toast.error("Change network to BSC testnet");
    }
  });

  provider.on("networkChanged", async (networkId) => {
    toast("networkChanged", networkId);
    if (!METAMASK_CONFIG.SUPPORTED_CHAID_IDS.includes(networkId)) {
      toast.error("Change network to BSC testnet");
    }
  });
};
const resetApp = async () => {
  if (web3ModalRef) {
    await web3ModalRef.clearCachedProvider();
  }

  console.log("Wallet disconnected");
};

const getProviderOrSigner = async (needSigner = false) => {
  const provider = new providers.Web3Provider(window.ethereum);

  const { chainId } = await provider.getNetwork();
  console.log("chainId - ", chainId);

  if (!METAMASK_CONFIG.SUPPORTED_CHAID_IDS.includes(chainId)) {
    console.log("Change network to BSC testnet");
    return null;
  }

  if (needSigner) {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    if (signer) {
      return signer;
    }
    toast.error("You need to allow MetaMask.");
    return null;
  }

  return provider;
};

export const humanizeAddress = (address) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

export const handleTransfer = async (amount) => {
  console.log("Here is Brise transfer==============>")
  console.log("You passed amount - ", amount);
  if (!amount) {
    console.log("You need amount");
    return;
  }

  try {
    const signer = await getProviderOrSigner(true);
    if (!signer) {
      console.log("signer is not....");
      return;
    }

    const balance = await signer.getBalance();
    const balanceInBNB = utils.formatEther(balance);
    toast("balance...", balance);
    toast("balanceInBNB...", balanceInBNB);

    if (Number(amount) > Number(balanceInBNB)) {
      console.log("You dont have enough BNB balance");
      console.log(`balanceAmount: ${balanceInBNB} BNB, Required: ${amount} BNB`);

      return;
    }
    toast("Transferring...");
    const tx = await signer.sendTransaction({
      to: process.env.REACT_APP_MERCHANT_WALLET_ID,
      value: utils.parseEther(amount),
    });
    //toast.success("Transfer success at tx: " + tx.hash);
    console.log("tx we have ", tx);
    return tx;
  } catch (err) {
    console.log("tx err - ", err);
    return;
  }
};
