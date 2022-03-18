import "./searchbar.scss";

import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { get } from "../../utils/utils";
import { storeContext } from "../store";
import { getRequestSearch, handleSubmitInit, setError } from "../../actions";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const { dispatch } = useContext(storeContext);

  useEffect(() => {
    console.log("componentDidMount_SB");
  }, []);

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    dispatch(handleSubmitInit(search, null));

    const params = {
      q: search,
      part: "snippet",
      maxResults: 10,
    };
    console.log("params: ", params);

    get("/search", { params })
      .then((rsp) => {
        console.log("Youtube rsp: ", rsp.data);
        dispatch(getRequestSearch(rsp.data));
      })
      .catch((error) => {
        console.log("ERROR", error);
        dispatch(setError(true));
      });
  };

  return (
    <div className="yb-sb-main_container">
      <img
        className="yb-sb-main_container-img_search"
        src="https://icongr.am/clarity/video-gallery.svg?size=30&color=CD0000"
        alt=""
      />
      <input
        className="yb-sb-main_container-input_search yb-general_text_font"
        onChange={(e) => handleOnChange(e)}
        name="search"
        type="text"
        value={search}
        placeholder="Enter request"
      />
      <Link to={`/videolist?search=${search}`}>
        <button className="yb-sb-main_container-btn_search yb-general_text_font" onClick={onSubmit}>
          {"Search"}
        </button>
      </Link>
      <Link to={`/videolist?search=${search}`}>
        <button className="yb-sb-main_container-btn_back yb-general_text_font" onClick={onSubmit}>
          {"Channel exit"}
        </button>
      </Link>
    </div>
  );
};

export default Searchbar;
