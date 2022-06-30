import api from "./api";

import { hydratePerformances } from "../transformers/performanceTransformer";

export default class ContactAPI {
  submitContact(data) {
    console.log("submitContact data - ", data);

    const contactResult = {
      code: 200,
      status: "SUCCESS",
      message: "Job Order Fetch success",
      success: true,
      data: {},
    };

    
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(contactResult);
      }, 3000);
    });
    return myPromise;
    

    /*
    return api
      .post("contact", {
        params: queryParams,
      })
      .then((res) => {
        return hydratePerformances(res.data.data);
      });

      */
  }
}
