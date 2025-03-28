"use strict";

let sessionTimeout;

function resetSessionTimout(){
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
        console.warn("[WARNING] Session expired due to inactivity.");
        sessionStorage.removeItem("user");

        window.dispatchEvent(new CustomEvent("SessionExpired"));

    }, 15 * 60 * 1000);
}

//Listen for user activity
document.addEventListener("mousemove", resetSessionTimout);
document.addEventListener("keypress", resetSessionTimout);

export function AuthGuard(protectedRoutes = ["/events", "/opportunities"]){
    const user = sessionStorage.getItem("user");
    if(!user && protectedRoutes.includes(location.hash.slice(1))){
        console.log("[AUTHGUARD] unauthenticated user, redirecting...")
        window.dispatchEvent(new CustomEvent("SessionExpired"));
    }else{
        resetSessionTimout();
    }
}