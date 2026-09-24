// ===============================
// LOGIN CHECK
// ===============================

const userData = localStorage.getItem("user");

if (!userData) {
    window.location.href = "login.html";
}


// ===============================
// DEMO ALERT DATA
// Later → Spring Boot API
// GET /api/alerts
// ===============================

const alertData = {
    activeAlerts: 1,

    alerts: [
        {
            type: "Flood Risk Alert",
            location: "Visakhapatnam",
            risk: "HIGH",
            status: "Active"
        },
        {
            type: "Cyclone Warning",
            location: "Bheemunipatnam",
            risk: "MEDIUM",
            status: "Resolved"
        }
    ]
};


// ===============================
// LOGOUT
// ===============================

document.getElementById("logoutBtn")
    .addEventListener("click", function(event) {

        event.preventDefault();

        localStorage.removeItem("user");
        localStorage.removeItem("latestReportId");

        window.location.href = "login.html";
    });