import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import ErrorBoundary from "./errors/ErrorBoundary";

Sentry.init({
  dsn: "https://02c5caf37733443fa789b7110321a58c@o1169267.ingest.sentry.io/6263195",
  integrations: [new BrowserTracing()],
  environment: process.env.REACT_APP_SENTRY_ENV,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  beforeSend: (event, _) => {
    event["fingerprint"] = [event.event_id];
    return event;
  },
});

console.log("app running on ", process.env.REACT_APP_APP_ENV);
ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </ErrorBoundary>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
