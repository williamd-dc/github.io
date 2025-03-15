"use strict";


import {LoadHeader, UpdateActiveNavLink} from "./header.js"
import {Router} from "./router.js";
import {LoadFooter} from "./footer.js";
import {AuthGuard} from "./authguard.js";

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
    "/about": "views/pages/about.html",
    "/contact": "views/pages/contact.html",
    "/services": "views/pages/services.html",
    "/contact-list": "views/pages/contact-list.html",
    "/edit": "views/pages/edit.html",
    "/login": "views/pages/login.html",
    "/register": "views/pages/register.html",
    "/products": "views/pages/products.html",
    "/404": "views/pages/404.html",
};

const router = new Router(routes);

//IIFE - Immediately invoked functional expression.
(function () {


    function TestFullName(){
        let messageArea = $("#messageArea");
        // Making the regex                 first name      spacing     last name.
        let fullNamePattern = /^([A-Z][a-z]{1,25})+(\s|,|-)([A-Z][a-z]{1,25})+$/;

        $("#fullName").on("blur", function () {
           let fullNameText = $(this).val();
           // Validating input
           if(!fullNamePattern.test(fullNameText)){
               $(this).trigger("focus");
               $(this).trigger("select");
               messageArea.addClass("alert alert-danger");
               messageArea.text("Please enter a valid first and last name. [firstName] {middleName} [lastName]")
               messageArea.show();
           }else{
               messageArea.removeAttr("class");
               messageArea.hide();
           }
        });
    }

    function AddContact(fullName, contactNumber, emailAddress){

        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize()){
            // the primary key for a contact --> contact_+ data & time
            let key = `contact_${Date.now()}`
            localStorage.setItem(key, contact.serialize());
        }
    }

    function DisplayEditContactPage(){
        console.log("DisplayEditContactPage() called...");

        const page = location.hash.split("#")[2];
        console.log(page);


        switch(page){
            case "add": {
                const heading = document.querySelector("main>h1");
                const editButton = document.getElementById("editButton");
                const cancelButton = document.getElementById("cancelButton");

                document.title = "Add Contact";

                if (heading) {
                    heading.textContent = "Add Contact";
                }

                if (editButton) {
                    editButton.innerHTML = `<i class="fa-solid fa-user-plus"></i> Add Contact`;
                    editButton.addEventListener("click", () => {
                        //Prevent default form submission.
                        event.preventDefault();

                        AddContact(
                            document.getElementById("fullName").value,
                            document.getElementById("contactNumber").value,
                            document.getElementById("emailAddress").value,
                        );
                        router.navigate("/contact-list");
                    });


                }

                if (cancelButton) {
                    cancelButton.addEventListener("click", () => {
                        router.navigate("/contact-list");
                    });
                }
                }
                break;
            default: {

                const contact = new core.Contact();
                const contactData = localStorage.getItem(page)

                if (contactData) {
                    contact.deserialize(contactData);
                }

                document.getElementById("fullName").value = contact.fullName
                document.getElementById("contactNumber").value = contact.contactNumber;
                document.getElementById("emailAddress").value = contact.emailAddress;


                const editButton = document.getElementById("editButton");
                const cancelButton = document.getElementById("cancelButton");


                if (editButton) {
                    editButton.addEventListener("click", () => {
                        event.preventDefault();

                        contact.fullName = document.getElementById("fullName").value;
                        contact.contactNumber = document.getElementById("contactNumber").value;
                        contact.emailAddress = document.getElementById("emailAddress").value;

                        localStorage.setItem(page, contact.serialize());
                        router.navigate("/contact-list");

                    });
                }

                if (cancelButton) {
                    cancelButton.addEventListener("click", () => {
                        router.navigate("/contact-list");
                    });
                }
            }
                break;
        }
    }

    async function DisplayWeather(){
        const apiKey = "87f25517c7740d00aee5baa5c25dc24e";
        const city ="Oshawa";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try{
            const response = await fetch(url)

            // Not 200 series status code.
            if(!response.ok){
                throw new Error("Failed to fetch weather data from openweathermap.org.")
            }

            const data = await response.json();
            console.log("Weather API Response", data)

            const weatherDataElement = document.getElementById("weather-data");
            weatherDataElement.innerHTML = `<strong>City: </strong> ${data.name} <br>
                                            <strong>Temperature: </strong> ${data.main.temp} <br>
                                            <strong>Weather: </strong> ${data.weather[0].description}`;

        }catch(error){
            console.error("Error fetching weather data", error);
            document.getElementById("weather-data").textContent = "Unable to contact weather data at this time.";
        }
    }

    function DisplayHomePage(){
        console.log("Calling DisplayHomePage()");

        const main = document.querySelector("main");
        main.innerHTML = ``;

        main.insertAdjacentHTML(
            "beforeend",
            `<button id="AboutUsBtn" class="btn btn-primary">About Us</button>
             <div id="weather" class="ht-5">
                <h3>Weather Information</h3>
                <p id="weather-data">Fetching weather data...</p>
            </div>
            
             <p id="MainParagraph" class="mt-5">This is my main paragraph</p>
             <article class="container">
                <p id="ArticleParagraph" class="mt-3">This is my article paragraph.</p>
             </article>
        `
        )

        const aboutUsBtn = document.getElementById("AboutUsBtn");


        // Arrow notation
        aboutUsBtn.addEventListener("click", () => {
            router.navigate("/about");
        });

        //Add call to weathermap.org
        DisplayWeather();

    }

    function DisplayAboutPage(){
        console.log("Calling DisplayAboutPage()");

    }

    function DisplayProductsPage(){
        console.log("Calling DisplayProductsPage()");
    }

    function DisplayContactsPage(){
        console.log("Calling DisplayContactsPage()");

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function(){
           if(subscribeCheckbox.checked){
               let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);
                if(contact.serialize()){
                    // the primary key for a contact --> contact_+ data & time
                    let key = `contact_${Date.now()}`
                    localStorage.setItem(key, contact.serialize());
                }
           }
        });

        const contactListButton = document.getElementById("showContactList");

        contactListButton.addEventListener("click", function(event){
           event.preventDefault();
           router.navigate("/contact-list");
        });
    }

    function DisplayContactListPage(){
        console.log("Calling DisplayContactListPage()");

        console.log(localStorage.length);
        if(localStorage.length > 0){
            console.log("Local Storage Access")
            let contactList = document.getElementById("contactList");
            let data = "";

            let keys = Object.keys(contactList);
            console.log(keys);

            let index = 1;
            for(const key of keys){

                if(key.startsWith("contact_")) {
                    let contactData = localStorage.getItem(key);

                    try{
                        console.log(contactData);
                        let contact = new core.Contact();
                        contact.deserialize(contactData);

                        data += `<tr>
                                    <th scope="row" class="text-center">${index}</th>
                                    <td>${contact.fullName}</td>
                                    <td>${contact.contactNumber}</td>
                                    <td>${contact.emailAddress}</td>
                                    <td class="text-center">
                                    <button value="${key}" class="btn btn-warning btn-sm edit"> <i class="fa-solid fa-pen-to-square"></i> Edit </button>
                                    </td>
                                    <td>
                                    <button value="${key}" class="btn btn-danger btn-sm delete"> <i class="fa-solid fa-trash"></i> Delete </button>
                                    </td>
                                    </tr>`;

                    }catch(error){
                        console.error("Error deserializing contact data.")
                    }
                }else{
                    console.warn("Skipping non-contact key")
                }

            }
            contactList.innerHTML = data;
        }

        const addButton = document.getElementById("addButton");
        if(addButton) {
            addButton.addEventListener("click", () => {
                router.navigate("/edit#add");
            });
        }

        const deleteButtons = document.querySelectorAll("button.delete")
        deleteButtons.forEach((button) => {
            button.addEventListener("click", function() {

                const contactKey = this.value
                console.log(`[DEBUG] Deleting contact ID: ${contactKey}`)
                if(!contactKey.startsWith("contact_")){
                    console.error("[ERROR] Invalid contact key format: ", contactKey);
                }
                if(confirm("Delete contact, please confirm?")){
                    localStorage.removeItem(this.value);
                    DisplayContactListPage();
                }
            });
        });

        const editButtons = document.querySelectorAll("button.edit");
        editButtons.forEach((button) => {
            button.addEventListener("click", function() {
                router.navigate(`/edit#${this.value}`);
            });
        });
    }

    function DisplayServicesPage(){
        console.log("Calling DisplayServicesPage()");
    }

    function DisplayLoginPage(){
        console.log("Calling DisplayLoginPage()");
        let messageArea = document.getElementById("messageArea");
        messageArea.style.display = "none";
        fetch('data/user.json')
            .then(response => {
                // Check if the request was successful
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                let users = data;
                let userName = document.getElementById("username");
                let password = document.getElementById("password");
                let loginButton = document.getElementById("loginButton");
                let validUser = new core.User();
                loginButton.addEventListener("click", function(){
                    let valid = false;
                    users["users"].forEach((user)=>{
                        if(user.Username === userName.value && user.Password === password.value){
                            valid = true;
                            validUser.fromJSON(user);
                        }
                    })
                    if(valid){
                        messageArea.style.display = "none";
                        window.sessionStorage.setItem(`user`, JSON.stringify({
                            DisplayName: validUser.DisplayName,
                            EmailAddress: validUser.EmailAddress,
                            Username: validUser.Username,
                        }));

                        LoadHeader().then(() => {
                            router.navigate("/contact-list");
                        });
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

        let cancelButton = document.getElementById("cancelButton");
        cancelButton.addEventListener("click", function(){
            document.getElementById("loginForm").reset();
            router.navigate("/")
        })
    }


    function DisplayRegisterPage(){
        console.log("Calling DisplayRegisterPage()");
    }

    document.addEventListener("routeLoaded", (event) => {
        const newPath = event.detail;
        console.log(`[INFO] Route Loaded: ${newPath}`);
        LoadHeader().then(() => {
            HandlePageLogic(newPath);
            });
    });

    /**
     * listen for timeout and then redirect user to login page when they do timeout.
     */
    window.addEventListener("SessionExpired", () => {
       console.warn("[SESSION] Redirecting to login page due to inactivity");
       router.navigate("/login");
    });

    function HandlePageLogic(path){

        document.title = pageTitles[path] || "Untitled Page";
        const protectedRoutes = ["/contact-list", "/edit"]
        if(protectedRoutes.includes(path)){
            AuthGuard();
        }

        switch(path){
            case "/":
            case "/home":
                DisplayHomePage();
                break;
            case "/about":
                DisplayAboutPage();
                break;
            case "/products":
                DisplayProductsPage();
                break;
            case "/services":
                DisplayServicesPage();
                break;
            case "/contact":
                DisplayContactsPage();
                break;
            case "/contact-list":
                DisplayContactListPage();
                break;
            case "/edit":
                DisplayEditContactPage();
                break;
            case "/login":
                DisplayLoginPage();
                break;
            case "/register":
                DisplayRegisterPage();
                break;
            default:
                console.warn(`[WARNING] No display logic found for: ${path}`);
        }
    }

    function Start() {
        console.log("Starting....");
        console.log(`Current document title: ${document.title}`);

        //Load NavBar then run checklogin.
        LoadHeader().then( () => {
            UpdateActiveNavLink();
        });
        LoadFooter()
        AuthGuard()


        const currentPath = location.hash.slice(1) || "/";
        router.loadRoute(currentPath);


    }window.addEventListener("DOMContentLoaded", () =>{
        console.log("DOM fully loaded and parsed");
        Start()
    });
})();