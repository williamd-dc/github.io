"use strict";
/*
Names: William Dawson, Hilaal Mansoor
Student IDs: 100945808, 100957010
Date: 02-22-2025
*/
import * as bootstrap from '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import {LoadHeader, UpdateActiveNavLink} from "./header.js";
import {Router} from "./router.js";
import {AuthGuard} from "./authguard.js";
import {User} from "./user.js";


const pageTitles = {
    "/" : "Home",
    "/home" : "Home",
    "/about" : "About",
    "/contact" : "Contact",
    "/products" : "Products",
    "/services" : "Services",
    "/contact-list" : "ContactList",
    "/login" : "Login",
    "/register" : "Register",
    "/edit" : "Edit",
    "/404" : "Error"
}

const routes = {
    "/": "views/pages/home.html",
    "/home": "views/pages/home.html",
    "/contact": "views/pages/contact.html",
    "/login": "views/pages/login.html",
    "/register": "views/pages/register.html",
    "/opportunities": "views/pages/opportunities.html",
    "/events": "views/pages/events.html",
    "/gallery": "views/pages/gallery.html",
    "/404": "views/pages/404.html",
    "/event-planning": "views/pages/event-planning.html",
    "/statistics": "views/pages/statistics.html",
};

const router = new Router(routes);


// IIFE - Immediately invoked functional expression.

