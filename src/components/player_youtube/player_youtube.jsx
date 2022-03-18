import "./player_youtube.scss";

import React, { useContext } from "react";

import { storeContext } from "../store";

const PlayerYoutube = () => {
  const { state } = useContext(storeContext);

  let identif;
  if (state.selectedVideo) {
    const { id } = state.selectedVideo;
    identif = id.videoId || id;
  }

  return (
    <div className="yb-py-main_container">
      <iframe
        title="title"
        className="yb-py-player_body"
        type="text/html"
        src={`http://www.youtube.com/embed/${identif}?autoplay=1&origin=http://example.com`}
        frameBorder="0"
      />
    </div>
  );
};

export default PlayerYoutube;
