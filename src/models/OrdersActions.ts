export type OrderAction = SET_PRICE;

export type SET_PRICE = {
    type: "SET_PRICE",
    fullPrice: number
}