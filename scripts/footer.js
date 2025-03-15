"use strict";

export function LoadFooter() {
    return fetch("views/components/footer.html")
        .then(response => response.text())
        .then(text => {
           document.querySelector("footer").innerHTML = text;
        })
        .catch(error => console.log("[ERROR] Failed to load footer:", error));
}