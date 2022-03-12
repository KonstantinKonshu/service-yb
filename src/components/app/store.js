import React, { createContext, useReducer } from "react";
import { types } from "../../constants";

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
    // case types.HANDLE_SUBMIT_INIT:
    //   return {
    //     ...state,
    //     handleError: action.payload3,
    //   };
    case types.set.SET_SELECT_VIDEO:
      console.log(action.payload);
      return {
        ...state,
        selectedVideo: action.payload,
      };
    // case types.get.GET_REQUEST_SEARCH:
    //   return {
    //     ...state,
    //     videos: action.payload.items,
    //   };
    // case types.HANDLE_SUBMIT_INIT:
    //   return {
    //     ...state,
    //     search: action.payload1,
    //   };
    // case types.SELECT_CHANNEL:
    //   return {
    //     ...state,
    //     selectedVideo: action.payload,
    //   };
    default:
      return state;
  }
};

const storeContext = createContext(initialState);

const ProviderStore = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <storeContext.Provider value={{ state, dispatch }}>
      {children}
    </storeContext.Provider>
  );
};

export { storeContext, ProviderStore };
