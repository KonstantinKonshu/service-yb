import { types } from "./constants";

const handleSubmitInit = (termFromSearchBar, initialItem) => {
  console.log("handleSubmitInit: ", termFromSearchBar, initialItem);
  return {
    type: types.HANDLE_SUBMIT_INIT,
    payload1: termFromSearchBar,
    payload2: initialItem,
    payload3: false,
  };
};

const getRequestSearch = (data) => {
  return {
    type: types.get.GET_REQUEST_SEARCH,
    payload: data,
  };
};

const getBannerChannels = (bannerChannel) => {
  return {
    type: types.get.GET_BANNER_CHANNELS,
    payload: bannerChannel,
  };
};

const handleClickVideo = (videoSelect) => {
  return {
    type: types.set.SET_SELECT_VIDEO,
    payload: videoSelect,
  };
};

const handleClickChannel = (channel) => {
  return {
    type: types.SELECT_CHANNEL,
    payload: channel,
  };
};

const setError = (error) => {
  return {
    type: types.set.SET_ERROR,
    payload: error,
  };
};

export {
  handleSubmitInit,
  getRequestSearch,
  getBannerChannels,
  handleClickVideo,
  handleClickChannel,
  setError,
};
