import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { createStore } from "redux";
import firebase from "firebase";
import reducer from "./redux/reducer";

var firebaseConfig = {
  apiKey: "AIzaSyD6079Njargyfs22BUfRRraPVzx-rKqjYM",
  authDomain: "teckytrick-dfc0c.firebaseapp.com",
  projectId: "teckytrick-dfc0c",
  storageBucket: "teckytrick-dfc0c.appspot.com",
  messagingSenderId: "683598127023",
  appId: "1:683598127023:web:b41ed8c11fff75c408595a",
  measurementId: "G-6JYL43KFQ5",
};

firebase.initializeApp(firebaseConfig);

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
