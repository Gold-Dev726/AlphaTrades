import api from "./apis/api";
import storage from "./storage";
import {
  deHydrateAutoSnapData,
  deHydrateScheduleAppoinment,
  dyHydrateJobOrders,
  hydrateAppointmentSlots,
} from "./transformers/jobTransformer";

const USERID = "USERID";

class SignalService {
  getSignals(data) {

    return api.signal.getSignals(dyHydrateJobOrders(data));
  }
}

export default new SignalService();
