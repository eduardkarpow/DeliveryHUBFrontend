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
import OrderModalComponent from "./components/OrderModalComponent";
import AccountComponent from "./components/AccountComponent";
import {ErrorHandlerHook} from "./hooks/ErrorHandler";
import AdminRestaurantsComponent from "./components/AdminRestaurantsComponent";
import AdminPickerComponent from "./components/AdminPickerComponent";
import AdminFoodComponent from "./components/AdminFoodComponent";
import AdminIngredientsComponent from "./components/AdminIngredientsComponent";
import AdminRouteComponent from "./AdminRouteComponent";

function App() {

    const dispatch:ThunkDispatch<RootState, unknown, any> = useAppDispatch();

    const isAuth = useAppSelector(store => store.Auth.isAuth);

    useEffect(() => {
        setTimeout(() => {
            if(!isAuth && localStorage.getItem("token")){
                dispatch(checkAuth())
            }
        }, 500)

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
                  <Route path="/account" element={<AccountComponent/>}/>
                  <Route path="/admin/restaurants" element={AdminRouteComponent(AdminRestaurantsComponent)}/>
                  <Route path="/admin/food/:restid" element={AdminRouteComponent(AdminFoodComponent)}/>
                  <Route path="/admin/ingredients/:foodid" element={AdminRouteComponent(AdminIngredientsComponent)}/>
                  <Route path="/admin" element={<AdminRouteComponent/>}/>
              </Routes>
              <OrderModalComponent/>
          </BrowserRouter>
      </div>


  );
}

export default App;
