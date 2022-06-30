import _ from "lodash";

export function hydrateProfileDetails(data) {
  let firstName = _.get(data, ["data", "data", "firstName"], "");
  _.isNull(firstName) && (firstName = "");
  let lastName = _.get(data, ["data", "data", "lastName"], "");
  _.isNull(lastName) && (lastName = "");

  let phoneNumber = _.get(data, ["data", "data", "phoneNumber"], "");
  let countryName = _.get(data, ["data", "data", "countryName"], "");

  // some profile doesn't show country-code-prefix in phone-numbers,
  // because BE returns 10 digit phone-number without country-code.
  if (phoneNumber != null && phoneNumber.length === 10) {
    phoneNumber = "+1" + phoneNumber;
  }

  let profileDetails = {
    address: _.get(data, ["data", "data", "address"], ""),
    city: _.get(data, ["data", "data", "city"], ""),
    countryName: countryName,
    email: _.get(data, ["data", "data", "email"], ""),
    firstName: firstName,
    lastName: lastName,
    licence: _.get(data, ["data", "data", "licence"], ""),
    lender: _.get(data, ["data", "data", "lender"], ""),
    phoneCountryCode: _.get(data, ["data", "data", "phoneCountryCode"], ""),
    phoneNumber: phoneNumber,
    state: _.get(data, ["data", "data", "state"], ""),
    userId: _.get(data, ["data", "data", "userId"], ""),
    userName: _.get(data, ["data", "data", "userName"], ""),
    userRole: _.get(data, ["data", "data", "userRole"], ""),
    zip: _.get(data, ["data", "data", "zip"], ""),
    fullName: `${firstName} ${lastName}`,
  };
  return profileDetails;
}

export function dyHydrateProfile(data) {
  return {
    address: data.address?.trim(),
    city: data.city?.trim(),
    countryName: data.countryName,
    email: data.email,
    firstName: data.firstName?.trim(),
    lastName: data.lastName?.trim(),
    phoneCountryCode: data.phoneCountryCode,
    phoneNumber: data.phoneNumber,
    state: data.state,
    zip: data.zip,
  };
}
