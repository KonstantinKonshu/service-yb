import "./video_item.scss";

import React, { useContext } from "react";
import classNames from "classnames";
// import { animateScroll as scroll } from "react-scroll";

import { get } from "../../utils/utils";
import { storeContext } from "../store";
import {
  handleClickVideo,
  handleClickChannel,
  getRequestSearch,
  getBannerChannels,
  setError,
} from "../../actions";

const VideoItem = ({ video }) => {
  const { dispatch } = useContext(storeContext);

  const clickItem = (video) => {
    console.log("video_item click!!!!");
    // window.scrollTo(0, 100000);
    // scroll.scrollToTop();
    // window.scrollTo(0, 0);

    if (video.id.kind === "youtube#video") dispatch(handleClickVideo(video));

    if (video.id.kind === "youtube#channel") {
      dispatch(handleClickChannel(video));

      const params = {
        channelId: video.id.channelId,
        part: "snippet",
        // key: KEY,
        maxResults: 10,
      };
      get("/search", { params })
        .then((response) => {
          const receivedData = response.data;
          dispatch(getRequestSearch(receivedData));

          const params = {
            id: video.id.channelId,
            part: "snippet,brandingSettings",
            // key: KEY,
          };
          return get("/channels", {
            params,
          });
        })
        .then((rsp) => {
          const bannerUrl = rsp.data.items[0].brandingSettings.image.bannerImageUrl;
          dispatch(getBannerChannels(bannerUrl));
        })
        .catch((error) => {
          console.log("ERROR", error);
          dispatch(setError(true));
        });
    }
  };

  return (
    <div className="yb-vi-main_container" onClick={() => clickItem(video)}>
      <div
        className={classNames({
          "yb-vi-video_container": video.id.kind === "youtube#video",
          "yb-vi-channel_container": video.id.kind !== "youtube#video",
        })}
      >
        <img
          className={classNames({
            "yb-vi-main_container-img": true,
            "yb-vi-main_container_item-img_channel": video.id.kind === "youtube#channel",
            "yb-vi-main_container_item-img_video": video.id.kind !== "youtube#channel",
          })}
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.description}
        />
        <div className="yb-vi-main_container_item-icon_play">
          <img src="https://img.icons8.com/color/48/000000/youtube-play.png" alt="ic_play" />
        </div>
      </div>
      <div className="yb-vi-main_container-title ">{video.snippet.title}</div>
    </div>
  );
};

export default VideoItem;
