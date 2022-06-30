import { Buffer } from 'buffer';
import api from "./apis/api";
import sessionStorage from "./sessionStorage";
import localStorage from "./storage";
import {
  
  hydrateConnectWallet,  
  deHydrateConnectWallet

} from "./transformers/authenticationTransformer";
import { storageTypes } from "./../constants/appConstant";


const TOKEN = "token";
const USERID = "userId";
const STORAGETYPE = "storageType";
const LOGINTYPE = "loginType";
const USER_ROLE = "role";
class AuthenticationService {
  connectWallet(data) {
    //return api.authentication.fetchToken(data).then(hydrateConnectWallet);
    return api.authentication.connectWallet(deHydrateConnectWallet(data));
  }

}

export default new AuthenticationService();
