import getFirebase from "../services/firebase";
import { getAnalytics } from "firebase/analytics";

export default function getAnalyticsInstance() {
  return new Promise((resolve, reject) => {
    getFirebase().then((firebase) => {
      const analytics = getAnalytics(firebase);
      resolve(analytics);
    });
  });
}
