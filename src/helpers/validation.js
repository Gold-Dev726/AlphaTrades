import {
  PHONE_NO_IS_REQUIRED,
  PHONE_NO_IS_INVALID,
  EMAIL_IS_REQUIRED,
  EMAIL_IS_INVALID,
} from "../constants/validationerrorMessages";
import { isValidPhoneNumber } from "libphonenumber-js";
import i18n from "i18next";
export function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function parseNullItem(data) {
  data = { ...data };
  Object.keys(data).map((key) => {
    if (data[key] === null || data[key] === "null") {
      delete data[key];
    }
    return null;
  });
  return data;
}

export function isPhoneValid(phone) {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im.test(
    phone
  );
}

export function isURLValid(url) {
  return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi.test(
    url
  );
}

export function validateRequired(text) {
  if (!isNaN(text)) {
    text = text.toString();
  }
  if (text.trim() === "") {
    return i18n.t("ERROR_MESSAGES.This_field_is_required");
  }
  return false;
}

export function validatePhoneWithRequired(text) {
  if (text != undefined) {
    if (text.trim() === "") {
      return i18n.t("ERROR_MESSAGES.PHONE_NO_IS_REQUIRED");
    } else {
      if (!isValidPhoneNumber(text, "US")) {
        return i18n.t("ERROR_MESSAGES.PHONE_NO_IS_INVALID");
      }
    }
  } else {
    return i18n.t("ERROR_MESSAGES.PHONE_NO_IS_REQUIRED");
  }
  return false;
}

export function validateNameWithRequired(text) {
  if (text != undefined) {
    let pattern = /^[A-Za-z\s]+$/;
    if (text.trim() === "") {
      return i18n.t("ERROR_MESSAGES.Please_enter_your_name");
    } else if (!pattern.test(text)) {
      return i18n.t("ERROR_MESSAGES.Please_enter_valid_name");
    }
  } else {
    return i18n.t("ERROR_MESSAGES.Please_enter_your_name");
  }
  return false;
}

export function validateTextWithRequired(text) {
  if (text != undefined) {
    let pattern = /^[A-Za-z\s]+$/;
    if (text.trim() === "") {
      return i18n.t("ERROR_MESSAGES.This_field_is_required");
    } else if (!pattern.test(text)) {
      return i18n.t("ERROR_MESSAGES.Invalid_Text");
    }
  } else {
    return i18n.t("ERROR_MESSAGES.This_field_is_required");
  }
  return false;
}

export function validateEmailWithRequired(text) {
  if (text != undefined) {
    if (text.trim() === "") {
      return i18n.t("ERROR_MESSAGES.EMAIL_IS_REQUIRED");
    } else {
      if (!isEmailValid(text)) {
        return i18n.t("ERROR_MESSAGES.EMAIL_IS_INVALID");
      }
    }
  }
  return false;
}

export function validateInvitationTypeTab(obj) {
  if (!(obj.sms || obj.email)) {
    return i18n.t("ERROR_MESSAGES.Select_atleast_one_checkbox");
  }
  return false;
}
