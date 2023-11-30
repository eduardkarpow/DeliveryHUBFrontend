export interface AuthStateModel{
    login: string;
    phone: string;
    password: string;
    firstName: string;
    lastName: string;
    isAuth: boolean;
    isLoading: boolean;
    avatarHref: string;
    isAdmin: number;
}