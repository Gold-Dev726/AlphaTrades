import { AppURLs } from "../../../constants/appConstant";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { get } from "lodash";
import { connect, useDispatch } from "react-redux";
import { StopErrorModal } from "../../../actions/errorPopUpAction";
import "./index.scss";
const contactUsUrl = process.env.REACT_APP_RV_CONTACT_US;
const DisplayErrorModal = (props) => {
  const { t } = useTranslation();
  const [errorPayload, setErrorPayload] = useState(null);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const contactUs = () => {
    return contactUsUrl;
  };
  useEffect(() => {
    setErrorPayload(props.errorPayload);
  }, [props.errorPayload]);
  const showDetails = () => {
    setShowError(true);
  };
  return (
    <>
      <div className="error-popup open ">
        <div className="error-info">
          <div className="content">
            <p className="font-18">
              <b>{t("ERROR_MESSAGES.error")}</b>
            </p>
            <p>{t("ERROR_MESSAGES.support_popup_msg")}</p>
          </div>
          <div className="bottom-btn">
            <a
              class="blue-btn"
              href={contactUs()}
              target="_blank"
              className="blue-btn"
              style={{ textDecoration: "none" }}
            >
              {t("ERROR_MESSAGES.contact_us")}
            </a>
            &nbsp;
            <button
              class="blue-btn"
              onClick={() => showDetails()}
              className="blue-btn"
            >
              {t("BUTTONS.Details")}
            </button>
            &nbsp;
            {props.isErrorBoundary ? (
              <button
                class="blue-btn"
                onClick={() => {
                  window.location.reload();
                }}
                className="blue-btn"
              >
                {t("BUTTONS.Reload")}
              </button>
            ) : (
              get(errorPayload, ["errorCode"]) != 401 && (
                <button
                  class="blue-btn"
                  onClick={() => {
                    dispatch(StopErrorModal());
                  }}
                  className="blue-btn"
                >
                  {t("BUTTONS.Cancel")}
                </button>
              )
            )}
          </div>
          <br />
          {showError && (
            <div class="content">
              <p>
                <b>
                  {" "}
                  {t("WEB_LABELS.Error_code")}: {get(errorPayload, "errorCode")}
                </b>
              </p>
              <p>
                {t("WEB_LABELS.Error_reason")}:{" "}
                {get(errorPayload, "errorReason")}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    errorPayload: get(state, ["errorReducer", "errorPayload"]),
  };
};

export default connect(mapStateToProps, {})(DisplayErrorModal);
