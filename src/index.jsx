import React from "react";
import { render } from "react-dom";
import App from "./components/app/app";
import { Provider } from "react-redux";
import { createStore } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers/root_reducer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import ErrorHandle from "./components/error_handle/error_handle";
import { useSelector } from "react-redux";
import "./style.scss";

const store = createStore(reducers);
const history = {}; //syncHistoryWithStore(browserHistory, store);

// const StartPage = () => {
//   console.log("STRT!!!!");
//   const handleError = useSelector((state) => state.errorsReducer.handleError);
//   console.log("handleError: ", handleError);
//   return handleError ? <ErrorHandle /> : <Route path="/" component={App} />;
// };

render(
  <Provider store={store}>
    <Router history={history}>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <App /> */}
      </Routes>

      {/* <Routes>
        <Route path="/" component={App} />
        {/* <StartPage /> */}
      {/* </Routes> */}
      {/* AAZAZAZAZA */}
      {/* <Route path="/" component={App} /> */}
      {/* <div> */}
      {/* <StartPage /> */}
      {/* </div> */}
    </Router>
  </Provider>,
  document.getElementById("root")
);
