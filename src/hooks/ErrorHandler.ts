import react from "react";

export function ErrorHandlerHook(e:Error){
    alert(e.message);
}
