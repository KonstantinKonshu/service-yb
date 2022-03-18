import axios from "axios";
import { baseURL, KEY } from "./constants";

const httpClient = axios.create({
  baseURL: baseURL,
});

export const get = (url, params) => {
  console.log(`GET request to ${url}`);

  params = { ...params, key: KEY };
  // const params = {
  //   q: search,
  //   part: "snippet",
  //   key: KEY,
  //   maxResults: 10,
  // };

  return httpClient.get(url, params);
};
