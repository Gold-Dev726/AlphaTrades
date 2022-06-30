import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchProfileDetails } from "../actions/profileAction";
import authenticationService from "../services/authenticationService";

const useFetchProfile = () => {
  const token = authenticationService.getToken();
  const history = useHistory();
  const fetchProfileDetailsSuccess = useSelector(
    (state) => state.profile?.fetchProfileDetailsSuccess
  );
  const fetchProfileDetailsStart = useSelector(
    (state) => state.profile?.fetchProfileDetailsStart
  );
  const fetchProfileDetailsError = useSelector(
    (state) => state.profile?.fetchProfileDetailsError
  );
  const disptach = useDispatch();
  useEffect(() => {
    if (token && !fetchProfileDetailsSuccess?.userId) {
      disptach(fetchProfileDetails(history));
    }
  }, []);

  return {
    loading: token ? fetchProfileDetailsStart : false,
    data: fetchProfileDetailsSuccess,
    error: fetchProfileDetailsError,
  };
};
export default useFetchProfile;
