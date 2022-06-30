import React from "react";
import { StartErrorModal } from "../actions/errorPopUpAction";
import DisplayErrorModal from "./../components/common/DisplayErrorModal/DisplayErrorModal";
import store from "../store";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // console.log(error, errorInfo);
    const errorPayload = {
      errorCode: "N/A",
      errorReason: error.toString(),
    };
    store.dispatch(StartErrorModal(errorPayload));
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <DisplayErrorModal isErrorBoundary={true} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
