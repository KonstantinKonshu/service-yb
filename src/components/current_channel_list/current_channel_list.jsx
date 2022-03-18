import "./current_channel_list.scss";

import React, { useContext } from "react";

import { storeContext } from "../store";
import VideoList from "../video_list/video_list";

const CurrentChannelList = () => {
  const { state } = useContext(storeContext);
  const banner = state.bannerChannel;
  return (
    <div>
      <div className="yb-ccl-banner_channel">
        <img className="yb-ccl-banner_channel-img" src={banner} alt="" />
      </div>
      <VideoList />
    </div>
  );
};

export default CurrentChannelList;
