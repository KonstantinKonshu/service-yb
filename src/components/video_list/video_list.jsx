import "./video_list.scss";

import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { storeContext } from "../../store";
import VideoItem from "../video_item/video_item";

const VideoList = () => {
  const { state } = useContext(storeContext);

  const renderedVideos = state.videos
    .filter((i) => i !== state.selectedVideo)
    .map((video, index) => {
      const url =
        video.id.kind === "youtube#video"
          ? `/current-video?id=${video.id.videoId}`
          : `/current-channel?ChannelId=${video.snippet.channelId}`;

      return (
        <Link key={`VideoList_${index}`} to={url}>
          <VideoItem video={video} />
        </Link>
      );
    });
  return <div className="video_list-main_container">{renderedVideos}</div>;
};

export default VideoList;
