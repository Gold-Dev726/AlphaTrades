import _ from "lodash";
import moment from "moment";
import { DATE_FORMAT } from "../../constants/appConstant";
import { hydratePagination } from "./paginationTransformer";
export function dehydrateJobOrders(params) {
  return {
    user_id: params.userId,
  };
}

export function hydrateJobOrder(order) {
  return {
    id: order.id,
    orderNo: order.orderNumber || "--",
    assignee: order.assignee,
    autoSnapshot: order.autoSnapshot,
    propertyType: order.propertyType,
    assignDate: moment(order.assignDate).isValid()
      ? moment.utc(order.assignDate).local().format(DATE_FORMAT)
      : "--",
    inspectionDate: moment(order.inspectionDate).isValid()
      ? moment.utc(order.inspectionDate).local().format(DATE_FORMAT)
      : "--",
    jobStatus: order.jobStatus,
    appointmentStatus: order.appointmentStatus,
    jobOrderAppointment: order.jobOrderAppointment,
    quickCallUrl: order.quickCallUrl,
    name: order.name,
    phone: order.phone,
    email: order.email,
    address1: order.address1,
    address2: order.address2,
    callStartDate: order.callStartDate,
    formatedCallStartDate: moment(order.callStartDate).isValid()
      ? moment.utc(order.callStartDate).local().format(DATE_FORMAT)
      : "--",
    city: order.city,
    state: order.state,
    country: order.country,
    address: `${order.address1}, ${order.address2}, ${order.city}, ${order.state}, ${order.country}`,
  };
}

export const hydrateJobOrders = (data) => {
  const list = _.get(data, "list", []);
  return {
    data: list.map((d) => hydrateJobOrder(d)),
    pagination: hydratePagination(_.get(data, ["page"], {})),
  };
};

export const dyHydrateJobOrders = (data) => {
  return {
    page: data.pageNo - 1,
    size: data.pageSize,
    searchText: data.searchText,
  };
};

