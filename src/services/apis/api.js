import axios from "axios";
import AuthAPI from "./authApi";

import SignalAPI from "./signalApi";
import PerformanceAPI from "./performanceApi";
import ModelAPI from "./modelApi";
import ContactAPI from "./contactApi";
import Authentication from "./authenticationApi";
import ProfileAPI from "./profileAPI";
import SmartChainAPI from "./smartChainApi";
import sessionStorage from "./../sessionStorage";
import localStorage from "./../storage";

import _ from "lodash";
import { storageTypes, loginType } from "./../../constants/appConstant";
import SentryUtils from "../../errors/SentryUtils";
import { StartErrorModal } from "../../actions/errorPopUpAction";
import store from "../../store";

const BASEURL = process.env.REACT_APP_API_END_POINT;
const SMART_CHAIN_BASEURL = process.env.REACT_APP_SMART_CHAIN_BASEURL;
const BASEURL_SCREENER = process.env.REACT_APP_API_SCREENER_END_POINT;
const TIMEOUTFORUPLOADFILE = 1800000;
const STATICTOKEN = process.env.REACT_APP_TOKEN;
class API {
  __auth = new AuthAPI();
  __profile = new ProfileAPI();
  __signal = new SignalAPI();
  __performance = new PerformanceAPI();
  __contact = new ContactAPI();
  __authentication = new Authentication();
	__smartChain = new SmartChainAPI();
  __model = new ModelAPI();

  api = axios.create({
    baseURL: BASEURL,
    transformRequest: [(data) => JSON.stringify(data)],
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });


	apiBinanceChain = axios.create({
    baseURL: SMART_CHAIN_BASEURL
  });

  downloadApi = axios.create({
    baseURL: BASEURL,
    transformRequest: [(data) => JSON.stringify(data)],
    responseType: "blob",
    headers: {
      Accept: "application/zip",
    },
  });

  formsApi = axios.create({
    baseURL: BASEURL,
    timeout: TIMEOUTFORUPLOADFILE,
    headers: { "Content-Type": "multipart/form-data" },
  });

  apiScreener = axios.create({
    baseURL: BASEURL_SCREENER,
    transformRequest: [(data) => JSON.stringify(data)],
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  get auth() {
    return this.__auth;
  }

  get authentication() {
    return this.__authentication;
  }

  get profile() {
    return this.__profile;
  }

  get signal() {
    return this.__signal;
  }

  get performance() {
    return this.__performance;
  }

  get model() {
    return this.__model;
  }

  get contact() {
    return this.__contact;
  }
	get smartChain() {
    return this.__smartChain;
  }


	async getBinance(url, ...args){
		console.log("calling getBinance...");
		try{
		const result = await	this.apiBinanceChain.get(url);
		console.log("calling result...",result);
		return result.data;
		}catch(err){

			const result = {message:"errr"};
			return result;

		}

	}

  get(url, ...args) {
		console.log("calling api get...");
    return this.sendRequestInternal(this.api.get, url, ...args);
  }

  post(url, ...args) {
    return this.sendRequestInternal(this.api.post, url, ...args);
  }

  patch(url, ...args) {
    return this.sendRequestInternal(this.api.patch, url, ...args);
  }

  delete(url, ...args) {
    return this.sendRequestInternal(this.api.delete, url, ...args);
  }

  put(url, ...args) {
    return this.sendRequestInternal(this.api.put, url, ...args);
  }

  downloadPost(url, ...args) {
    return this.sendRequestInternal(this.downloadApi.post, url, ...args);
  }

  postMultipartFormData(url, data, onUploadProgress) {
    return this.sendRequestInternal(
      (u, a) => this.formsApi.post(u, a, { onUploadProgress }),
      url,
      data
    );
  }

  putMultipartFormData(url, data, onUploadProgress) {
    return this.sendRequestInternal(
      (u, a) => this.formsApi.put(u, a, { onUploadProgress }),
      url,
      data
    );
  }
  sendRequestInternal(requestFunc, url, ...args) {
    let token;
    if (sessionStorage.get("storageType") == storageTypes.sessionStorage) {
      token = sessionStorage.get("token");
    } else {
      token = localStorage.get("token");
    }
    let tokenType = "";
    if (token) {
      this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      this.downloadApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      this.formsApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      tokenType = "auth";
    } else {
      this.api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${STATICTOKEN}`;
      this.downloadApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${STATICTOKEN}`;
      this.formsApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${STATICTOKEN}`;
      tokenType = "static";
    }
    return requestFunc(url, ...args)
      .then((response) => response)
      .catch((error) => {
        const additionalInfoObject = {
          sendRequestInternal_params: {
            url,
            args,
          },
        };
        if (process.env.REACT_APP_APP_ENV === "dev") {
          additionalInfoObject["tokenType"] = tokenType;
        }
        if (axios.isAxiosError(error)) {
          console.log("axios.isAxiosError", error);
        } else {
          console.log("not axios.isAxiosError");
        }
        if (error.response) {
          if (_.get(error, ["response", "data", "status"], 500) === 401) {
            if (
              sessionStorage.get("storageType") == storageTypes.sessionStorage
            ) {
              sessionStorage.clearAll();
              window.location = "/unauthorized";
            } else {
              localStorage.clearAll();
              if (localStorage.get("loginType") == loginType.valueConnect) {
                window.location = "/unauthorized";
              } else {
                window.location = "/sign-in";
              }
            }
          } else if (
            _.get(error, ["response", "status"], "") === "" ||
            _.get(error, ["response", "status"], "") === 400 ||
            _.get(error, ["response", "status"], "") === 500 ||
            _.get(error, ["response", "status"], "") === 503 ||
            _.get(error, ["response", "status"], "") === 404
          ) {
            let errorReason = _.get(error, ["response", "data", "message"])
              ? _.get(error, ["response", "data", "message"])
              : _.get(error, ["message"]);
            const errorPayload = {
              errorCode: _.get(error, ["response", "status"], ""),
              errorReason: errorReason,
            };

            console.log("errorPayload - ", errorPayload);
            store.dispatch(StartErrorModal(errorPayload));
          }
        }
        throw error;
      });
  }
}

export default new API();
