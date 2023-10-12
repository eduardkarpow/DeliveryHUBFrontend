export interface OrdersStateModel{
    fullPrice: number;
    orders: Order[];
}
export interface OrderItemProps{
    id: number;
    name: string;
    price: number;
    image_href: string;
}
export type Order = {
    id_orders: number;
    price: number;
    payment_method: number;
    location: string;
    name:string;
    restaurant_image_href: string;
    order_status: string;
    status_color: string;
    datetime: string;
}
export type OrderProps = {
    id: number;
    restImage: string;
    fullPrice: number;
    time: string;
    date: string;
    status: string;
    statusColor: string;
}