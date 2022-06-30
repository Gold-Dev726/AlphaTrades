import moment from "moment";

export function getUTCToLocalDateTimeWithFormat(dateTime, inputFormat, outputFormat) {
  return moment.utc(dateTime, inputFormat).local().format(outputFormat);
}

export function getCurrentUTCDateTime(inputFormat = "DD/MM/YYYY HH:mm:ss", outputFormat = "YYYY-MM-DD HH:mm:ss") {
  var UTCDateTime = moment.utc(moment(new Date())).format(outputFormat);
  return UTCDateTime;
}

export function getDateDifferenceBetweenTwoDates(dateTime1, dateTime2, inputFormat, unit) {
  var localDate1 = moment(dateTime1, inputFormat);
  var localDate2 = moment(dateTime2, inputFormat);

  var timeDifference = localDate1.diff(localDate2, unit);

  //return Math.abs(timeDifference);
  return timeDifference;
}

export function getLocalToUTCDateTime(dateTime, inputFormat, outputFormat) {
  
  var localDate = moment(dateTime, inputFormat);
  console.log("getLocalToUTCDateTime - localDate -", localDate);

  var UTCDateTime = moment.utc(localDate).format(outputFormat);
  console.log("getLocalToUTCDateTime - UTCDateTime -", localDate);

  return UTCDateTime;
}
