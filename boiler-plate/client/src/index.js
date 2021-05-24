import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

// 원래는 createStore 만해서 store를 redux에서 생성하는 건데 
// 미들웨어를 이용하여 객체의 action만 받는 store가 Promise, Function도 받을 수 있도록 설정
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  <Provider 
      store={createStoreWithMiddleware(Reducer, 
          window._REDUX_DEVTOOLS_EXTENSION__ &&
          window._REDUX_DEVTOOLS_EXTENSION__()
        )}
  > // redux랑 App이랑 연결 
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
