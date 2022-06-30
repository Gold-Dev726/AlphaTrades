import axios from "./axios";
import { hydrateGetModels,hydratePurchaseModel,hydrateGetSubscribedModel } from "../transformers/modelTransformer";

export default class ModelAPI {
  getModels(data) {


    const queryParams = {
      skip: data.skip,
      limit: data.limit,
    };

    if (data.searchText) {
      queryParams.searchText = data.searchText;
    }

    if (data.userId) {
      queryParams.userId = data.userId;
    }


    console.log("getModels queryParams - ", queryParams);
    return axios.get(`${process.env.REACT_APP_API_END_POINT}/getAllModels`,{ params: queryParams }
    ).then((res) => {
      console.log("getModels res - ",res);
      return hydrateGetModels(res.data.data);
    });

  }

  getSubscribedModels(data) {


    const queryParams = {
      userId : data.userId
    };

    console.log("getSubscribedModels queryParams - ", queryParams);
    return axios.get(`${process.env.REACT_APP_API_END_POINT}/getSubscribedModels`,{ params: queryParams }
    ).then((res) => {
      console.log("getSubscribedModels res - ",res);
      return hydrateGetSubscribedModel(res.data.data);
    });

  }

  purchaseModel(data) {
    console.log("purchaseModel data - ", data);
    return axios.post(`${process.env.REACT_APP_API_END_POINT}/purchaseModel`,data
    ).then((res) => {
      console.log("purchaseModel res - ",res);
      return hydratePurchaseModel(res.data.data);
    });

  }
}
