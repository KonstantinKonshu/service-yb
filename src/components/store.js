import React, { createContext, useEffect, useReducer } from "react";
import queryString from "query-string";
import { types, KEY } from "../constants";
import {
  handleSubmitInit,
  handleClickVideo,
  getRequestSearch,
  getBannerChannels,
  setError,
} from "../actions";
import YoutubeAPI from "./youtubeAPI/youtubeAPI";

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
    case "action description":
      return { ...state, search: action.payload };
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

const handleSubmit = (termFromSearchBar, dispatch) => {
  dispatch(handleSubmitInit(termFromSearchBar, null));

  if (window.location.pathname === "/videolist") {
    console.log("videolist!!!");

    const params = {
      q: termFromSearchBar,
      part: "snippet",
      key: KEY,
      maxResults: 10,
    };
    requestGetSearch(params, false, dispatch);
  } else if (window.location.pathname === "/current-video") {
    console.log("current-video!!!");

    const params = {
      id: termFromSearchBar,
      key: KEY,
      part: "snippet,contentDetails,statistics,status",
    };
    YoutubeAPI.get(`https://www.googleapis.com/youtube/v3/videos`, { params })
      .then((response) => {
        dispatch(handleClickVideo(response.data.items[0]));

        //запрос на нахождение подобных видео по Title
        const params = {
          q: response.data.items[0].snippet.title,
          part: "snippet",
          key: KEY,
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
      channelId: termFromSearchBar,
      part: "snippet",
      key: KEY,
      maxResults: 10,
    };
    requestGetSearch(params, false, dispatch);

    params = {
      id: termFromSearchBar,
      part: "snippet,brandingSettings",
      key: KEY,
    };
    YoutubeAPI.get("https://www.googleapis.com/youtube/v3/channels", { params })
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
  YoutubeAPI.get("https://www.googleapis.com/youtube/v3/search", { params })
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
    // const url = window.location.href.toString()
    console.log("search: ", window.location.search);
    console.log("params: ", params);

    handleSubmit(params.search, dispatch);

    // dispatch({ search: "params.search" });
    // if(url.includes("search"))
  }, []);

  return <storeContext.Provider value={{ state, dispatch }}>{children}</storeContext.Provider>;
};

export { storeContext, ProviderStore };
