"use strict";

//IIFE - Immediately invoked functional expression.
(function () {

    function DisplayHomePage(){
        console.log("Calling DisplayHomePage()");

        let aboutUsBtn = document.getElementById("AboutUsBtn");
        aboutUsBtn.addEventListener("click", function(){
            location.href="about.html";
        });

        let mainContent = document.getElementsByTagName("main")[0];

        let mainParagraph = document.createElement("p");
        mainParagraph.setAttribute("id", "mainParagraph");
        mainParagraph.setAttribute("class", "mt-3");

        mainParagraph.textContent = "This is the first paragraph";
        mainContent.appendChild(mainParagraph);

        let FirstString = "This is";
        // `` represents a string literal, allowing  you to use variables in a string.
        let SecondString = `${FirstString} the second Paragraph`;
        mainParagraph.textContent = SecondString;
        mainContent.appendChild(mainParagraph);

        let DocumentBody = document.body;
        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3"> This is my article</p>`;

        ArticleParagraph.setAttribute("class", "container");
        Article.innerHTML = ArticleParagraph;
        DocumentBody.appendChild(Article);

    }

    function DisplayAboutPage(){
        console.log("Calling DisplayAboutPage()");

    }

    function DisplayProductsPage(){
        console.log("Calling DisplayProductsPage()");
    }

    function DisplayContactsPage(){
        console.log("Calling DisplayContactsPage()");
    }

    function DisplayServicesPage(){
        console.log("Calling DisplayServicesPage()");
    }

    function Start() {
        console.log("Starting....");



        switch(document.title){
            case "Home":
                DisplayHomePage();
                break
            case "About":
                DisplayAboutPage();
                break
            case "Products":
                DisplayProductsPage();
                break
            case "Contact":
                DisplayContactsPage();
                break
            case "Services":
                DisplayServicesPage();
                break
        }

    }window.addEventListener("load", Start);
})();