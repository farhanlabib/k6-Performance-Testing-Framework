import http from 'k6/http';
import { check } from 'k6';

// Define the stages for the test
export let options = {
    stages: [
        // Ramp up to 5 VUs for 1 second
        { duration: "1s", target: 5 },
        //Ramp up to 15 VUs for 1 minute
        { duration: "1m", target: 15 },
        // Decrease to 0 VUs for 20 seconds
        { duration: "20s", target: 0 },
      ],
};

// Set the base URL of the API
const baseUrl = 'https://reqres.in/api/';

// The main function that will be executed for each VU
export default function() {
  // Create the form data and headers for the POST request
  const data = JSON.stringify({
    name: 'morpheus',
    job: 'leader',
  });
  let headers = { 'Content-Type': 'application/json' };

  // Send the POST request to the endpoint
  let response = http.post(`${baseUrl}/users`, data, { headers: headers });

  // Check the response for various conditions
  check(response, {
    // The status code should be 200
    'status is 201': (r) => r.status === 201,
  });

  // If the status code is not 200, log the request body
  if (response.status != 201){
    console.log(response.request.body);
  }
}