(function () {

    document.addEventListener('DOMContentLoaded', function() {
        // Search functionality
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');
        if(!searchForm) {
            console.error("Search form not found")
            return;
        }

        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const query = (searchInput as HTMLInputElement).value.toLowerCase();
            if (query) {
                // Perform search logic here
                console.log('Searching for:', query);
                // Example: Redirect to a search results page
                window.location.href = `search.html?query=${encodeURIComponent(query)}`;
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('query');
        const resultsContainer = document.getElementById('results');

        if (query && resultsContainer) {
            // Perform search and display results
            resultsContainer.innerHTML = `<p>Results for "${query}":</p>`;
            // Example: Display a list of results
            const results = searchItems(query); // Implement this function to search your data
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.innerHTML = `<p>${result}</p>`;
                resultsContainer.appendChild(resultItem);
            });
        } else {
            console.error("No results found or container missing.");
        }
    });

    function searchItems(query) {
        // Implement your search logic here
        // Example: Return a list of matching items
        const items = ['Item 1', 'Item 2', 'Item 3']; // Replace with your actual data
        return items.filter(item => item.toLowerCase().includes(query));
    }

    document.addEventListener('DOMContentLoaded', function() {
        const dropdown = document.getElementById('navbarDropdown');
        if (dropdown) {
            const menu = dropdown.nextElementSibling as HTMLElement;

            dropdown.addEventListener('click', function (event) {
                event.preventDefault();
                menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
            });

            document.addEventListener('click', function (event) {
                if (!dropdown.contains(event.target as Node) && !menu.contains(event.target as Node)) {
                    menu.style.display = 'none';
                }
            });
        }else{
            console.error("No dropdown");
        }
    });

    /**
     * Checks to user.json file to see if we have a user matching input credentials then stores the user in
     * session storage if they match.
     */
    function DisplayLoginPage(){
        console.log("Calling DisplayLoginPage()");
        let messageArea = document.getElementById("messageArea") as HTMLElement;
        messageArea.style.display = "none";
        fetch('../data/user.json')
            .then(response => {
                // Check if the request was successful
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                let users = data;
                let userName = document.getElementById("username") as HTMLInputElement;
                let password = document.getElementById("password") as HTMLInputElement;
                let loginButton = document.getElementById("loginButton") as HTMLButtonElement;
                let validUser = new User;
                loginButton.addEventListener("click", function(){
                    let valid = false;
                    users["users"].forEach((user: any)=>{
                        if(user.Username === userName.value && user.Password === password.value){
                            valid = true;
                            validUser.fromJSON(user);
                        }
                    })
                    if(valid){
                        messageArea.style.display = "none";
                        window.sessionStorage.setItem(`user`, JSON.stringify({
                            displayName: validUser.displayName,
                            EmailAddress: validUser.emailAddress,
                            Username: validUser.username,
                        }));
                        location.hash = "/";
                    }else{
                        userName.focus();
                        messageArea.classList.add("alert", "alert-danger");
                        messageArea.textContent = "Username or password incorrect.";
                        messageArea.style.display = "block";
                    }
                })
            })
            .catch(error => {
                // Handle any errors
                console.error('There was a problem with the fetch operation:', error);
            });

        let cancelButton = document.getElementById("cancelButton") as HTMLButtonElement;
        cancelButton.addEventListener("click", function(){
            (document.getElementById("loginForm") as HTMLFormElement).reset();
            location.hash = "/";
        })
    }

    /**
     * displays the home page and runs the functions for it to work.
     */
    function DisplayHomePage(){
        console.log("Calling DisplayHomePage()");

        let aboutUsBtn = document.getElementById("getInvolvedBtn") as HTMLButtonElement;
        aboutUsBtn.addEventListener("click", function(){
            location.hash="/opportunities";
        });
    }

    /**
     * displays the opportunities page and runs all functions required for it to work.
     */
    function DisplayOpportunitiesPage(){
        console.log("Calling DisplayOpportunitiesPage()");

        fetch("data/events.json").then(response => response.json()).then(data => {
            const events = data.events;
            console.log(events);

            let pageData = `
        <tr>
            <td>#</td>
            <td>Title</td>
            <td>Description</td>
            <td>Date and Time</td>
            <td></td>
        </tr>
        `;
            let index = 1
            let opportunityList = document.getElementById("opportunities") as HTMLElement;
            for (const event of events) {
                pageData += `
                <tr>
                <td>${index}</td>
                <td>${event.title}</td>
                <td>${event.description}</td>
                <td>${event.date}</td>
                <td> <button id="getInvolved${index}" class="btn btn-primary" name="getInvolved">Sign Up</button></td>
            </tr>
            `
                index++;
            }
            opportunityList.innerHTML = pageData;

            let getInvolvedBtn = document.getElementsByName("getInvolved");
            const modalElement = document.getElementById(`formModal`)
            if(modalElement) {
                const formModal = new bootstrap.Modal(modalElement);

                for (const btn of getInvolvedBtn) {
                    btn.addEventListener("click", function () {
                        formModal.show(btn);
                    });
                }


                let formSubmit = document.getElementById("formModalSubmit") as HTMLButtonElement;
                let modalBody = document.querySelector('.modal-body') as HTMLElement;
                let modalHTML = modalBody.innerHTML;
                let formClose = document.getElementById("formModalCancel") as HTMLButtonElement;
                formSubmit.addEventListener("click", function () {
                    let modalName = document.getElementById("fullName") as HTMLInputElement;
                    let modalEmail = document.getElementById("emailAddress") as HTMLInputElement;
                    let modalRole = document.getElementById("preferredRole") as HTMLInputElement;
                    if (modalName.value.length > 0 && modalEmail.value.length > 0 && modalRole.value.length > 0) {
                        modalBody.innerHTML = `Submission confirmed.`;
                        setTimeout(function () {
                            formModal.hide();
                            modalBody.innerHTML = modalHTML;
                        }, 2000)
                    } else {
                        modalBody.innerHTML = modalHTML + `<br> Missing one or more fields.`
                    }
                })

            formClose.addEventListener("click", function () {
                modalBody.innerHTML = modalHTML;
            })
            }else{
                console.error("Modal not found!");
            }
        }).catch(error => console.error('Error loading events:', error));
    }

    /**
     * logs runs all functions required for the contacts page to work.
     */
    function DisplayContactsPage() {
        console.log("Calling DisplayContactsPage()");
        const confirmModalElement = document.getElementById(`confirmationModal`)
        if(!confirmModalElement) {
            console.error("Modal not found!");
            return;
        }

        let confModal = new bootstrap.Modal(confirmModalElement);
        let submitBtn = document.getElementById("Sendbtn") as HTMLButtonElement;
        submitBtn.addEventListener("click", function(event){
            event.preventDefault();
            let emailAddress = document.getElementById("emailAddress") as HTMLInputElement;
            let fullName = document.getElementById("fullName") as HTMLInputElement;
            let subject = document.getElementById("subject") as HTMLInputElement;
            let message = document.getElementById("message") as HTMLTextAreaElement;
            if(emailAddress.checkValidity() && fullName.checkValidity() && subject.checkValidity() && message.checkValidity()) {
                const modalBody = document.querySelector('.modal-body') as HTMLElement;
                modalBody.innerHTML = `
                    <p>Full Name: ${fullName.value}</p>
                    <p>Email Address: ${emailAddress.value}</p>
                    <p>Subject: ${subject.value}</p>
                    <p>Message: ${message.value}</p>
                `;
                confModal.show(submitBtn);
            } else {
                alert("Please fill out all required fields correctly.");
            }
        });
    }

    /**
     * runs all functions required for the display events page to work.
     */
    function DisplayEventsPage() {
        console.log(" Displaying Events Page...");

        fetch("data/events.json").then(response => response.json()).then(data => {
            const events = data.events;
            const calendarEl = document.getElementById('calendar') as HTMLElement;

            /**
             * Renders the calendar based on the events and the filter.
             * @param eventsToRender all the events
             * @param filter the category to filter by
             */
            function renderCalendar(eventsToRender: any[], filter: string) {
                calendarEl.innerHTML = '';

                const daysInMonth = new Date(2025, 2, 0).getDate(); // February 2025
                const firstDay = new Date(2025, 1, 1).getDay(); // February 1, 2025

                let calendarHTML = '<table class="table table-bordered"><thead><tr>';
                const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                daysOfWeek.forEach(day => {
                    calendarHTML += `<th>${day}</th>`;
                });
                calendarHTML += '</tr></thead><tbody><tr>';

                for (let i = 0; i < firstDay; i++) {
                    calendarHTML += '<td></td>';
                }
                for (let day = 1; day <= daysInMonth; day++) {
                    if ((day + firstDay - 1) % 7 === 0) {
                        calendarHTML += '</tr><tr>';
                    }
                    const event = eventsToRender.find(event => new Date(event.date).getUTCDate() === day);
                    if (event && event.category === filter || event && filter === 'all') {
                        const eventClass = filter === 'all' ? '' : (event.category === filter ? 'highlighted-event' : 'greyed-out-event');
                        calendarHTML += `<td class="${eventClass}">${day}<br>${event.title}</td>`;
                    } else {
                        calendarHTML += `<td>${day}</td>`;
                    }
                }

                calendarHTML += '</tr></tbody></table>';
                calendarEl.innerHTML = calendarHTML;
            }

            function callEvent(event: any) {
                console.log(`Calling event: ${event.title} on ${event.date} (${event.category})`);
            }

            renderCalendar(events, 'all');

            const addEventBtn = document.getElementById("addEventBtn") as HTMLButtonElement;
            addEventBtn.addEventListener("click", () => {
                const eventTitleInput = document.getElementById("eventTitle") as HTMLInputElement;
                const eventDateInput = document.getElementById("eventDate") as HTMLInputElement;
                const eventCategoryInput = document.getElementById("eventCategoryInput") as HTMLSelectElement;

                const title = eventTitleInput.value;
                const date = eventDateInput.value;
                const category = eventCategoryInput.value;

                if (title && date && category) {
                    const newEvent = {title, date, category};
                    events.push(newEvent);
                    renderCalendar(events, 'all');

                    eventTitleInput.value = "";
                    eventDateInput.value = "";
                    eventCategoryInput.value = "fundraisers";

                    console.log(`Event added: ${title} on ${date} (${category})`);
                    callEvent(newEvent);
                }
            });

            const eventCategoryFilter = document.getElementById("eventCategory") as HTMLSelectElement;
            eventCategoryFilter.addEventListener("change", () => {
                const filter = eventCategoryFilter.value;
                renderCalendar(events, filter);
            });
        }).catch(error => console.error('Error loading events:', error));
    }
    document.addEventListener("routeLoaded", (event) => {
        let CustomEvent = event as CustomEvent;
        const newPath = CustomEvent.detail;
        console.log(`[INFO] Route Loaded: ${newPath}`);
        LoadHeader().then(() => {
            HandlePageLogic(newPath);
        });
    });

    window.addEventListener("SessionExpired", () => {
        console.warn("[SESSION] Redirecting to login page due to inactivity");
        router.navigate("/login");
    });

    function HandlePageLogic(path){

        document.title = pageTitles[path] || "Untitled Page";
        const protectedRoutes = ["/event-planning", "/statistics"]
        if(protectedRoutes.includes(path)){
            AuthGuard(protectedRoutes);
        }

        switch(path){
            case "/":
            case "/home":
                DisplayHomePage();
                break;
            case "/contact":
                DisplayContactsPage();
                break;
            case "/login":
                DisplayLoginPage();
                break;
            case "/opportunities":
                DisplayOpportunitiesPage();
                break
            case "/events":
                DisplayEventsPage();
                break

            default:

                console.warn(`[WARNING] No display logic found for: ${path}`);
        }
    }

    /**
     * Start function that runs the right page based on page title. Invoked everytime any page is loaded.
     */
    function Start() {
        console.log("Starting....");
        console.log(`Current document title: ${document.title}`);

        //Load NavBar then run checklogin.
        LoadHeader().then( () => {
            UpdateActiveNavLink();
        });
        AuthGuard()


        const currentPath = location.hash.slice(1) || "/";
        router.loadRoute(currentPath);
    }window.addEventListener("DOMContentLoaded", Start);

})();