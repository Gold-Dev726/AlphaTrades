/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import { useSpeechSynthesis } from "react-speech-kit";
import _ from "lodash";
import * as Yup from "yup";

import Alert from "@mui/material/Alert";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Switch from '@mui/material/Switch';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useFormik, Form, FormikProvider } from "formik";
import { submitContact } from "../../actions/contactAction";
import classnames from "classnames";
import { StartLoading, StopLoading } from "../../actions/UIAction";
import TradingHeader from "../common/TradingHeader";
import PhoneInput from "../common/PhoneInput";
import { validatePhoneWithRequired } from "./../../helpers/validation";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      color: "blue",
    },
  },
};
const models = ["Big Bull V1", "Big Bull V2", "Big Bull V3"];

const Alerts = (props) => {
  const dispatch = useDispatch();

  const [selectedPerformance, setSelectedPerformance] = useState({});
  const [refreshPerformance, setRefreshPerformance] = useState(false);
  const [performanceList, setPerformanceList] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [searchInpValue, setSearchInpValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [modelName, setModelName] = useState([]);
  const [dateFromvalue, setDateFromvalue] = useState([null, null]);
  const [dateTovalue, setDateTovalue] = useState([null, null]);
  const [initialValues, setInitialValues] = useState(null);
  const [phoneNo, setPhoneNo] = useState("");
  const [stateErrors, seterrors] = useState({});
	const [enablePush, setEnablePush] = useState({});
  
	const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setModelName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

	const handleSwitchChange = (event) => {
    const {
      target: { value },
    } = event;

    console.log("handleSwitchChange  -",value);
  };


  const handlePhoneChange = (value) => {
    setPhoneNo(value);
    errors["phoneNo"] = validatePhoneWithRequired(value);
  };

  useEffect(() => {
    console.log("Alerts Do something after initial value changed");

    const initialValues = {
      contactType: "trader",
      name: "",
      subject: "",
      message: "",
    };

    setInitialValues(initialValues);
  }, []);

  const ContactSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: ContactSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        console.log("onSubmit ", values);
        console.log("initialValues ", initialValues);
        props.submitContact(values).then((res) => {
          resetForm({
            values: {
              contactType: "trader",
              name: "",
              subject: "",
              message: "",
            },
          });
        });
      } catch (error) {
        console.error(error);
      }
    },
    onReset: async () => {
      console.log("onReset called");
    },
  });
  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    values,
    handleReset,
  } = formik;

  return (
    <section className="content-wapper models">
      <div className="header-and-trading">
        <h1>Alerts</h1>
      </div>

      <div className="common-panel panel-table-height">
        <div className="panel-body">
          <div className="alert-section">
            <FormikProvider value={formik}>
              <Form
                className="form"
                autoComplete="off"
                noValidate
                onReset={handleReset}
                onSubmit={handleSubmit}
              >
                <div>
                  {errors.afterSubmit && (
                    <Alert severity="error">{errors.afterSubmit}</Alert>
                  )}

                  <div className="alert-row">
                    <div>Alert me for every trading signal from</div>
                    <div className="model-select-box">
                      <Select
                        className="test"
                        IconComponent={""}
                        multiple
                        displayEmpty
                        value={modelName}
                        onChange={handleChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return <span>Model</span>;
                          }
                          return selected.join(", ");
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ "aria-label": "Without label" }}
                        style={{ width: '100%' }}
                      >
                        <MenuItem disabled value="">
                          <span>Model</span>
                        </MenuItem>
                        {models.map((name) => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <div className="alert-row">
                    <div>on my mobile no</div>
                    <div>
                      <PhoneInput
                        country={"us"}
                        name={"phoneNo"}
                        value={phoneNo}
                        onChange={handlePhoneChange}
                        countryCodeEditable={false}
                        onlyCountries={["us"]}
                        enableSearch={false}
                        placeholder={"Enter phone number"}
                      />
                    </div>
                  </div>

                  <div className="alert-row">
                    <div>on my email Id</div>
                    <div>
                      <TextField
                        placeholder="Email"
                        className="email-text-field"
                        fullWidth
                        required
                        type="email"
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </div>
                  </div>

                  <div className="alert-row">
                    <div>and as a push notification</div>
                    <div>
                      <Switch 
											 checked={true}
											onChange={handleSwitchChange}
											 />
                    </div>
                  </div>

                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </FormikProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  console.log("Alerts state we have ", state);
  return {
    job: state.job,
    configurationDetail: _.get(
      state,
      ["callConfiguration", "configurationDetail"],
      {}
    ),
    profile: state.profile,
  };
};

export default connect(mapStateToProps, {
  submitContact,
})(Alerts);
