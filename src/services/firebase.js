import { initializeApp } from "firebase/app";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

let instance = null;

export default function getFirebase() {
  return new Promise((resolve, reject) => {
    if (instance) {
      resolve(instance);
    } else {
      instance = initializeApp(config);
      resolve(instance);
    }
  });
}
