import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import App from "./App";

// Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

// Create Store
const store = createStore(reducers, compose(applyMiddleware(thunk)));

// Render App
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
