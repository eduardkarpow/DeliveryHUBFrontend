import {AnyAction} from "redux";
import {RootState} from "../index";
import {ThunkAction} from "redux-thunk";
import {MenuItemModel} from "../../models/RestaurantItemModel";
import {getAllOrdersActionCreator, setPriceActionCreator} from "../OrdersReducer";
import {Order} from "../../models/OrdersModel";

export const setPrice = (menu:MenuItemModel[]):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        dispatch(setPriceActionCreator(menu.reduce((s:number,a:MenuItemModel) => s + a.price * a.amount, 0)));
    }
}
export const makeOrder = (menu:MenuItemModel[], restId:number, fullPrice:number, payByCard:boolean, login:string, location:string):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        const date = new Date();
        const datetime = date.toISOString().slice(0, 19).replace('T', '').replaceAll("-", "").replaceAll(":", "");
        const order:any = await fetch("/addOrder", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price: fullPrice,
                paymentMethod: Number(payByCard),
                location,
                login,
                restaurantId: restId,
                orderStatus: "WAITING FOR PAYMENT",
                datetime: datetime
            })
        }).then(res => res.json());
        menu.map((el:MenuItemModel) => {
            if(el.amount){
                fetch("/addOrderElement", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        food_item_id: el.id,
                        order_id: order["id_orders"],
                        amount: el.amount
                    })
                })
            }
        })
    }
}
export const getAllOrders = (login:string):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        const orders:Order[] = await fetch("/getOrders", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login
            })
        }).then(res => res.json());
        console.log(login);
        dispatch(getAllOrdersActionCreator(orders));
    }
}