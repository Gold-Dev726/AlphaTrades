

export const METAMASK_CONFIG = {
  SUPPORTED_CHAID_IDS: [32520],
};


export const APPOINTMENT_STATUS = {
  NEW_APPOINTMENT: { key: "NEW_APPOINTMENT", value: "Request Sent" },
  CONFIRMED_BY_PO: { key: "CONFIRMED_BY_PO", value: "Booked" },
  RESCHEDULED: { key: "RESCHEDULED", value: "Rescheduled and Confirmed" },
  CANCELLED: { key: "CANCELLED", value: "Cancelled" },
  CALL_COMPLETED: { key: "CALL_COMPLETED", value: "Call Completed" },
  SESSSION_STARTED: { key: "SESSSION_STARTED", value: "Session Started" },
};

export const CALL_RECORDING = "CALL_RECORDING";

export const scheduleAppointmentStatus = [
  APPOINTMENT_STATUS.CANCELLED.key,
  APPOINTMENT_STATUS.CALL_COMPLETED.key,
];
export const reScheduleAppointmentStatus = [
  APPOINTMENT_STATUS.NEW_APPOINTMENT.key,
  APPOINTMENT_STATUS.CONFIRMED_BY_PO.key,
  APPOINTMENT_STATUS.RESCHEDULED.key,
];

export const callTypes = {
  QUICK_CALL: "QUICK_CALL",
  SCHEDULE_CALL: "SCHEDULE_CALL",
};

export const TIME_SHORT_FORMAT = "hh:mm A";
export const DATE_TIME_API_FORMAT = "YYYY-MM-DDTHH:mm:ss.SSSS";

export const storageTypes = {
  sessionStorage: 1,
};

export const loginType = {
  valueConnect: 1,
  Appraiser: 2,
};

export const signalsPerPage = [
  { displayName: "10", value: 10 },
  { displayName: "20", value: 20 },
  { displayName: "50", value: 50 },
  { displayName: "100", value: 100 },
];

export const relarPerPage = [
  { displayName: "10", value: 10 },
  { displayName: "20", value: 20 },
  { displayName: "50", value: 50 },
  { displayName: "100", value: 100 },
];

export const DATE_FORMAT = "MM/DD/YYYY hh:mm A";

export const SLOT_STATUSES = {
  BOOKED: "BOOKED",
  AVAILABLE: "AVAILABLE",
  CANCELLED: "CANCELLED",
  RESCHEDULED: "RESCHEDULED",
};

export const ROLE = {
  APPRAISER: "APPRAISER",
  TECHNICIAN: "TECHNICIAN",
};

export const measurementTypes = [
  { id: "1", name: "RemoteVal" },
  { id: "2", name: "Eagleview" },
  { id: "3", name: "Estated" },
  { id: "4", name: "REMOTEVAL_VIDEO" },
];

export const measurementResponseFormat = {
  original: 1,
  converted: 2,
};

export const STATUS = {
  COMPLETED: "COMPLETED",
  FLOORPLAN_FAILED: "FLOORPLAN_FAILED",
  STATUS_OVERRIDE_PREVENTED: "STATUS_OVERRIDE_PREVENTED",
  STATUS_TAG_ALREADY_EXIST: "STATUS_TAG_ALREADY_EXIST",
  STATUS_MEASUREMENT_JSON_ADDED: "STATUS_MEASUREMENT_JSON_ADDED",
};
export const AREA_TYPES = ["Exterior", "Interior"];
export const CHAR_LIMIT = 256;
export const SHORT_NAME_CHAR_LIMIT = 20;
export const AppURLs = {
  dev: "https://dev-portal.remoteval.net/",
  prod: "https://portal.remoteval.net/",
};
export const threeDFloorScan = {
  msgForSameFloorPublish:
    "Floor plan with same name already exists. Are you sure you want to override the floor plan with this?",
  msgForBack: "Your changes will be lost. Are you sure want to go back?",
  msgForPreview:
    "Are you sure want to exit measurement and switch to Explore mode?",
  msgForPublish: "Are you sure you want to publish Floor scan?",
  Complete_Door_Selection: "Please complete door selection.",
  Please_Complete_Window_Selection: "Please complete window selection.",
  Finish_The_Ongoing_Process_Before_Undo:
    "Please finish the ongoing process before Undo!",
  Add_Door_Window_On_Same_Wall:
    "The door/window remains on the single wall only. Please finish the door/wall where it started.",
  Please_Complete_Window_Door_Selection:
    "Please complete window/door selection.",
  Oops_Some_Error_Occured_Please_Try_Again:
    "Oops! Some error occured. Please try again.",
  Please_Connect_Room_And_Try_To_Add_Door:
    "Please connect room and try to add Door.",
  Please_Add_At_Least_One_Room: "Please add at least one room.",
  Please_Connect_Room_And_Try_To_Add_Window:
    "Please connect room and try to add Window.",
  Please_Wait: "Please Wait...",
};
