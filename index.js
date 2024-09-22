const axios = require('axios');

// Function to initialize Axios with latency tracking and send logs to an endpoint
function createAxiosWithLatencyLogger({ logEndpoint = null }) {
  const axiosInstance = axios.create(); // No baseURL configuration

  // Request interceptor to log the start time of the request
  axiosInstance.interceptors.request.use((config) => {
    config.metadata = { startTime: new Date() };
    return config;
  });

  // Response interceptor to log the latency and send it to the log endpoint
  axiosInstance.interceptors.response.use(
    async (response) => {
      const startTime = response.config.metadata.startTime;
      const endTime = new Date();
      const latency = endTime.getTime() - startTime.getTime();

      const logData = {
        url: response.config.url,
        method: response.config.method,
        statusCode: response.status,
        latencyMs: latency,
        timestamp: new Date().toISOString(),
      };

      if (logEndpoint) {
        try {
          // Send the log data to the specified endpoint
          await axios.post(logEndpoint, logData);
          console.log(`Log sent to ${logEndpoint}: ${response.config.url} took ${latency} ms`);
        } catch (error) {
          console.error(`Failed to send log to ${logEndpoint}`, error);
        }
      } else {
        console.log(`API request to ${response.config.url} took ${latency} ms`);
      }

      return response;
    },
    async (error) => {
      if (error.config && error.config.metadata) {
        const startTime = error.config.metadata.startTime;
        const endTime = new Date();
        const latency = endTime.getTime() - startTime.getTime();

        const logData = {
          url: error.config.url,
          method: error.config.method,
          statusCode: error.response ? error.response.status : 500,
          latencyMs: latency,
          timestamp: new Date().toISOString(),
        };

        if (logEndpoint) {
          try {
            // Send the error log data to the specified endpoint
            await axios.post(logEndpoint, logData);
            console.error(`Error log sent to ${logEndpoint}: ${error.config.url} failed after ${latency} ms`);
          } catch (postError) {
            console.error(`Failed to send error log to ${logEndpoint}`, postError);
          }
        } else {
          console.error(`API request to ${error.config.url} failed after ${latency} ms`);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

module.exports = createAxiosWithLatencyLogger;
