"use strict";
document.addEventListener("routeLoaded", () => {
    if (location.hash.slice(1) != "/event-planning")
        return;
    const eventForm = document.getElementById("eventForm");
    const eventList = document.getElementById("eventList");
    const createEventBtn = document.getElementById("createEventBtn");
    createEventBtn.addEventListener("click", (e) => {
        console.log("createEventBtn", e);
        e.preventDefault(); // Prevents the default form submission behavior
        const eventName = document.getElementById("eventName").value;
        const eventDate = document.getElementById("eventDate").value;
        const eventTime = document.getElementById("eventTime").value;
        const eventLocation = document.getElementById("eventLocation").value;
        const eventDescription = document.getElementById("eventDescription").value;
        if (eventName && eventDate && eventTime && eventLocation && eventDescription) {
            const event = {
                name: eventName,
                date: eventDate,
                time: eventTime,
                location: eventLocation,
                description: eventDescription
            };
            addEventToList(event);
            saveEvent(event);
            displayFieldsAsText();
            eventForm.reset();
        }
        else {
            alert("Please fill in all fields.");
        }
    });
    function addEventToList(event) {
        const li = document.createElement("li");
        li.textContent = `${event.name} - ${event.date} ${event.time} at ${event.location}: ${event.description}`;
        eventList.appendChild(li);
    }
    function saveEvent(event) {
        const events = JSON.parse(localStorage.getItem("events") || "[]");
        events.push(event);
        localStorage.setItem("events", JSON.stringify(events));
    }
    function loadEvents() {
        const events = JSON.parse(localStorage.getItem("events") || "[]");
        events.forEach(addEventToList);
    }
    function displayFieldsAsText() {
        const eventName = document.getElementById("eventName");
        const eventDate = document.getElementById("eventDate");
        const eventTime = document.getElementById("eventTime");
        const eventLocation = document.getElementById("eventLocation");
        const eventDescription = document.getElementById("eventDescription");
        eventName.outerHTML = `<span>${eventName.value}</span>`;
        eventDate.outerHTML = `<span>${eventDate.value}</span>`;
        eventTime.outerHTML = `<span>${eventTime.value}</span>`;
        eventLocation.outerHTML = `<span>${eventLocation.value}</span>`;
        eventDescription.outerHTML = `<span>${eventDescription.value}</span>`;
    }
    loadEvents();
});
//# sourceMappingURL=event-planning.js.map