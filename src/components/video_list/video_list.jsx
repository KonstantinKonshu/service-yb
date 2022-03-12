import "./video_list.scss";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import VideoItem from "../video_item/video_item";
import { storeContext } from "../app/store";

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
          <div></div>
          <VideoItem key={`VideoList_${index}`} video={video} />
        </Link>
      );
    });
  return <div className="yb-vl-main_container">{renderedVideos}</div>;
};

export default VideoList;
