export interface AdminOrdersModel{
    orders: AdminOrder[],
    statuses: string[]
}

export type AdminOrder = {
    id: number;
    image: string;
    status: string;
}