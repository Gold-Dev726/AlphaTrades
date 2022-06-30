import _ from "lodash";
import moment from "moment";
export function placholderFunction() {}

export function getWindowLocation() {
  return window.location.protocol + "//" + window.location.host;
}

export const getDateString = (date) => {
  if (date.from !== null && date.to !== null) {
    const fromDay =
      date.from.day < 10 ? `0${date.from.day}` : `${date.from.day}`;
    const toDay = date.to.day < 10 ? `0${date.to.day}` : `${date.to.day}`;
    const fromMonth =
      date.from.month < 10 ? `0${date.from.month}` : `${date.from.month}`;
    const toMonth =
      date.to.month < 10 ? `0${date.to.month}` : `${date.to.month}`;
    const dateStr = `${fromMonth}/${fromDay}/${date.from.year} - ${toMonth}/${toDay}/${date.to.year}`;
    return dateStr;
  }
  return "";
};

export const isNotEmpty = (value) => {
  return !_.isNil(value) && !_.isEmpty(value);
};

export const TimePickerOptions = [
  { key: "12:00 AM", value: "12:00 AM" },
  { key: "12:30 AM", value: "12:30 AM" },
  { key: "1:00 AM", value: "1:00 AM" },
  { key: "1:30 AM", value: "1:30 AM" },
  { key: "2:00 AM", value: "2:00 AM" },
  { key: "2:30 AM", value: "2:30 AM" },
  { key: "3:00 AM", value: "3:00 AM" },
  { key: "3:30 AM", value: "3:30 AM" },
  { key: "4:00 AM", value: "4:00 AM" },
  { key: "4:30 AM", value: "4:30 AM" },
  { key: "5:00 AM", value: "5:00 AM" },
  { key: "5:30 AM", value: "5:30 AM" },
  { key: "6:00 AM", value: "6:00 AM" },
  { key: "6:30 AM", value: "6:30 AM" },
  { key: "7:00 AM", value: "7:00 AM" },
  { key: "7:30 AM", value: "7:30 AM" },
  { key: "8:00 AM", value: "8:00 AM" },
  { key: "8:30 AM", value: "8:30 AM" },
  { key: "9:00 AM", value: "9:00 AM" },
  { key: "9:30 AM", value: "9:30 AM" },
  { key: "10:00 AM", value: "10:00 AM" },
  { key: "10:30 AM", value: "10:30 AM" },
  { key: "11:00 AM", value: "11:00 AM" },
  { key: "11:30 AM", value: "11:30 AM" },
  { key: "12:00 PM", value: "12:00 PM" },
  { key: "12:30 PM", value: "12:30 PM" },
  { key: "1:00 PM", value: "1:00 PM" },
  { key: "1:30 PM", value: "1:30 PM" },
  { key: "2:00 PM", value: "2:00 PM" },
  { key: "2:30 PM", value: "2:30 PM" },
  { key: "3:00 PM", value: "3:00 PM" },
  { key: "3:30 PM", value: "3:30 PM" },
  { key: "4:00 PM", value: "4:00 PM" },
  { key: "4:30 PM", value: "4:30 PM" },
  { key: "5:00 PM", value: "5:00 PM" },
  { key: "5:30 PM", value: "5:30 PM" },
  { key: "6:00 PM", value: "6:00 PM" },
  { key: "6:30 PM", value: "6:30 PM" },
  { key: "7:00 PM", value: "7:00 PM" },
  { key: "7:30 PM", value: "7:30 PM" },
  { key: "8:00 PM", value: "8:00 PM" },
  { key: "8:30 PM", value: "8:30 PM" },
  { key: "9:00 PM", value: "9:00 PM" },
  { key: "9:30 PM", value: "9:30 PM" },
  { key: "10:00PM", value: "10:00 PM" },
  { key: "10:30PM", value: "10:30 PM" },
  { key: "11:00PM", value: "11:00 PM" },
  { key: "11:30PM", value: "11:30 PM" },
];

export const isUTCDateInBetween = (utcStartDate, utcEndDate) => {
  let cd = moment.utc().format("YYYY-MM-DD HH:mm:ss");
  let mcd = moment(cd, "YYYY-MM-DD HH:mm:ss").utc();
  let md2 = moment(utcStartDate, "YYYY-MM-DD HH:mm:ss").utc();
  let md3 = moment(utcEndDate, "YYYY-MM-DD HH:mm:ss").utc();
  mcd.isBetween(md2, md3);

  return mcd.isBetween(md2, md3);
};

export const getFileFormData = (data, name, extraFields) => {
  const formData = new FormData();
  formData.append("file", data, name);
  if (extraFields) {
    _(extraFields).forOwn((value, key) => {
      if (key && value) formData.append(key, value);
    });
  }
  return formData;
};

export const formatPhoneNumber = (phoneNumber) => {
  if (phoneNumber && phoneNumber != "--") {
    return (
      phoneNumber.substring(0, 2) +
      " (" +
      phoneNumber.substring(2, 5) +
      ") " +
      phoneNumber.substring(5, 8) +
      "-" +
      phoneNumber.substring(8, 12)
    );
  }
  return "--";
};
