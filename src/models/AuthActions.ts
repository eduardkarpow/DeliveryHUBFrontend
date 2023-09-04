export type AuthActions = LOGIN | REGISTER | LOGOUT;
export interface LOGIN{
    type: "LOGIN";
    login: string;
    password: string;
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