const axios = require("axios");
const { performance } = require("perf_hooks");
const fs = require("fs");

// helper to log to a file
function logLatencyToFile(filePath, message) {
  fs.appendFile(filePath, message + "\n", (err) => {
    if (err) {
      console.error("Error logging to file:", err);
    }
  });
}

// function to initialize Axios with latency tracking (no baseURL)
function createAxiosWithLatencyLogger({
  logToFile = false,
  logFilePath = "./latency_logs.txt",
}) {
  const axiosInstance = axios.create(); // no baseURL configuration

  // request interceptor to log the start time of the request
  axiosInstance.interceptors.request.use((config) => {
    config.metadata = { startTime: performance.now() }; // more precise timing
    console.log(`Request made to: ${config.url}`);
    return config;
  });

  // response interceptor to log the latency
  axiosInstance.interceptors.response.use(
    (response) => {
      const startTime = response.config.metadata.startTime;
      const endTime = performance.now();
      const latency = endTime - startTime;
      const logMessage = `API request to ${
        response.config.url
      } took ${latency.toFixed(2)} ms`;

      console.log(logMessage);

      if (logToFile) {
        logLatencyToFile(logFilePath, logMessage);
      }

      return response;
    },
    (error) => {
      if (
        error.config &&
        error.config.metadata &&
        error.config.metadata.startTime
      ) {
        const startTime = error.config.metadata.startTime;
        const endTime = performance.now();
        const latency = endTime - startTime;
        const logMessage = `API request to ${
          error.config.url
        } failed after ${latency.toFixed(2)} ms`;

        console.error(logMessage);

        if (logToFile) {
          logLatencyToFile(logFilePath, logMessage);
        }
      } else {
        console.error("Request failed before starting.");
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

module.exports = createAxiosWithLatencyLogger;
