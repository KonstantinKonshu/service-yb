import "./searchbar.scss";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import YoutubeAPI from "../youtubeAPI/youtubeAPI";
import { KEY } from "../../constants";

const Searchbar = () => {
  const [term, setTerm] = useState("");

  useEffect(() => {
    console.log("componentDidMount_SB");
  }, []);

  const handleOnChange = (e) => {
    setTerm(e.target.value);
  };

  const onSubmit = () => {
    // dispatch(handleSubmitInit(term, null));
    //   this.props.handleSubmitInit(term, null);
    const params = {
      q: term,
      part: "snippet",
      key: KEY,
      maxResults: 10,
    };

    console.log("params: ", params);
    YoutubeAPI.get("https://www.googleapis.com/youtube/v3/search", { params })
      .then((rsp) => {
        console.log("Youtube rsp: ", rsp);
        console.log("Youtube rsp 2: ", rsp.data);
        // const receivedData = response.data;
        // dispatch(getRequestSearch(receivedData));
        // this.props.getRequestSearch(receivedData);
      })
      .catch((error) => {
        console.log("ERROR", error);
        // this.props.setError(true);
      });
  };

  return (
    <div className="yb-sb-main_container">
      <img
        className="yb-sb-main_container-img_search"
        src="https://icongr.am/clarity/video-gallery.svg?size=30&color=CD0000"
      />
      <input
        className="yb-sb-main_container-input_search yb-general_text_font"
        onChange={(e) => handleOnChange(e)}
        name="search"
        type="text"
        value={term}
        placeholder="Enter request"
      />
      <Link to={`/videolist?search=${term}`}>
        <button
          className="yb-sb-main_container-btn_search yb-general_text_font"
          onClick={onSubmit}
        >
          {"Search"}
        </button>
      </Link>
      <Link to={`/videolist?search=${term}`}>
        <button
          className="yb-sb-main_container-btn_back yb-general_text_font"
          onClick={onSubmit}
        >
          {"Channel exit"}
        </button>
      </Link>
    </div>
  );
};

export default Searchbar;
