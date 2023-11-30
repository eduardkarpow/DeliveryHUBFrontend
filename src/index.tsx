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
// @ts-ignore
const unregister = FetchIntercept.register({
    request: (url, config) => {

        const updatedConfig = config;

        updatedConfig.credentials = "include";
        updatedConfig.mode = "cors";
        updatedConfig.headers = {
            ...config.headers,
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
        return [BASE_URL+url, updatedConfig];
    },
    requestError: function (error) {
        console.log("req error");
        return error;
    },

    // @ts-ignore
    response: async function (resp) {
        /*if(resp.status == 403){
            console.log(resp);
        }
        console.log(resp);
        const originalRequest = resp.request;
        const originalUrl = resp.url;
        if(resp.status === 403){
            const data = await fetch("/refresh", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            //if(!data){
            //    return resp;
            //}
            //localStorage.setItem("token", data.accessToken);
            return fetch(originalUrl, originalRequest);
        }*/
        return resp;
    },

    responseError: async function (error) {
        console.log(error);
        console.log("error");

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
