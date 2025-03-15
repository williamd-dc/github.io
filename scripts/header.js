"use strict";

/**
 * Dynamically loads the header from header.html component.
 * */
export function LoadHeader() {
    console.log("[INFO] Loading header...");

    return fetch("./views/components/header.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("header").innerHTML = data;
            UpdateActiveNavLink();
            CheckLogin();
        })
        .catch(error => console.log(error));
}


export function UpdateActiveNavLink() {
    console.log("[INFO] Updating active nav link..");

    const currentPath = location.hash.slice(1) || "/";
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href").replace("#", "");

        if (linkPath === currentPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    })
}

function handleLogout(event){
    event.preventDefault();

    sessionStorage.removeItem("user");
    console.log("[INFO] User logged out. Updating UI...");

    LoadHeader().then(() => {
        CheckLogin();
        location.hash = "/";
    });
}

function CheckLogin(){
    console.log("Checking user login status")

    const loginNav = document.getElementById("loginNav");
    if (!loginNav) {
        console.warn("Login Nav element not found.")
        return;
    }

    const userSession = sessionStorage.getItem("user");
    if (userSession) {
        loginNav.innerHTML = `<i class="fas fa-sign-out-alt"></i> Logout`;
        loginNav.href = "#";
        loginNav.removeEventListener("click", handleLogout);
        loginNav.addEventListener("click", handleLogout);
    }else{
        loginNav.innerHTML = `<i class="fas fa-sign-in-alt"></i> Login`;
        //location.hash = "/login";
        loginNav.removeEventListener("click", handleLogout);
        loginNav.addEventListener("click", () => location.hash = "/login");
    }
}
