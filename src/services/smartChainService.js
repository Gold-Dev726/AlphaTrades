import api from "./apis/api";
import storage from "./storage";

import { deHydrateSubmitContact } from "./transformers/contactTransformer";

const USERID = "USERID";

class SmartChainService {
  getContactBalance(data) {
		console.log("getContactBalance data - ",data);
    return api.smartChain.getBalance(data);
  }
}

export default new SmartChainService();
