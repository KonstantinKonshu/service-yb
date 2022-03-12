import "./current_video_list.scss";

import React, { useContext } from "react";
import { storeContext } from "../app/store";
import PlayerYoutube from "../player_youtube/player_youtube";
import VideoList from "../video_list/video_list";

// import { useSelector } from "react-redux";

const CurrentVideoList = () => {
  const { state } = useContext(storeContext);
  let title, channelTitle, description;
  //   const selectedVideo = useSelector(
  //     (state) => state.videosReducer.selectedVideo
  //   );
  const selectedVideo = state.selectedVideo || {};

  if (selectedVideo) {
    title = selectedVideo.snippet.title;
    channelTitle = selectedVideo.snippet.channelTitle;
    description = selectedVideo.snippet.description;
  }

  return (
    <div className="yb-cvl-main_container">
      <div className="yb-cvl-main_container-main_video_container">
        <PlayerYoutube />
        <div className="yb-cvl-main_video_constainer-video_content">
          <div className="yb-cvl-video_content-title">{title}</div>
          <div className="yb-cvl-video_content-channel_title">
            {channelTitle}
          </div>
          <div className="yb-cvl-video_content-desc">{description}</div>
        </div>
      </div>

      <div className="yb-cvl-main_container-some_videos_container">
        <VideoList />
      </div>
    </div>
  );
};

export default CurrentVideoList;
