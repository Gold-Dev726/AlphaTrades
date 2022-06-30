import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./index.scss";
import { useTranslation } from "react-i18next";
const CustomPhoneInput = (props) => {
  const { t } = useTranslation();
  const [focused, setFocused] = useState(true);
  const {
    name,
    placeholder,
    value,
    onChange,
    error,
    touched,
    className,
    disabled,
  } = props;
  return (
    <div className="form-group">
      <div className={"inner-form-group"}>
        <PhoneInput
          country={"us"}
          name={name}
          value={value}
          onChange={(value) => {
            onChange("+" + value);
          }}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          inputClass={"form-control"}
          countryCodeEditable={false}
          onlyCountries={["us"]}
          enableSearch={false}
          placeholder={placeholder}
          disabled={disabled || false}
        />
      </div>
      {error && touched && <div className="form-error">{t(error)}</div>}
    </div>
  );
};

export default CustomPhoneInput;
