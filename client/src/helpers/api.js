import { API_URL } from "../constants";

let JWT = null;

export async function callAPI({ method, endpoint, body = null, headers = {} }) {
  if (JWT) {
    headers = {
      ...headers,
      Authorization: `Bearer ${JWT}`
    };
  }

  console.log({
    method,
    headers: headers,
    body: body && JSON.stringify(body)
  });

  const response = await fetch(`${API_URL}/${endpoint}`, {
    method,
    headers: headers,
    body: body && JSON.stringify(body)
  });

  if (response.status >= 400) {
    console.log("response was >= 400");
    let { message } = await response.json();

    throw new Error(message);
  }

  const parsedResponse = await response.json();

  console.log("API request returned:");
  console.log(parsedResponse);
  console.log("====================");
  return parsedResponse;
}
