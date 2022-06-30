import _ from "lodash";
import moment from "moment";
import { DATE_FORMAT } from "../../constants/appConstant";
import { hydratePagination } from "./paginationTransformer";

export function hydratePerormance(performance) {
  return {
    id: performance.id,
    signal: performance.signal,
    timestamp: performance.timestamp,
    gain: performance.gain
    
  };
}

// From API to UI
export const hydrateSubmitContact = (data) => {
	console.log("hydratePerformances data - ",data);
  const list = _.get(data, "list", []);
	console.log("hydratePerformances list - ",list);
  return {
    data: list.map((d) => hydratePerormance(d)),
    pagination: hydratePagination(_.get(data, ["page"], {})),
  };
};


// From UI to API
export const deHydrateSubmitContact = (data) => {
  return {
    contactType: data.contactType,
    message: data.message,
    name: data.name,
    subject: data.subject,
  };
};

