import _ from "lodash";
import moment from "moment";
import { DATE_FORMAT } from "../../constants/appConstant";
import { hydratePagination } from "./paginationTransformer";




// From API to UI

export function hydrateModel(model) {
  return {
    id: model._id,
    name: model.name,
    score: model.score,
    interval: model.interval,
    pair: model.pair,
    price: model.price,
    validityInDays: model.validityInDays,
    currencySymbol: model.currencySymbol,
    description: model.description,
    purchasePriceInToken: model.purchasePriceInToken,
    isUserSubscribed: model.isUserSubscribed,
    
  };
}

export const hydrateGetModels = (data) => {
	console.log("hydrateGetModels data - ",data);
  //const list = _.get(data, "list", []);
	console.log("hydratePerformances list - ",data);
  return {
    data: data.map((d) => hydrateModel(d)),
  };
};

// From UI to API
export const deHydrateGetModels = (data) => {

  console.log("deHydrateGetModels data - ",data);

  return {
    skip: data.skip,
    limit: data.limit,
    searchText: data.searchText,
    userId: data.userId?data.userId:null,
  };
};



// From API to UI
export const hydratePurchaseModel = (data) => {
	console.log("hydratePurchaseModel data - ",data);
  return {
    data: data,
  };
};

// From UI to API
export const deHydratePurchaseModel = (data) => {

  console.log("deHydratePurchaseModel data - ",data);

  return {
    transactionHash: data.transactionHash,
    modelId: data.modelId,
    walletId: data.walletId,
    merchantWalletId: data.merchantWalletId,
    validityInDays: data.validityInDays,
    userId:data.userId,
    tokenQauntiy:data.tokenQauntiy,
    paymentCurrency:data.paymentCurrency,
  };
};



// From API to UI
export const hydrateGetSubscribedModel = (data) => {
	console.log("hydratePurchaseModel data - ",data);
  return {
    purchasedModels: data.modelNames?data.modelNames:[],
  };
};

// From UI to API
export const deHydrateGetSubscribedModel = (data) => {

  console.log("deHydrateGetSubscribedModel data - ",data);

  return {
    userId:data.userId,
  };
};

