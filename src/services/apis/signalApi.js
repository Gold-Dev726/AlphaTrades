import api from "./api";
import { hydrateSignals } from "../transformers/signalTransformer";

export default class SignalAPI {
  getSignals(data) {
    const queryParams = {
      page: data.page,
      size: data.size,
    };

    if (data.searchText) {
      queryParams.searchText = data.searchText;
    }

    console.log("getSignals data - ",data);


    

    return api
      .get("signals", {
        params: queryParams,
      })
      .then((res) => {
        return hydrateSignals(res.data.data);
      });


  }
}
