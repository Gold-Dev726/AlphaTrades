import api from "./apis/api";
import storage from "./storage";
import {
  deHydrateAutoSnapData,
  deHydrateScheduleAppoinment,
  dyHydrateJobOrders,
  hydrateAppointmentSlots,
} from "./transformers/jobTransformer";

const USERID = "USERID";

class JobService {
  getJobOrders(data) {
    return api.job.getJobOrders(dyHydrateJobOrders(data));
  }
  deleteJobOrders(jobOrderId) {
    return api.job.deleteJobOrder(jobOrderId);
  }
  getUserId() {
    return storage.get(USERID);
  }
  setUserId(value) {
    storage.set(USERID, value);
  }

  scheduleAppoinment(data) {
    return api.job.scheduleAppoinment(deHydrateScheduleAppoinment(data));
  }

  getAppointmentSlotByDate(data) {
    return api.job.getAppointmentSlotByDate(data).then(hydrateAppointmentSlots);
  }

  rescheduleAppoinment(data, appointmentId) {
    return api.job.rescheduleAppoinment(
      deHydrateScheduleAppoinment(data),
      appointmentId
    );
  }

  resendAppointment(data) {
    return api.job.resendAppointment(data);
  }

  autoSnap(data) {
    return api.job.autoSnap(deHydrateAutoSnapData(data));
  }

  checkJobOrderCallStatus(jobOrderId) {
    return api.job.checkJobOrderCallStatus(jobOrderId);
  }
}

export default new JobService();
