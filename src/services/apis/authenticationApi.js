import axios from "./axios";
import { hydrateConnectWallet } from "../transformers/authenticationTransformer";

export default class AuthenticationAPI {
  connectWallet(data) {
    console.log("connectWallet  - ", data);
    return axios.post(`${process.env.REACT_APP_API_END_POINT}/connectWallet`, data).then((res) => {
      console.log("connectWallet res - ", res);
      return hydrateConnectWallet(res.data.data);
    });
  }
}
