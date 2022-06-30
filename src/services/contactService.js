import api from "./apis/api";
import storage from "./storage";

import { deHydrateSubmitContact } from "./transformers/contactTransformer";

const USERID = "USERID";

class ContactService {
  postContact(data) {
    return api.contact.submitContact(deHydrateSubmitContact(data));
  }
}

export default new ContactService();
