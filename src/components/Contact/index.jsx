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
import { useFormik, Form, FormikProvider } from "formik";
import TextField from "@mui/material/TextField";

import { submitContact } from "../../actions/contactAction";
import classnames from "classnames";
import { StartLoading, StopLoading } from "../../actions/UIAction";
import TradingHeader from "../common/TradingHeader";

const Contact = (props) => {
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

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
  };

  useEffect(() => {
    console.log("Do something after initial value changed");

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
            values: { contactType: "trader", name: "", subject: "", message: "" },
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
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values,handleReset } = formik;

  return (
    <section className="content-wapper models">
      <div className="header-and-trading">
        <h1>Contact</h1>
      </div>

      <div className="common-panel panel-table-height">
        <div className="panel-body">
          <div className="contact-section">
            <FormikProvider value={formik}>
              <Form className="form" autoComplete="off" noValidate onReset={handleReset} onSubmit={handleSubmit}>
                <div>
                  {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

                  <div>
                    <div>Whether you are trader or ML expert?</div>
                    <div className="trader-ml-exp-radio-group">
                      <RadioGroup aria-labelledby="contactType" defaultValue="trader" name="contactType">
                        <div className="trader">
                          <Radio checked={values && values.contactType=="trader"?true:false}  {...getFieldProps("contactType")} className="trader-expert-radio" value="trader" name="contactType" />
                          <span className="title">Trader</span>
                        </div>
                        <div className="mlexpert">
                          <Radio checked={values && values.contactType=="ml-expert"?true:false} {...getFieldProps("contactType")} className="trader-expert-radio" value="ml-expert" name="contactType" />
                          <span className="title">ML Expert</span>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <TextField placeholder="Name" className="contact-text-field" fullWidth required type="text" {...getFieldProps("name")} error={Boolean(touched.name && errors.name)} helperText={touched.name && errors.name} />

                  <TextField placeholder="Subject" className="contact-text-field" fullWidth required type="text" {...getFieldProps("subject")} error={Boolean(touched.subject && errors.subject)} helperText={touched.subject && errors.subject} />

                  <TextField placeholder="Message" className="contact-text-field" fullWidth multiline required type="text" maxRows={4} rows={4} {...getFieldProps("message")} error={Boolean(touched.message && errors.message)} helperText={touched.message && errors.message} />

                  <Button fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
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
  console.log("Contact state we have ", state);
  return {
    job: state.job,
    configurationDetail: _.get(state, ["callConfiguration", "configurationDetail"], {}),
    profile: state.profile,
  };
};

export default connect(mapStateToProps, {
  submitContact,
})(Contact);
