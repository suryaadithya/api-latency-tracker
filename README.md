<br>

# Axios Latency Tracker

This module provides an Axios wrapper that tracks API request latencies and optionally logs them to a file. It uses interceptors to measure the time taken for each API request and logs the result to the console or to a file based on configuration.

### Features

- Precise Latency Measurement : Utilizes performance.now() for sub-millisecond precision.
- Console Logging: Logs request URLs and their respective latencies to the console.
- File Logging (Optional): Optionally logs latencies to a specified file.
- Error Handling: Captures latency for failed requests as well.
- Configurable: Easy to customize logging options and file paths.

### Installation

To use the Axios Latency Tracker in your project, first install Axios if you haven’t already:

`npm install axios`

Then, include the latency tracker module in your project:

`npm install <your-module>`

### Usage

You can create an Axios instance with latency logging using the createAxiosWithLatencyLogger function. Below is an example of how to integrate it into your project.

### Basic Usage

```bash
const createAxiosWithLatencyLogger = require('./path-to-module');

// Create an Axios instance with latency tracking enabled
const axiosInstance = createAxiosWithLatencyLogger({
logToFile: false // Set to true if you want to log to a file
});

// Make an API request
axiosInstance.get('https://api.example.com/data')
.then(response => {
console.log('API data:', response.data);
})
.catch(error => {
console.error('Error:', error);
});
```

### File Logging

To enable file logging, pass the logToFile option as true and specify the logFilePath where you want the logs to be stored:

```bash
const createAxiosWithLatencyLogger = require('./path-to-module');

// Create an Axios instance with file-based latency logging
const axiosInstance = createAxiosWithLatencyLogger({
logToFile: true,
logFilePath: './latency_logs.txt' // Custom path for log file
});

// Make an API request
axiosInstance.get('https://api.example.com/data')
.then(response => {
console.log('API data:', response.data);
})
.catch(error => {
console.error('Error:', error);
});
```

### Interceptors

The library automatically attaches interceptors to measure latency:

Request Interceptor: Captures the start time of the request.
Response Interceptor: Logs the latency when the response is received or logs the failure latency if the request fails.

## Configuration Options

The createAxiosWithLatencyLogger function accepts an options object with the following properties:

Option Type Description
logToFile Boolean Whether to log the latencies to a file. Defaults to false.
logFilePath String The file path where latencies will be logged if logToFile is enabled. Defaults to ./latency_logs.txt.

### Example Configuration

```bash
const axiosInstance = createAxiosWithLatencyLogger({
logToFile: true,
logFilePath: '/var/logs/api-latency.txt'
});
```

### Example Log Output

When logToFile is disabled (default), the latencies will be logged to the console like this:

```bash
Request made to: https://api.example.com/data
API request to https://api.example.com/data took 45.23 ms
When logToFile is enabled, the same information will be written to the specified log file:
```

```bash
2023-09-21T12:45:00 - API request to https://api.example.com/data took 45.23 ms
In case of failure, the latency until the failure is also logged:
```

```bash
API request to https://api.example.com/data failed after 123.45 ms
```

### Error Handling

If an API request fails, the latency is still measured and logged to either the console or the specified file. The error handling mechanism captures the time elapsed before the failure occurred.

### Development

To modify or extend the Axios Latency Tracker, follow these steps:

Clone the repository.
Make changes to the interceptor logic inside the createAxiosWithLatencyLogger function.
Run the project with test API endpoints to validate your changes.

### License

This project is licensed under the MIT License - see the LICENSE file for details.

<br>
