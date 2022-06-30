import { toast } from "react-toastify";
import { commonMessages } from "../constants/commonMessages";
import CloseIcon from "../components/common/CloseIcon";
import LoaderIcon from "../components/common/LoaderIcon";

export const customToast = {
  success: (message) => {
    toast(message, {
      closeButton: CloseIcon,
      className: commonMessages.success,
      autoClose: 2000,
    });
  },
  error: (message) => {
    toast(message, {
      closeButton: CloseIcon,
      className: commonMessages.error,
      autoClose: 2000,
    });
  },
  warn: (message) => {
    toast(message, {
      closeButton: CloseIcon,
      className: commonMessages.warning,
      autoClose: 5000,
    });
  },
  uploadImg: (message) => {
    toast(
      <>
        {message}
        <LoaderIcon />
      </>,
      {
        className: commonMessages.uploadImg,
        autoClose: 2000,
      }
    );
  },
};
