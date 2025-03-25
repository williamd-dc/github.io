"use strict";
/**
 * Loads the nav bar dynamically for each page.
 */
export function LoadHeader() {
    console.log("[INFO] Loading header...");
    return fetch("./views/components/header.html")
        .then(response => response.text())
        .then(data => {
        const header = document.querySelector("header");
        if (header) {
            header.innerHTML = data;
        }
        UpdateActiveNavLink();
        CheckLogin();
    })
        .catch(error => console.log(error));
}
/**
 * Updates the active nav link class to be equal to current page.
 */
export function UpdateActiveNavLink() {
    console.log("[INFO] Updating active nav link..");
    const currentPath = location.hash.slice(1) || "/";
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        if (link) {
            const linkPath = link.getAttribute("href")?.replace("#", "");
            if (linkPath === currentPath) {
                link.classList.add("active");
            }
            else {
                link.classList.remove("active");
            }
        }
    });
}
/**
 * Removes the user from session storage and redirects to home page.
 * @param event
 */
function handleLogout(event) {
    event.preventDefault();
    sessionStorage.removeItem("user");
    console.log("[INFO] User logged out. Updating UI...");
    LoadHeader().then(() => {
        CheckLogin();
        location.hash = "/";
    });
}
/**
 * Checks to see if the user is logged in, adjusting the navbar login/logout dynamically
 * based on if they are or are not logged in.
 */
function CheckLogin() {
    console.log("[INFO] Checking login...");
    const loginNav = document.getElementById("loginNav");
    const navBar = document.getElementById("navList");
    if (!loginNav || !navBar) {
        console.warn("Login Nav element not found.");
        return;
    }
    const userSession = sessionStorage.getItem("user");
    if (userSession) {
        loginNav.innerHTML = `<i class="fas fa-sign-out-alt"></i> Logout`;
        loginNav.href = "#";
        loginNav.removeEventListener("click", handleLogout);
        loginNav.addEventListener("click", handleLogout);
        navBar.insertAdjacentHTML("beforeend", `<li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        User Options
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#/event-planning">Event Planning</a></li>
                        <li><a class="dropdown-item" href="#/statistics">Statistics</a></li>
                    </ul>
                </li>`);
    }
    else {
        loginNav.innerHTML = `<i class="fas fa-sign-in-alt"></i> Login`;
        //location.hash = "/login";
        loginNav.removeEventListener("click", handleLogout);
        loginNav.addEventListener("click", () => location.hash = "/login");
    }
}
//# sourceMappingURL=header.js.map