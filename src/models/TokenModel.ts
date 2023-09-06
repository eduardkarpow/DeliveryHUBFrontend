import {JWTPayload} from "jose";

export interface PayloadType extends JWTPayload {
    login: string;
    password: string;
    phone: string;
    firstName: string;
    lastName: string;
}
export interface TokenModel{
    access_token: string;
    refresh_token: string;
    users_login: string;
}
export interface Tokens{
    accessToken: string;
    refreshToken: string;
}