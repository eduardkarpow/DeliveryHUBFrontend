export type AuthActions = LOGIN | REGISTER | LOGOUT | AUTH;
export interface LOGIN{
    type: "LOGIN";
    login: string;
    password: string;
    phone: string;
    firstName: string;
    lastName: string;
}
export interface REGISTER{
    type: "REGISTER";
    login: string;
    password: string;
    phone: string;
    firstName: string;
    lastName: string;
}
export interface LOGOUT{
    type: "LOGOUT";
}
export interface AUTH{
    type: "AUTH";
    isAuth: boolean;
}