export interface OrderInfoModel{
    id: number;
    name: string;
    restImage: string;
    fullPrice: number;
    datetime: string;
    status: string;
    statusColor: string;
    restId: number;
    orderElements: orderElement[];
}
export type orderElement = {
    id: number;
    image: string;
    name: string;
    price: number;
    amount: number;
    foodId: number;
}
export type menuPositionProps = {
    amount: number;
    name: string;
    image: string;
    price: number;
    foodId: number;
    restId: number;
}