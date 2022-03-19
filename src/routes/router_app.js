import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import VideoList from "../components/video_list/video_list";
import CurrentVideoList from "../components/current_video_list/current_video_list";
import CurrentChannelList from "../components/current_channel_list/current_channel_list";
import Searchbar from "../components/searchbar/searchbar";

const RouterApp = () => {
  return (
    <Router>
      <div className="app-main_container">
        <Searchbar />
        <Routes>
          <Route path="/videolist" element={<VideoList />} />
          <Route path="/current-video" element={<CurrentVideoList />} />
          <Route path="/current-channel" element={<CurrentChannelList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default RouterApp;
