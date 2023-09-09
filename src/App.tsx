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

import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "./store";
import {useAppDispatch, useAppSelector} from "./hooks/ReduxHooks";
import {checkAuth} from "./store/actions/AuthAction";

function App() {

    const dispatch:ThunkDispatch<RootState, unknown, any> = useAppDispatch();

    //const navigate = useNavigate();

    useEffect(() => {
        try{
            if(localStorage.getItem("token")){
                dispatch(checkAuth());
            }
        } catch(e){
            setTimeout(() => {
                window.location.replace('http://localhost:3000/login');
            }, 1000);

        }

    }, [])

    const isLoading = useAppSelector(store => store.Auth.isLoading);

  return (
      <div>
          {isLoading ? <LoadingComponent/> : <span/>}
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
      </div>


  );
}

export default App;
