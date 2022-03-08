import "./app.scss";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import reducers from "../../reducers/root_reducer";
import Home from "../home/home";
import VideoList from "../video_list/video_list";
import CurrentVideoList from "../current_video_list/current_video_list";
import Searchbar from "../searchbar/searchbar";
// import SearchBar from "../searchbar/searchbar";
// import YoutubeAPI from "../youtubeAPI/youtubeAPI";
// import VideoList from "../video_list/video_list";
// import { Route } from "react-router-dom";
// import CurrentVideoList from "../current_video_list/current_video_list";
// import CurrentChannelList from "../current_channel_list/current_channel_list";

// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {
//   getRequestSearch,
//   handleSubmitInit,
//   handleClickVideo,
//   getBannerChannels,
//   setError,
// } from "../../actions";
// import { KEY } from "../../constants";

const store = createStore(reducers);

const App = () => {
  console.log("STORE: ", store);
  return (
    <Provider store={store}>
      <Router history={{}}>
        <div className="app-main_container">
          <Searchbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/videolist" element={<VideoList />} />
            <Route path="/current-video" element={<CurrentVideoList />} />
            {/*<Route path="/current-channel" element={<CurrentChannelList />} />*/}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
