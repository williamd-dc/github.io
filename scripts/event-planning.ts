document.addEventListener("routeLoaded", () => {
        if(location.hash.slice(1) != "/event-planning") return;
        const eventForm = document.getElementById("eventForm") as HTMLFormElement;
        const eventList = document.getElementById("eventList") as HTMLUListElement;
        const createEventBtn = document.getElementById("createEventBtn") as HTMLButtonElement;

        createEventBtn.addEventListener("click", (e) => {
            console.log("createEventBtn", e);
            e.preventDefault(); // Prevents the default form submission behavior

            const eventName = (document.getElementById("eventName") as HTMLInputElement).value;
            const eventDate = (document.getElementById("eventDate") as HTMLInputElement).value;
            const eventTime = (document.getElementById("eventTime") as HTMLInputElement).value;
            const eventLocation = (document.getElementById("eventLocation") as HTMLInputElement).value;
            const eventDescription = (document.getElementById("eventDescription") as HTMLTextAreaElement).value;

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
            } else {
                alert("Please fill in all fields.");
            }
        });

        function addEventToList(event: { name: string, date: string, time: string, location: string, description: string }) {
            const li = document.createElement("li");
            li.textContent = `${event.name} - ${event.date} ${event.time} at ${event.location}: ${event.description}`;
            eventList.appendChild(li);
        }

        function saveEvent(event: { name: string, date: string, time: string, location: string, description: string }) {
            const events = JSON.parse(localStorage.getItem("events") || "[]");
            events.push(event);
            localStorage.setItem("events", JSON.stringify(events));
        }

        function loadEvents() {
            const events = JSON.parse(localStorage.getItem("events") || "[]");
            events.forEach(addEventToList);
        }

        function displayFieldsAsText() {
            const eventName = document.getElementById("eventName") as HTMLInputElement;
            const eventDate = document.getElementById("eventDate") as HTMLInputElement;
            const eventTime = document.getElementById("eventTime") as HTMLInputElement;
            const eventLocation = document.getElementById("eventLocation") as HTMLInputElement;
            const eventDescription = document.getElementById("eventDescription") as HTMLTextAreaElement;

            eventName.outerHTML = `<span>${eventName.value}</span>`;
            eventDate.outerHTML = `<span>${eventDate.value}</span>`;
            eventTime.outerHTML = `<span>${eventTime.value}</span>`;
            eventLocation.outerHTML = `<span>${eventLocation.value}</span>`;
            eventDescription.outerHTML = `<span>${eventDescription.value}</span>`;
        }

        loadEvents();
    });