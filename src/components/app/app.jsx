import "./app.scss";

import React, { createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import { createStore } from "redux";

// import reducers from "../../reducers/root_reducer";
import Home from "../home/home";
import VideoList from "../video_list/video_list";
import CurrentVideoList from "../current_video_list/current_video_list";
import Searchbar from "../searchbar/searchbar";

// const store = createStore(reducers);

const storeContext = createContext();

const ProviderStore = ({ children }) => {
  //   console.log("ProviderStore");
  const value = { text: 123, text2: "qwerty" };

  return (
    <storeContext.Provider value={value}>{children}</storeContext.Provider>
  );
};

const App = () => {
  //   console.log("STORE: ", store);
  return (
    <ProviderStore>
      <Router>
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
    </ProviderStore>
  );
};

export default App;
