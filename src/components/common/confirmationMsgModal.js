import React from "react";
import _ from "lodash";
import moment from "moment";
import Button from "../common/Button";
import { callTypes } from "../../constants/appConstant";
import { useTranslation } from "react-i18next";
const ConfirmationMsgModal = (props) => {
  const { t } = useTranslation();
  const cancelBtnClick = () => {
    props.handleCancelAppointment();
    props.handleConfirmationModal();
  };

  const joinCall = () => {
    let callURL;
    if (props.from == "JobOrder") {
      if (props.callType == callTypes.QUICK_CALL) {
        callURL = _.get(props, ["selectedJobOrder", "quickCallUrl"], "");
      } else {
        callURL = _.get(
          props,
          ["selectedJobOrder", "jobOrderAppointment", "callUrl"],
          ""
        );
      }
    } else {
      callURL = _.get(props, ["appointmentDetails", "callUrl"], "");
    }
    callURL && window.open(callURL, "_blank");
    props.handleCancelAppointment();
  };

  return (
    <div className="center-modal appointment-info-modal open">
      <div className="inner-modal">
        <div className="modal-head">
          {props.eventAction != "Join" && (
            <h4>
              {props.eventAction == "Join" && t("BUTTONS.Join")}
              {props.eventAction == "Cancel" && t("BUTTONS.Cancel")}{" "}
              {t("WEB_LABELS.Appointment")}
            </h4>
          )}
          {props.eventAction == "Join" && props.from == "calendar" && (
            <h4>{t("WEB_LABELS.Appointment_Details")}</h4>
          )}
          {props.eventAction == "Join" && props.from == "JobOrder" && (
            <h4>{t("WEB_LABELS.Job_Order_Details")}</h4>
          )}
          <button
            onClick={props.handleCancelAppointment}
            className="close-modal"
          >
            <i className="icon-close-image"></i>
          </button>
        </div>
        <div className="modal-body">
          {(props.eventAction == "Cancel" || props.eventAction == "Join") && (
            <ul className="list">
              <li>
                <strong>{t("WEB_LABELS.Name")}:</strong>{" "}
                {props.callType == callTypes.QUICK_CALL
                  ? _.get(props, ["selectedJobOrder", "name"], "--")
                  : props.from == "calendar"
                  ? _.get(
                      props,
                      ["appointmentDetails", "propertyOwnerName"],
                      "--"
                    )
                  : _.get(
                      props,
                      [
                        "selectedJobOrder",
                        "jobOrderAppointment",
                        "propertyOwnerName",
                      ],
                      "--"
                    )}
              </li>
              <li>
                <strong>{t("WEB_LABELS.Address")}:</strong>{" "}
                {props.callType == callTypes.QUICK_CALL
                  ? _.get(props, ["selectedJobOrder", "address"], "--")
                  : props.from == "calendar"
                  ? _.get(props, ["appointmentDetails", "address"], "--")
                  : _.get(
                      props,
                      ["selectedJobOrder", "jobOrderAppointment", "address"],
                      "--"
                    )}
              </li>
              {!_.isNil(
                _.get(
                  props,
                  ["selectedJobOrder", "jobOrderAppointment", "emailId"],
                  ""
                )
              ) && (
                <li>
                  <strong>{t("WEB_LABELS.Email")}:</strong>{" "}
                  {props.callType == callTypes.QUICK_CALL
                    ? _.get(props, ["selectedJobOrder", "email"], "--")
                    : props.from == "calendar"
                    ? _.get(props, ["appointmentDetails", "emailId"], "--")
                    : _.get(
                        props,
                        ["selectedJobOrder", "jobOrderAppointment", "emailId"],
                        "--"
                      )}
                </li>
              )}
              {!_.isNil(
                _.get(
                  props,
                  ["selectedJobOrder", "jobOrderAppointment", "phoneNumber"],
                  ""
                )
              ) && (
                <li>
                  <strong>{t("WEB_LABELS.Cell_Phone")}:</strong>{" "}
                  {props.callType == callTypes.QUICK_CALL
                    ? _.get(props, ["selectedJobOrder", "phone"], "--")
                    : props.from == "calendar"
                    ? _.get(props, ["appointmentDetails", "phoneNumber"], "--")
                    : _.get(
                        props,
                        [
                          "selectedJobOrder",
                          "jobOrderAppointment",
                          "phoneNumber",
                        ],
                        ""
                      )}
                </li>
              )}
              <li>
                {props.from == "calendar" && (
                  <strong>{t("WEB_LABELS.Appointment_Details")}:</strong>
                )}
                {props.from == "JobOrder" && (
                  <strong>{t("WEB_LABELS.Call_Details")}:</strong>
                )}{" "}
                {props.callType == callTypes.QUICK_CALL
                  ? props.selectedJobOrder.formatedCallStartDate
                  : props.from == "calendar"
                  ? _.get(props, ["callStartTime"], "--")
                  : moment
                      .utc(
                        _.get(
                          props,
                          [
                            "selectedJobOrder",
                            "jobOrderAppointment",
                            "sloteDateStartTime",
                          ],
                          ""
                        )
                      )
                      .local()
                      .format("MM/DD/YYYY hh:mm A")}
              </li>
            </ul>
          )}
          {props.eventAction != "Join" && (
            <textarea
              className="form-control"
              rows="2"
              placeholder={`${
                props.eventAction == "Join"
                  ? t("BUTTONS.Join")
                  : props.eventAction == "Cancel"
                  ? t("BUTTONS.Cancel")
                  : ""
              } ${t("WEB_LABELS.Reason_Optional")}`}
              onChange={(event) => props.setReason(event.target.value)}
            ></textarea>
          )}
        </div>
        <div className="modal-footer text-right">
          {props.eventAction != "Join" && (
            <Button onClick={() => cancelBtnClick()} className="blue-btn">
              {props.eventAction == "Join" && t("BUTTONS.Join")}
              {props.eventAction == "Cancel" && t("BUTTONS.Cancel")}{" "}
              {t("WEB_LABELS.Appointment")}
            </Button>
          )}
          {props.eventAction == "Join" && (
            <Button onClick={() => joinCall()} className="green-btn">
              {props.eventAction == "Join" && t("BUTTONS.Join")}
              {props.eventAction == "Cancel" && t("BUTTONS.Cancel")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationMsgModal;
