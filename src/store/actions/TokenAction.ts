import * as jose from "jose";
import {PayloadType, TokenModel} from "../../models/TokenModel";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {AnyAction} from "redux";
import {JWTPayload} from "jose";
export const generateTokens = (payload:PayloadType):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        const access_secret = jose.base64url.decode("NMZuPdFWv09DSvoKon1UOXdzfnlD+W84R4Ydd69jRYA=\n");
        const access_token = await new jose.EncryptJWT(payload)
            .setProtectedHeader({alg: 'dir', enc: 'A128CBC-HS256'})
            .setIssuedAt()
            .setIssuer("test")
            .setAudience("test")
            .setExpirationTime("2h")
            .encrypt(access_secret);
        const refresh_secret = jose.base64url.decode("41e5wvNz1djs2i7p+lcHkt35JC0vthLCdZokzyJSDU8=\n");
        const refresh_token = await new jose.EncryptJWT(payload)
            .setProtectedHeader({alg: 'dir', enc: 'A128CBC-HS256'})
            .setIssuedAt()
            .setIssuer("test")
            .setAudience("test")
            .setExpirationTime("2m")
            .encrypt(refresh_secret);
        return {
            access_token,
            refresh_token
        }
    }

}
export const saveToken = (login:string, accessToken:string, refreshToken:string):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        const tokenData:TokenModel = await fetch("http://localhost:8000/tokens/getTokens", {
            method: "POST",
            body: JSON.stringify({"users_login": login})
        }).then(res => res.json());
        if(tokenData){
            const newTokensData = {
                "access_token": accessToken,
                "refresh_token": refreshToken,
                "id":{
                    "users_login": login
                }
            }
            const resp = fetch("http://localhost:8000/tokens/updateTokens", {
              method: "POST",
              body: JSON.stringify(newTokensData)
            })
        } else{
            const res = await fetch("http://localhost:8000/tokens/setTokens", {
                method: "POST",
                body: JSON.stringify({"access_token": accessToken, "refresh_token": refreshToken, "users_login": login})
            })
        }
    }
}
export const deleteTokens = (login:string):ThunkAction<void, RootState,unknown,AnyAction> => {
    return async dispatch => {
        const res = await fetch("http://localhost:8000/tokens/deleteTokens", {
            method: "POST",
            body: JSON.stringify({"users_login":login})
        });
    }
}
export const validateAccessToken = (token:string):any => {
    try {
        // @ts-ignore
        const userData = "Adad";//JWT.verify(token, process.env.SECRET_JWT_ACCESS_KEY);
        return userData;
    } catch (e){
        console.error(e);
    }
}
export const validateRefreshToken = (token:string):any => {
    try {
        // @ts-ignore
        const userData = "asdas;dl,";//JWT.verify(token, process.env.SECRET_JWT_REFRESH_KEY);
        return userData;
    } catch (e){
        console.error(e);
    }
}