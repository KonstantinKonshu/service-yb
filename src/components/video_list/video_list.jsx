import "./video_list.scss";

import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

import { storeContext } from "../../store";
import { get } from "../../utils/utils";
import { getRequestSearch } from "../../actions";
import VideoItem from "../video_item/video_item";

const VideoList = () => {
  const { state, dispatch } = useContext(storeContext);
  const [fetching, setFetching] = useState(true);
  // const [pageToken, setPageToken] = useState(undefined);
  // const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  useEffect(() => {
    if (fetching) {
      const p = queryString.parse(window.location.search);
      const params = {
        q: state.search || p.search,
        part: "snippet",
        maxResults: 10,
        pageToken: state.nextPageToken,
      };
      get("/search", params)
        .then((rsp) => {
          console.log("SSSearch fetch rsp:", rsp.data);
          console.log("total: ", rsp.data.pageInfo.totalResults);
          dispatch(getRequestSearch(rsp.data));
          // setTotalCount(10000);
          // setTotalCount(rsp.data.pageInfo.totalResults);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 200) {
      setFetching(true);
    }
    // console.log("scrollHeight: ", e.target.documentElement.scrollHeight);
    // console.log("scrollTop: ", e.target.documentElement.scrollTop);
    // console.log("innerHeight: ", window.innerHeight);
  };

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

  // const renderedVideosTwo = state.videos
  //   .filter((i) => i !== state.selectedVideo)
  //   .map((video, index) => {
  //     const url =
  //       video.id.kind === "youtube#video"
  //         ? `/current-video?id=${video.id.videoId}`
  //         : `/current-channel?ChannelId=${video.snippet.channelId}`;

  //     return (
  //       <Link key={`VideoList_${index}`} to={url}>
  //         <VideoItem video={video} />
  //       </Link>
  //     );
  //   });
  return <div className="video_list-main_container">{renderedVideos}</div>;
};

export default VideoList;
