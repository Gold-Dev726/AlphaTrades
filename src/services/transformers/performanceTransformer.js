import _ from "lodash";
import moment from "moment";
import { DATE_FORMAT } from "../../constants/appConstant";
import { hydratePagination } from "./paginationTransformer";

export function hydratePerormance(performance) {
  return {
    id: performance._id,
    buy:performance.BUY,
    sell:performance.SELL,
    timestamp: performance.event_time,
    pairName: performance.pair_name,
    predict:performance.predict,
    regression_model_name: performance.regression_model_name?performance.regression_model_name:"",
    comment_predict_buy_thresh:performance.comment_predict_buy_thresh,
    comment_predict_sell_thresh:performance.comment_predict_sell_thresh,
    //gain: performance.gain
    
  };
}

// From API to UI
export const hydratePerformances = (data) => {
	console.log("hydratePerformances data - ",data);
  const list = _.get(data, "data", []);
	console.log("hydratePerformances list - ",list);
  return {
    data: list.map((d) => hydratePerormance(d)),
    totalCount: _.get(data, "totalCount", 0),
    //pagination: hydratePagination(_.get(data, ["page"], {})),
  };
};


// From UI to API
export const deHydratePerformance = (data) => {

  console.log("deHydratePerformance data - ",data);

  return {
    skip: data.skip,
    limit: data.limit,
    modelName: data.modelName,
  };
};

