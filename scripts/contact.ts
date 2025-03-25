"use strict";
     /**
      * this will set
      */
     document.addEventListener("DOMContentLoaded", function() {
         const contactForm = document.getElementById("contactForm") as HTMLFormElement;

         contactForm.addEventListener("submit", function(event) {
             event.preventDefault();

             const formData = new FormData(contactForm);
             const data = Object.fromEntries(formData.entries());

             fetch("/submitFeedback", {
                 method: "POST",
                 headers: {
                     "Content-Type": "application/json"
                 },
                 body: JSON.stringify(data)
             })
             .then(response => response.json())
             .then(result => {
                 // Check if the response was successful
                 if (result.success) {
                     const modalBody = document.querySelector('.modal-body');
                     if(modalBody) {
                         modalBody.innerHTML = `
                         <p>Full Name: ${data.fullName}</p>
                         <p>Email Address: ${data.emailAddress}</p>
                         <p>Subject: ${data.subject}</p>
                         <p>Message: ${data.message}</p>
                     `;
                     }else{
                         console.error("Modal Not found")
                     }
                     const confirmationModalElement = document.getElementById('confirmationModal')
                     if(confirmationModalElement) {
                         const confirmationModal = new bootstrap.Modal(confirmationModalElement);
                         // Show the modal and reset the form fields
                         confirmationModal.show();
                         (contactForm as HTMLFormElement).reset();
                     }else{
                         console.error("Modal Not found")
                     }
                 } else {
                     alert("There was an error submitting your feedback. try again.");
                 }
             })
             .catch(error => {
                 console.error("Error:", error);
                 alert("There was an error submitting your feedback. Please try again.");
             });
         });
     });

     /**
      * Represents a Contact with a name, contact number and email address.
      */
     class Contact {

         /**
          * Constructs a new Contact instance
          * @param fullName
          * @param contactNumber
          * @param emailAddress
          */
         constructor(fullName = "", contactNumber = "", emailAddress = "") {
             this.fullName = fullName;
             this.contactNumber = contactNumber;
             this.emailAddress = emailAddress;
         }

         /**
          * Gets the full name of the contact
          * @returns {string}
          */
         get fullName() {
             return this.fullName;
         }

         /**
          * Sets the full name of contact. Validates input to ensure it's a non-empty string.
          * @param value
          */
         set fullName(value) {
             if( typeof value !== "string" || value.trim() === ""){
                 throw new Error("Invalid fullName: must be non-empty string");
             }
             this.fullName = value;
         }

         /**
          * Gets the contact number of the contact
          * @returns {string}
          */
         get contactNumber() {
             return this.contactNumber;
         }

         /**
          * Sets the contact number of the contact. validates input to ensure that it matches 10 digit format.
          * @param value
          */
         set contactNumber(value) {
             const phoneRegex = /^\d{3}-\d{3}-\d{4}$/; // 555-555-5555
             if(!phoneRegex.test(value)){
                 throw new Error("Invalid contact number: must be a 10 digit number");
             }
             this.contactNumber = value;
         }

         /**
          * Gets the email address for the contact
          * @returns {string}
          */
         get emailAddress() {
             return this.emailAddress;
         }

         /**
          * Sets the email address of the contact. Validates to ensure that it matches a valid email.
          * @param value
          */
         set emailAddress(value) {
             const emailRegex = /^[^\s@]+@[\s@]+\.[^\s@]+$/
             if(!emailRegex.test(value)){
                 throw new Error("Invalid email address: must be a valid email address");
             }
             this.emailAddress = value;
         }

         /**
          * Converts the contact details into a human-readable string.
          * @returns {string}
          */
         toString() {
             return `Full Name: ${this.fullName}\n Contact Number: ${this.contactNumber}\n Email Address: ${this.emailAddress}`;
         }

         /**
          * Serializes the contact details into a string format suitable for storage.
          * @returns {string|null}
          */
         serialize(){
             if(!this.fullName || !this.contactNumber || !this.emailAddress) {
                 console.error("One or more of the contact properties are missing or invalid.")
                 return null;
             }
             return `${this.fullName}, ${this.contactNumber}, ${this.emailAddress}`;
         }

         /**
          * Deserializes a string (comma-delimited) of contact details and update properties.
          * @param data
          */
         deserialize(data) {
             if(typeof data !== "string" || data.split(",").length !== 3){
                 console.error("Invalid Data format for deserializing data.");
                 return;
             }
             const propArray = data.split(",");
             this.fullName = propArray[0];
             this.contactNumber = propArray[1];
             this.emailAddress = propArray[2];
         }
     }