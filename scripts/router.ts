"use strict";

import {LoadHeader} from "./header.js";

export class Router{
    public routes: any;

    constructor(routes){
        this.routes = routes;
        this.init();
    }

    init(){

        window.addEventListener("DOMContentLoaded", () => {
           const path = location.hash.slice(1) || "/";
           console.log(`[INFO] Initial Page Load: ${path}`)
            this.loadRoute(path);
        });

        // fires on the usage of forward/back button.
        window.addEventListener("popstate", () => {
           console.log("[INFO] Navigating to ...")
            this.loadRoute(location.hash.slice(1));
        });

    }

    navigate(path){
        location.hash = path;
    }

    loadRoute(path){
        console.log(`[INFO] Loading route... ${path}`);

        const basePath = path.split("#")[0];

        if(!this.routes[basePath]){
            console.warn(`[WARNING] Route not found: ${basePath}, redirecting to 404.`)
            location.hash = "/404";
            path = "/404";
        }
        fetch(this.routes[basePath])
            .then(response => {
                if(!response.ok) throw new Error(`Failed to load ${this.routes[basePath]}`);
                return response.text();
            })
            .then(html => {
                let htmlMain = document.querySelector(`main`);
                if(htmlMain) {
                    htmlMain.innerHTML = html;
                }else{
                    console.error("[ERROR] Page Main failed to load.")
                }
                // Providing an event with path details each time loadRoute is loaded properly.
                LoadHeader().then(() => {
                    document.dispatchEvent(new CustomEvent("routeLoaded",{detail: basePath}));
                });
            })
            .catch(error => console.error("[ERROR] Error loading page: ", error));
    }
}