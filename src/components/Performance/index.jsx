/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback, useReducer } from "react";
import { connect, useDispatch } from "react-redux";
import { useSpeechSynthesis } from "react-speech-kit";
import _ from "lodash";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Pagination from '@mui/material/Pagination';
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Box from "@mui/material/Box";
// import Pagination from "material-ui-flat-pagination";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { getPerformance } from "../../actions/performanceAction";
import { getAllModels } from "../../actions/modelAction";
import classnames from "classnames";
import TextInput from "../common/TextInput";
import Button from "../common/Button";
import { StartLoading, StopLoading } from "../../actions/UIAction";


import TradingHeader from "../common/TradingHeader";
import TradingFilterHeader from "../common/TradingFilterHeader";
import NoDataView from "../common/NoDataView";
import model from "../../reducers/model";

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

const Performance = (props) => {


  console.log("Performance props - ", props);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const tableHead = [
    { key: "timestamp", label: "Timestamp" },
    
    { key: "regression_model_name", label: "Model Name" },
    { key: "pairName", label: "Pair name" },

    {
      key: "signal",
      label: "Signal",
    },
    {
      key: "gain",
      label: "Gain",
    },
  ];


  const [selectedPerformance, setSelectedPerformance] = useState({});
  const [refreshPerformance, setRefreshPerformance] = useState(false);
  // const [performanceList, setPerformanceList] = useState([]);

  const [confirmationModal, setConfirmationModal] = useState(false);
  const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }),
    {
      searchTerm: "",
      dateFromvalue: "",
      dateTovalue: 0,
      modelName: '',
      limit: 10,
      skip: 0,
      refreshPerformance: false,
      totalCount: 0,
      totalPages: 0,
      currentPage: 1,

    });

  const color = "blue";
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setState({ modelName: value });

  };


  useEffect(() => {
    console.log("Performance useEffect only once - ");

    const filter = {
      skip: 0,
      limit: 100,
    };

    props.getAllModels(filter).then((res) => {
      if (res) {

        console.log("Performance getAllModels res  - ", res);

      }
    });

  }, []);




  useEffect(() => {



    const filter = {
      skip: state.skip,
      limit: state.limit,
    };

    if (state.modelName.trim().length > 0) {
      filter.modelName = state.modelName;
    }

    console.log("useEffect to get performance - ", filter);

    props.getPerformance(filter).then((res) => {
      if (res) {
        console.log("props.getPerformance = ", res);
        // setPerformanceList(res.data);
        const count = res.totalCount;
        let totalPage = parseInt((res.totalCount / state.limit));
        if ((res.totalCount % state.limit) !== 0) {
          totalPage += 1;
        }

        setState({ totalPage: totalPage, totalCount: count });

      }
    });
  }, [state.pageNo, state.limit, state.skip, state.modelName]);



  const handlePageSize = (e) => {
    console.log("handlePageSize - ", e);
  };

  const handlePagination = (event, val) => {
    console.log("handlePagination - ", val);


    //page-1 : 10 * 0
    //page-2: 10 *1 = 10
    const skip = state.limit * (val - 1);
    setState({ currentPage: val, skip: skip });



  };


  return (
    <section className="content-wapper models">
      <div className="header-and-trading">
        <h1>Performance</h1>

        <TradingHeader />
      </div>

      <div className="common-panel panel-table-height">
        <div className="panel-body">
          <div className="performance-listing">
            <div className="models-and-date-range">


              <div className="selectbox models-select">
                <span className="title">Select Model</span>
                <div>
                  <Select
                    className="test"
                    IconComponent={''}
                    displayEmpty
                    value={state.modelName}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <span>Model</span>;
                      }
                      return selected;
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                    style={{ width: 300 }}
                  >
                    <MenuItem  value="">
                      <span>All</span>
                    </MenuItem>
                    {props.models.map((model) => (
                      <MenuItem key={model.name} value={model.name}>
                        {model.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>


              <div className="date-range">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    className="date-picker"
                    value={state.dateFromvalue}
                    inputFormat="dd/MM/yyyy"
                    onChange={(newValue) => {

                      setState({ dateFromvalue: newValue });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>

                <span>To</span>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={state.dateTovalue}
                    inputFormat="dd/MM/yyyy"
                    onChange={(newValue) => {
                      setState({ dateTovalue: newValue });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
            </div>

            {props.totalCount !== 0 ? (

              <div className="table-and-paginator">




                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {tableHead.map((head, key) =>
                          head.key === "jobOrderAssignee" ? (
                            <TableCell style={{ width: head.width }} key={key}>
                              <div>{head.label.split("\n")[0]}</div>
                              <div style={{ fontWeight: "normal" }}>{head.label.split("\n")[1]}</div>
                            </TableCell>
                          ) : (
                            <TableCell style={{ width: head.width }} key={key}>
                              {head.label}
                            </TableCell>
                          )
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.performanceList && props.performanceList.map((d, id) => {
                        console.log("id we get - ", d);
                        return (
                          <TableRow key={id}>
                            <TableCell scope="row">{d.timestamp}</TableCell>
                            <TableCell>{d.regression_model_name?d.regression_model_name:""}</TableCell>
                            <TableCell>{d.pairName}</TableCell>
                            <TableCell>{d.predict >= d.comment_predict_buy_thresh ? "Buy" : "Sell"}</TableCell>
                            <TableCell>{"- NA -"}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>

                <div className="pagination-wrapper">

                  <Pagination
                    page={state.currentPage}
                    count={state.totalPage}
                    onChange={handlePagination}
                    variant="outlined"
                    shape="rounded" />

                </div>



              </div>




            ) : (
              <div className="no-data-found-container">
                <NoDataView text={'No data available'} icon={""} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  console.log("performance - state - ", state);
  return {
    models: state.model.models ? state.model.models : [],
    totalCount: state.performance.totalCount ? state.performance.totalCount : 0,
    performanceList: state.performance.performances ? state.performance.performances : [],
  };
};

export default connect(mapStateToProps, {
  getPerformance,
  getAllModels,

})(Performance);
