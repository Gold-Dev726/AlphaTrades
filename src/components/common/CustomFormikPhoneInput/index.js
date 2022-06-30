import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { getIn, useField } from "formik";
import { useTranslation } from "react-i18next";
import "react-phone-input-2/lib/style.css";
import "./index.scss";

const CustomFormikPhoneInput = (props) => {
  const { t } = useTranslation();
  const [focused, setFocused] = useState(true);
  const [field] = useField(props);

  const {
    name,
    placeholder,
    value,
    onChange,
    errors,
    touched,
    className,
    disabled,
    onBlur,
    setFieldValue,
    setTouched,
  } = props;

  const isError = getIn(touched, name) && getIn(errors, name);
  const handleInputBlur = (e) => {
    setFocused(false);
    onBlur(e);
    setTouched({ ...touched, [field.name]: true });
  };

  const handleInputFocus = () => setFocused(true);

  const onValueChange = (phoneNumber) => {
    setFieldValue(name, phoneNumber);

    if (onChange !== null) {
      onChange(phoneNumber);
    }
  };

  return (
    <div className="form-group">
      <div className={"inner-form-group"}>
        <PhoneInput
          country={"us"}
          name={name}
          value={value}
          onChange={(value) => {
            onValueChange("+" + value);
          }}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          inputClass={"form-control"}
          countryCodeEditable={false}
          onlyCountries={["us"]}
          enableSearch={false}
          placeholder={placeholder}
          disabled={disabled || false}
        />
      </div>
      {isError && <div className="form-error">{t(getIn(errors, name))}</div>}
    </div>
  );
};

export default CustomFormikPhoneInput;
