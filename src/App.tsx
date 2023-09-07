import React, {useEffect} from 'react';
import './App.css';
import LoadingComponent from "./components/LoadingComponent";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import NavbarComponent from "./components/NavbarComponent";
import RestaurantsComponent from "./components/RestaurantsComponent";
import RestaurantPageComponent from "./components/RestaurantPageComponent";
import IngredientsComponent from "./components/IngredientsComponent";
import OrderListComponent from "./components/OrderListComponent";
import OrderInfoComponent from "./components/OrderInfoComponent";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "./store";
import {useAppDispatch} from "./hooks/ReduxHooks";
import {checkAuth} from "./store/actions/AuthAction";

function App() {

    const dispatch:ThunkDispatch<RootState, unknown, any> = useAppDispatch();

    useEffect(() => {
        if(localStorage.getItem("token")){
            dispatch(checkAuth());
        }
    }, [])

  return (
      <BrowserRouter>
        <NavbarComponent/>
          <Routes>
              <Route path="/login" element={<LoginComponent/>}/>
              <Route path="/register" element={<RegisterComponent/>}/>
              <Route path="/restaurants" element={<RestaurantsComponent/>}/>
              <Route path="/restaurants/:restid" element={<RestaurantPageComponent/>}/>
              <Route path="/restaurants/:restid/:foodid" element={<IngredientsComponent/>}/>
              <Route path="/orders" element={<OrderListComponent/>}/>
              <Route path="/orders/:orderid" element={<OrderInfoComponent/>}/>
          </Routes>
      </BrowserRouter>

  );
}

export default App;
