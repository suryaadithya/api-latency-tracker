const axios = require('axios');

// Function to initialize Axios with latency tracking (no baseURL)
function createAxiosWithLatencyLogger({ logToFile = false, logFilePath = './latency_logs.txt' }) {
  const axiosInstance = axios.create(); // No baseURL configuration

  // Request interceptor to log the start time of the request
  axiosInstance.interceptors.request.use((config) => {
    config.metadata = { startTime: new Date() };
    console.log(`Request made to: ${config.url}`); // Ensure the request interceptor is being hit
    return config;
  });

  // Response interceptor to log the latency
  axiosInstance.interceptors.response.use(
    (response) => {
      const startTime = response.config.metadata.startTime;
      const endTime = new Date();
      const latency = endTime.getTime() - startTime.getTime();
      console.log(`API request to ${response.config.url} took ${latency} ms`); // Ensure the response interceptor is being hit

      return response;
    },
    (error) => {
      if (error.config && error.config.metadata) {
        const startTime = error.config.metadata.startTime;
        const endTime = new Date();
        const latency = endTime.getTime() - startTime.getTime();
        console.error(`API request to ${error.config.url} failed after ${latency} ms`);
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

module.exports = createAxiosWithLatencyLogger;
