import { API_URL } from "../constants";

/**
 *  Below defined function wraps a call to fetch,
 *  providing some useful abstractions:
 *
 *   -- The function expects body to be passed as a plain js object
 *      which will be converted internally using JSON.stringify
 *
 *   -- The base api url is important from /constants, and so that only
 *      the path for the specific endpoint must be passed at call site
 *
 *   -- Caller can pass token string without worrying about packaging it
 *      into the appropriate Authorization header
 *
 *   -- On response from the server, response object is
 *      parsed and returned to caller
 *
 */

export async function callAPI({
  method,
  endpoint,
  token,
  body = null,
  headers = {}
}) {
  // If token has been passed, create appropriate
  // authorization header
  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`
    };
  }
  console.log(API_URL,endpoint);
  console.log(headers,body);
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
