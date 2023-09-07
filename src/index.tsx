import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store";
import * as FetchIntercept from "fetch-intercept";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const BASE_URL = "http://localhost:8000";
const unregister = FetchIntercept.register({
    request: (url, config) => {

        const updatedConfig = config;

        updatedConfig.credentials = "include";
        updatedConfig.mode = "cors";
        updatedConfig.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
        return [BASE_URL+url, updatedConfig];
    },
    requestError: function (error) {
        return error;
    },

    response: function (response) {
        return response;
    },

    responseError: async function (error) {
        const originalRequest = error.config;
        const originalUrl = error.url;
        if(error.response.status === 401){
            const data = await fetch("/refresh", {
                method: "GET"
            }).then(res => res.json());
            localStorage.setItem("token", data.accessToken);
            return fetch(originalUrl, originalRequest);
        }
        return error;
    },
})
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
