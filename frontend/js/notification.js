
function sendNotification() {

    const recipient =
        document.getElementById("recipient").value.trim();

    const message =
        document.getElementById("message").value.trim();

    const result =
        document.getElementById("result");

    if (!recipient || !message) {
        result.textContent = "Please fill all fields.";
        return;
    }

    const notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];

    const notification = {
        recipient: recipient,
        message: message,
        time: new Date().toLocaleString()
    };

    notifications.push(notification);

    localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
    );

    result.textContent =
        "Notification sent successfully.";

    document.getElementById("recipient").value = "";
    document.getElementById("message").value = "";

    loadNotifications();
}


function loadNotifications() {

    const list =
        document.getElementById("notificationList");

    const notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];

    if (notifications.length === 0) {

        list.innerHTML =
            "<p>No notifications sent yet.</p>";

        return;
    }

    list.innerHTML = "";

    notifications.forEach(function(notification) {

        const item =
            document.createElement("div");

        item.className = "notification-item";

        item.innerHTML = `
            <strong>To: ${notification.recipient}</strong>
            <p>${notification.message}</p>
            <small>${notification.time}</small>
        `;

        list.appendChild(item);
    });
}


loadNotifications();
