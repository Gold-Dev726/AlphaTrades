import axios from 'axios';
import axiosRetry from 'axios-retry';
const axiosInstance = axios.create({ timeout: 10000 });
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        localStorage.clear();
        // serviceWorkerRegistration.unregister();
      }
    }
    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: (retryCount) => {
    console.log(`retry attempt: ${retryCount}`);
    return retryCount * 2000; // time interval between retries
  },
  retryCondition: (error) =>
    // if retry condition is not specified, by default idempotent requests are retried
    error.response.status === 502 ||
    error.response.status === 501 ||
    error.response.status === 500 ||
    error.response.status === 503
});

export default axiosInstance;
