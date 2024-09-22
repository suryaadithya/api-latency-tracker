# API Latency Logger with POST Request Logging

This package logs API request and response times (latency) and sends the logs to a specified **endpoint** via a POST request. It works by intercepting Axios requests and responses, calculating the time taken for each API call, and sending the logs as JSON data to a specified API endpoint.

## Features

- Automatically logs API request/response latency for Axios requests.
- Sends the logs to a specified **endpoint** via a POST request.
- Supports error logging with status codes and latency details.

## Installation

Install the package along with Axios.

```bash
npm install your-latency-logger-package-name axios


## Usage

const createAxiosWithLatencyLogger = require('api-latency-tracker');

// Initialize Axios with the latency logger and set the logging endpoint
const axios = createAxiosWithLatencyLogger({
    logEndpoint: 'https://your-logging-endpoint.com/logs', // Set the log endpoint where logs will be sent
});
