import "./app.scss";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProviderStore } from "../store";
import VideoList from "../video_list/video_list";
import CurrentVideoList from "../current_video_list/current_video_list";
import CurrentChannelList from "../current_channel_list/current_channel_list";
import Searchbar from "../searchbar/searchbar";

const App = () => {
  return (
    <ProviderStore>
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
    </ProviderStore>
  );
};

export default App;
