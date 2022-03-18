import React, { createContext, useEffect, useReducer } from "react";
import queryString from "query-string";

import { get } from "../utils/utils";
import { types } from "../constants";
import {
  handleSubmitInit,
  handleClickVideo,
  getRequestSearch,
  getBannerChannels,
  setError,
} from "../actions";

const initialState = {
  channelId: null,
  bannerChannel: null,
  nextPageToken: null,
  prevPageToken: null,
  pageToken: null,
  handleError: null,
  videos: [],
  selectedVideo: null,
  search: null,
};

const reducer = (state, action) => {
  console.log("ACTION: ", action);
  switch (action.type) {
    case types.SELECT_CHANNEL:
      return {
        ...state,
        channelId: action.payload.snippet.channelId,
        selectedVideo: action.payload,
      };
    case types.HANDLE_SUBMIT_INIT:
      return {
        ...state,
        search: action.payload1,
        channelId: action.payload2,
        bannerChannel: action.payload2,
        handleError: action.payload3,
      };
    case types.get.GET_BANNER_CHANNELS:
      return {
        ...state,
        bannerChannel: action.payload,
      };
    case types.get.GET_REQUEST_SEARCH:
      return {
        ...state,
        videos: action.payload.items,
        nextPageToken: action.payload.nextPageToken,
        prevPageToken: action.payload.prevPageToken,
      };
    case types.set.SET_ERROR:
      return {
        ...state,
        handleError: action.payload,
      };
    case types.set.SET_SELECT_VIDEO:
      console.log(action.payload);
      return {
        ...state,
        selectedVideo: action.payload,
      };
    default:
      return state;
  }
};

const handleSubmit = (search, dispatch) => {
  console.log("handleSubmit !!!!");
  dispatch(handleSubmitInit(search, null));

  if (window.location.pathname === "/videolist") {
    console.log("videolist!!!");

    const params = {
      q: search,
      part: "snippet",
      maxResults: 10,
    };
    requestGetSearch(params, false, dispatch);
  } else if (window.location.pathname === "/current-video") {
    console.log("current-video!!!");

    const params = {
      id: search,
      part: "snippet,contentDetails,statistics,status",
    };
    get(`/videos`, { params })
      .then((response) => {
        dispatch(handleClickVideo(response.data.items[0]));

        //запрос на нахождение подобных видео по Title
        const params = {
          q: response.data.items[0].snippet.title,
          part: "snippet",
          maxResults: 10,
        };
        requestGetSearch(params, false, dispatch);
      })
      .catch((error) => {
        console.log("ERROR", error);
        dispatch(setError(true));
      });
  } else if (window.location.pathname === "/current-channel") {
    console.log("current-channel!!!");

    let params = {
      channelId: search,
      part: "snippet",
      maxResults: 10,
    };
    requestGetSearch(params, false, dispatch);

    params = {
      id: search,
      part: "snippet,brandingSettings",
    };
    get("/channels", { params })
      .then((response) => {
        const bannerUrl = response.data.items[0].brandingSettings.image.bannerImageUrl;
        dispatch(getBannerChannels(bannerUrl));
      })
      .catch((error) => {
        console.log("ERROR", error);
        dispatch(setError(true));
      });
  }
};

const requestGetSearch = (params, prevIndic, dispatch) => {
  get("/search", { params })
    .then((response) => {
      console.log("requestGetSearch rsp: ", response);
      const receivedData = response.data;
      console.log("received", receivedData.items.length);
      dispatch(getRequestSearch(receivedData));

      // if (prevIndic && !receivedData.prevPageToken)
      //   document.getElementsByClassName("yb-app-block_btn_control-prev_btn")[0].style.display =
      //     "none";
      // if (receivedData.items.length === 0) this.props.setError(true);
    })
    .catch((error) => {
      console.log("ERROR", error);
      dispatch(setError(true));
    });
};

const storeContext = createContext(initialState);

const ProviderStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("EFFECT Provider");
    const params = queryString.parse(window.location.search);
    console.log("search: ", window.location.search);
    console.log("params: ", params);

    if (params.search) handleSubmit(params.search, dispatch);
    else if (params.ChannelId) handleSubmit(params.ChannelId, dispatch);
    else if (params.id) handleSubmit(params.id, dispatch);
  }, []);

  return <storeContext.Provider value={{ state, dispatch }}>{children}</storeContext.Provider>;
};

export { storeContext, ProviderStore };
