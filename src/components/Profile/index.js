import React, { useState, useEffect } from "react";
import "./index.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../common/TextInput";
import Button from "../common/Button";
import { connect } from "react-redux";
import {
  fetchProfileDetails,
  updateProfileDetails,
} from "../../actions/profileAction";
import _ from "lodash";
import { Link } from "react-router-dom";
import { profileMessages } from "../../constants/validationerrorMessages";
import { countries, states } from "../../constants/enums";
import { customToast } from "../../helpers/customToast";
import { UNEXPECTED_ERROR_MESSAGE } from "../../constants/commonMessages";
import CustomFormikPhoneInput from "../common/CustomFormikPhoneInput";
import { dark } from "@material-ui/core/styles/createPalette";
import { useTranslation } from "react-i18next";
import { ROLE } from "../../constants/appConstant";

const AppraiserProfile = (props) => {
  const appraiserValidationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("ERROR_MESSAGES.profileMessages.firstnameRequired")
      .nullable()
      .matches(
        /^[a-zA-Z ]{2,30}$/,
        "ERROR_MESSAGES.profileMessages.firstnameValid"
      ),
    lastName: Yup.string()
      .required("ERROR_MESSAGES.profileMessages.lastnameRequired")
      .nullable()
      .matches(
        /^[a-zA-Z ]{2,30}$/,
        "ERROR_MESSAGES.profileMessages.lastnameValid"
      ),
    email: Yup.string()
      .email("ERROR_MESSAGES.profileMessages.emailIDValid")
      .required("ERROR_MESSAGES.profileMessages.emailIDRequired")
      .nullable(),
    phoneNumber: Yup.string()
      .required("ERROR_MESSAGES.profileMessages.numberRequired")
      .nullable()
      .matches(
        /^\+[1-9]{1}[0-9]{10}$/,
        "ERROR_MESSAGES.profileMessages.numberMaxLength"
      ),
    address: Yup.string()
      .required("ERROR_MESSAGES.profileMessages.address")
      .nullable(),
    city: Yup.string()
      .required("ERROR_MESSAGES.profileMessages.city")
      .nullable(),
    state: Yup.string()
      .required("ERROR_MESSAGES.profileMessages.state")
      .nullable(),
    countryName: Yup.string()
      .required("ERROR_MESSAGES.profileMessages.countryName")
      .nullable(),
    zip: Yup.string()
      .required("ERROR_MESSAGES.profileMessages.zip")
      .nullable()
      .matches(
        /^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] ?\d[A-Z]\d)$/,
        "ERROR_MESSAGES.profileMessages.zipValid"
      ),
  });
  const technicianValidationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("ERROR_MESSAGES.profileMessages.firstnameRequired")
      .nullable()
      .matches(
        /^[a-zA-Z ]{2,30}$/,
        "ERROR_MESSAGES.profileMessages.firstnameValid"
      ),
    lastName: Yup.string()
      .required("ERROR_MESSAGES.profileMessages.lastnameRequired")
      .nullable()
      .matches(
        /^[a-zA-Z ]{2,30}$/,
        "ERROR_MESSAGES.profileMessages.lastnameValid"
      ),
    email: Yup.string()
      .email("ERROR_MESSAGES.profileMessages.emailIDValid")
      .required("ERROR_MESSAGES.profileMessages.emailIDRequired")
      .nullable(),
    phoneNumber: Yup.string()
      .required("ERROR_MESSAGES.profileMessages.numberRequired")
      .nullable()
      .matches(
        /^\+[1-9]{1}[0-9]{10}$/,
        "ERROR_MESSAGES.profileMessages.numberMaxLength"
      ),
  });
  const [userProfileDetails, setUserProfileDetails] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    countryName: "",
    state: "",
    city: "",
    zip: "",
    address: "",
  });
  const { t } = useTranslation();
  useEffect(() => {
    if (_.isNil(props.profile.fetchProfileDetailsSuccess?.userId)) {
      props
        .fetchProfileDetails()
        .then((data) => {
          if (data) {
            setUserProfileDetails(data);
          }
        })
        .catch((err) => {
          customToast.error(UNEXPECTED_ERROR_MESSAGE);
        });
    } else {
      setUserProfileDetails(props.profile.fetchProfileDetailsSuccess);
    }
  }, []);
  const isAppraiser = userProfileDetails.userRole === ROLE.APPRAISER;
  return (
    <Formik
      enableReinitialize
      validateOnMount
      initialValues={{
        firstName: userProfileDetails.firstName,
        lastName: userProfileDetails.lastName,
        phoneNumber: userProfileDetails.phoneNumber,
        email: userProfileDetails.email,
        countryName: userProfileDetails.countryName,
        state: userProfileDetails.state,
        city: userProfileDetails.city,
        zip: userProfileDetails.zip,
        address: userProfileDetails.address,
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        props
          .updateProfileDetails(values)
          .then((res) => {
            setSubmitting(false);
            props
              .fetchProfileDetails()
              .then((data) => {
                if (data) {
                  setUserProfileDetails(data);
                }
              })
              .catch((err) => {
                customToast.error(UNEXPECTED_ERROR_MESSAGE);
              });
          })
          .catch(() => {
            setSubmitting(false);
          });
      }}
      validationSchema={
        isAppraiser ? appraiserValidationSchema : technicianValidationSchema
      }
    >
      {(props) => {
        const {
          values,
          dirty,
          isValid,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          setTouched,
        } = props;
        values.countryName = "USA";

        return (
          <form onSubmit={handleSubmit}>
            <section className="content-wapper">
              <div className="breadcrumb">
                <ul>
                  <li>{t("WEB_LABELS.Profile")}</li>
                </ul>
              </div>
              <div className="common-panel">
                <div className="panel-body profile-appraiser">
                  <div className="vrow">
                    <div className="vcol-4">
                      <div className="form-group">
                        <label>
                          {t("WEB_LABELS.First_Name")}
                          <span className="error-mark">*</span>
                        </label>
                        <TextInput
                          className="form-control"
                          type="text"
                          name="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          error={errors.firstName}
                          touched={touched.firstName}
                          onBlur={handleBlur}
                          placeholder={t("WEB_LABELS.First_Name")}
                          disabled={userProfileDetails.lender !== "VSITE"}
                        />
                      </div>
                    </div>
                    <div className="vcol-4">
                      <div className="form-group">
                        <label>
                          {t("WEB_LABELS.Last_Name")}{" "}
                          <span className="error-mark">*</span>
                        </label>
                        <TextInput
                          className="form-control"
                          type="text"
                          name="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          error={errors.lastName}
                          touched={touched.lastName}
                          onBlur={handleBlur}
                          placeholder={t("WEB_LABELS.Last_Name")}
                          disabled={userProfileDetails.lender !== "VSITE"}
                        />
                      </div>
                    </div>
                    <div className="vcol-4">
                      <div className="form-group">
                        <label>
                          {t("WEB_LABELS.Email")}{" "}
                          <span className="error-mark">*</span>
                        </label>
                        <TextInput
                          className="form-control"
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          error={errors.email}
                          touched={touched.email}
                          onBlur={handleBlur}
                          placeholder={t("WEB_LABELS.Email")}
                          disabled={userProfileDetails.lender !== "VSITE"}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="vrow">
                    <div className="vcol-4">
                      <div className="form-group">
                        <label>
                          {t("WEB_LABELS.Cell_Phone")}{" "}
                          <span className="error-mark">*</span>
                        </label>
                        <CustomFormikPhoneInput
                          as="TextInput"
                          country="us"
                          name="phoneNumber"
                          value={values.phoneNumber}
                          onChange={handleChange}
                          countryCodeEditable={false}
                          onlyCountries={["us"]}
                          enableSearch={false}
                          placeholder={t("WEB_LABELS.Cell_Phone")}
                          errors={errors}
                          touched={touched}
                          onBlur={handleBlur}
                          disabled={userProfileDetails.lender !== "VSITE"}
                          setFieldValue={setFieldValue}
                          setTouched={setTouched}
                        />
                      </div>
                    </div>
                    <div className="vcol-4">
                      <div className="form-group">
                        <label>
                          {t("WEB_LABELS.Address")}{" "}
                          {isAppraiser && <span className="error-mark">*</span>}
                        </label>
                        <TextInput
                          className="form-control"
                          type="text"
                          name="address"
                          value={values.address}
                          onChange={handleChange}
                          error={errors.address}
                          touched={touched.address}
                          onBlur={handleBlur}
                          placeholder={t("WEB_LABELS.Address")}
                          disabled={userProfileDetails.lender !== "VSITE"}
                        />
                      </div>
                    </div>
                    <div className="vcol-4">
                      <div className="form-group">
                        <label>
                          {t("WEB_LABELS.City")}{" "}
                          {isAppraiser && <span className="error-mark">*</span>}
                        </label>
                        <TextInput
                          className="form-control"
                          type="text"
                          name="city"
                          value={values.city}
                          onChange={handleChange}
                          error={errors.city}
                          touched={touched.city}
                          onBlur={handleBlur}
                          placeholder={t("WEB_LABELS.City")}
                          disabled={userProfileDetails.lender !== "VSITE"}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="vrow">
                    <div className="vcol-4">
                      <div className="form-group">
                        <label>
                          {t("WEB_LABELS.State")}{" "}
                          {isAppraiser && <span className="error-mark">*</span>}
                        </label>
                        <select
                          className="form-control"
                          name="state"
                          placeholder={t("WEB_LABELS.State")}
                          value={values.state}
                          onChange={handleChange}
                          error={errors.state}
                          touched={touched.state}
                          onBlur={handleBlur}
                          disabled={userProfileDetails.lender !== "VSITE"}
                        >
                          <option value="">Select State</option>
                          {states.map(({ id, name }, index) => (
                            <option value={id}>{name}</option>
                          ))}
                        </select>
                        {touched.state && errors.state && (
                          <div className="form-error">{t(errors.state)}</div>
                        )}
                      </div>
                    </div>
                    <div className="vcol-4">
                      <div className="form-group">
                        <label>
                          {t("WEB_LABELS.Country")}{" "}
                          {isAppraiser && <span className="error-mark">*</span>}
                        </label>
                        <select
                          className="form-control"
                          name="countryName"
                          placeholder={t("WEB_LABELS.Country")}
                          value={values.countryName}
                          onChange={handleChange}
                          error={errors.countryName}
                          touched={touched.countryName}
                          onBlur={handleBlur}
                          disabled={userProfileDetails.lender !== "VSITE"}
                        >
                          <option value="">Select Country</option>
                          {countries.map(({ id, name }, index) => (
                            <option value={id}>{name}</option>
                          ))}
                        </select>
                        {touched.propertyState && errors.countryName && (
                          <div className="form-error">
                            {t(errors.countryName)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="vcol-4">
                      <div className="form-group">
                        <label>
                          {t("WEB_LABELS.Zip_Code")}{" "}
                          {isAppraiser && <span className="error-mark">*</span>}
                        </label>
                        <TextInput
                          className="form-control"
                          type="text"
                          name="zip"
                          value={values.zip}
                          onChange={handleChange}
                          error={errors.zip}
                          touched={touched.zip}
                          onBlur={handleBlur}
                          placeholder={t("WEB_LABELS.Zip_Code")}
                          disabled={userProfileDetails.lender !== "VSITE"}
                        />
                      </div>
                    </div>
                  </div>

                  {userProfileDetails.lender === "VSITE" && (
                    <div className="vrow">
                      <div className="vcol-12">
                        <div className="password-btn">
                          <Link
                            to="/profile/change-password"
                            style={{
                              display: "inline-block",
                              textDecoration: "none",
                              cursor: "pointer",
                            }}
                          >
                            <Button type="button" className="blue-btn">
                              <i className="icon-change-password"></i>
                              {t("BUTTONS.Change_Password")}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {userProfileDetails.lender === "VSITE" && (
                  <div className="panel-footer right-side">
                    <Button
                      type="submit"
                      className="blue-btn"
                      disabled={isSubmitting || !(isValid && dirty)}
                    >
                      {t("BUTTONS.Save")}{" "}
                      {isSubmitting && <div className="loader-spin"></div>}
                    </Button>
                  </div>
                )}
              </div>
            </section>
          </form>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, {
  fetchProfileDetails,
  updateProfileDetails,
})(AppraiserProfile);
