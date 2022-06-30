import React from "react";
import "./index.scss";
import notFound from "./../../images/403.png";
import { useTranslation } from "react-i18next";
const ErrorPage = (props) => {
  const { t } = useTranslation();
  return (
    <section className="callend-pagenot-found">
      <div className="box-center">
        <div className="notfound-img">
          <img src={notFound} alt="" />
        </div>
        <div className="content">
          <b>
            {t(
              "WEB_LABELS.You_are_not_authorized_to_access_this_page_Please_try_again"
            )}
          </b>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
