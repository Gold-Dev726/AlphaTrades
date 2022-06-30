import React from "react";
import { useTranslation } from "react-i18next";
const NoDataView = (props) => {
  const { t } = useTranslation();
  return (
    <div className="no-data-found">
      <div className="box">
        <i className={props.icon}></i>
        <p>{`${t("COMMON_MESSAGES.JOB_ORDER_DETAILS.There_is_No")} ${
          props.text
        } ${t("COMMON_MESSAGES.JOB_ORDER_DETAILS.Available")}`}</p>
      </div>
    </div>
  );
};

export default NoDataView;
