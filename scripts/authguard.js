"use strict";

(function() {

    if(!sessionStorage.getItem("user")){
     console.log("[AUTHGUARD] unauthenticated user, redirecting...")
     location.href = "login.html"
    }
})();