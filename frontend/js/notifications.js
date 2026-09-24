
document.addEventListener("DOMContentLoaded", function () {

    const form =
        document.getElementById("notificationForm");

    const list =
        document.getElementById("notificationList");

    const result =
        document.getElementById("result");


    displayNotifications();


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const recipient =
            document.getElementById("recipient").value.trim();

        const message =
            document.getElementById("message").value.trim();


        if (recipient === "" || message === "") {

            result.textContent =
                "Please fill all fields.";

            return;
        }


        const notification = {

            recipient: recipient,

            message: message,

            date: new Date().toLocaleString()

        };


        let notifications =
            JSON.parse(
                localStorage.getItem("notifications")
            ) || [];


        notifications.push(notification);


        localStorage.setItem(
            "notifications",
            JSON.stringify(notifications)
        );


        result.textContent =
            "Notification sent successfully.";


        form.reset();


        displayNotifications();

    });


    function displayNotifications() {

        const notifications =
            JSON.parse(
                localStorage.getItem("notifications")
            ) || [];


        if (notifications.length === 0) {

            list.innerHTML =
                '<p class="empty">No notifications sent yet.</p>';

            return;
        }


        list.innerHTML = "";


        notifications
            .slice()
            .reverse()
            .forEach(function (notification) {

                const item =
                    document.createElement("div");

                item.className =
                    "notification-item";


                item.innerHTML = `

                    <strong>
                        To: ${notification.recipient}
                    </strong>

                    <p>
                        ${notification.message}
                    </p>

                    <small>
                        ${notification.date}
                    </small>

                `;


                list.appendChild(item);

            });

    }

});
