import axios from "./axios";
import { hydratePerformances } from "../transformers/performanceTransformer";

export default class PerformanceAPI {
  getPerformances(data) {


    const queryParams = {
      skip: data.skip,
      limit: data.limit,
      modelName:data.modelName,
    };

    if (data.searchText) {
      queryParams.searchText = data.searchText;
    }
    
    
    console.log("getPerformances queryParams - ", queryParams);

    return axios.get(`${process.env.REACT_APP_API_END_POINT}/getAllSignals`,{ params: queryParams }
    ).then((res) => {
      console.log("res - ",res);
      return hydratePerformances(res.data);
    });

  }
}
