import axios from "axios";
import { baseURL, KEY } from "./constants";

export const httpClient = axios.create({
  baseURL: baseURL,
});

export const get = (url, params) => {
  console.log(`GET request to ${url}`);
  // const res = params, key: KEY };

  params = { ...params, key: KEY };
  // console.log("prms bef: ", params);
  // params.key = KEY;

  // const params1 = {
  //   q: "ubuntu",
  //   part: "snippet",
  //   key: KEY,
  //   maxResults: 10,
  // };

  // console.log("prms: ", params1);
  // console.log("prms res: ", res);

  return httpClient.get(url, { params });
};
