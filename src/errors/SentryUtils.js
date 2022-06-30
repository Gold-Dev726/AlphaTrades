import * as Sentry from "@sentry/react";
import { isEmpty } from "lodash";

class SentryUtils {
  static isEnabled = true;
  static captureApiException = (error, additionalInfoObject = {}) => {
    if (!SentryUtils.isEnabled) {
      return;
    }
    Sentry.withScope((scope) => {
      scope.setTag("manually-logged", "rv-api-exception");
      scope.setExtra("rv-api-info", {
        headers: error?.response?.config?.headers ?? {},
        response: error?.response?.data ?? {},
        requestBody: error?.response?.config?.data ?? {},
      });
      if (!isEmpty(additionalInfoObject)) {
        if (additionalInfoObject?.tokenType) {
          scope.setTag(
            "request-header-token-type",
            additionalInfoObject.tokenType
          );
          delete additionalInfoObject.tokenType;
        }
        scope.setExtra(
          "additional-info-object",
          JSON.stringify(additionalInfoObject)
        );
      }
      Sentry.captureException(error);
    });
  };

  static captureException = (error, additionalInfoObject = {}) => {
    if (!SentryUtils.isEnabled) {
      return;
    }
    Sentry.withScope((scope) => {
      scope.setTag("manually-logged", "exception");
      if (!isEmpty(additionalInfoObject)) {
        if (additionalInfoObject?.tokenType) {
          scope.setTag(
            "request-header-token-type",
            additionalInfoObject.tokenType
          );
          delete additionalInfoObject.tokenType;
        }
        scope.setExtra(
          "additional-info-object",
          JSON.stringify(additionalInfoObject)
        );
      }
      Sentry.captureException(error);
    });
  };
}

export default SentryUtils;
