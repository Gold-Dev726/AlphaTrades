import React from "react";
import { useTranslation } from "react-i18next";
const TextArea = (props) => {
  const { t } = useTranslation();
  const {
    type,
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    touched,
    disabled,
  } = props;

  return (
    <div className="form-group">
      <div className="inner-form-group">
        <textarea
          type={type}
          className="form-control"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
        {props.icon ? props.icon : ""}
      </div>
      {error && touched && <div className="form-error">{t(error)}</div>}
    </div>
  );
};

export default TextArea;
