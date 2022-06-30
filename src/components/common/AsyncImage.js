import { useEffect, useState } from "react";
import axios from "axios";
import { addCachedCapturedImage } from "../../actions/cachedCapturedImageAction";
import { connect } from "react-redux";
import rateLimit from "axios-rate-limit";
import AuthenticationService from "../../services/authenticationService.js";

const _axios = rateLimit(axios.create(), {
  maxRequests: 5,
  perMilliseconds: 1000,
});

const AsyncImage = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    if (
      props.cachedCapturedImages[props.imageUrl] === undefined &&
      !isFetching
    ) {
      setIsFetching(true);
      _axios
        .get(props.imageUrl, {
          headers: {
            Authorization: "Bearer " + AuthenticationService.getToken(),
          },
          responseType: "blob",
        })
        .then((v) => {
          const reader = new window.FileReader();
          reader.readAsDataURL(v.data);
          reader.onload = () => {
            props.addCachedCapturedImage(props.imageUrl, reader.result);
            setIsFetching(false);
          };
        });
    }
  }, [props]);

  return (
    <img
      src={
        props.cachedCapturedImages[props.imageUrl] === undefined
          ? ""
          : props.cachedCapturedImages[props.imageUrl]
      }
      id="img"
      alt="Loading Captured Pic..."
      style={
        props.zoomLevel
          ? {
              transform: `scale(${props.zoomLevel})`,
              transformOrigin: "top left",
            }
          : {}
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    cachedCapturedImages: state.cachedCapturedImages.cachedCapturedImages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCachedCapturedImage: (key, value) =>
      dispatch(addCachedCapturedImage(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AsyncImage);
