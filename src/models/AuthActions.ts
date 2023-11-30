export type AuthActions = LOGIN | REGISTER | LOGOUT | AUTH | LOADING | AVATAR;
export interface LOGIN{
    type: "LOGIN";
    login: string;
    password: string;
    phone: string;
    firstName: string;
    lastName: string;
    isAdmin: number;
}
export interface REGISTER{
    type: "REGISTER";
    login: string;
    password: string;
    phone: string;
    firstName: string;
    lastName: string;
    isAdmin: number;
}
export interface LOGOUT{
    type: "LOGOUT";
}
export interface AUTH{
    type: "AUTH";
    isAuth: boolean;
}
export interface LOADING{
    type: "LOADING";
    isLoading: boolean;
}
export interface AVATAR{
    type: "AVATAR";
    avatarHref: string;
}