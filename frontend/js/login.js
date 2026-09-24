document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const roleSelect = document.getElementById("role");
    const message = document.getElementById("message");

    if (!loginForm) {
        console.error("Login form element (#loginForm) not found.");
        return;
    }

    // Function to safely redirect to target file
    async function navigateToDashboard(primaryPath, fallbackPath) {
        message.style.color = "#0284c7";
        message.textContent = "Redirecting...";

        // If running over HTTP/HTTPS (Live Server, Localhost)
        if (window.location.protocol.startsWith("http")) {
            try {
                const response = await fetch(primaryPath, { method: "HEAD" });
                if (response.ok) {
                    window.location.href = primaryPath;
                    return;
                }
            } catch (err) {
                console.warn("Primary path failed, attempting fallback path...", err);
            }
            // If primary path returned 404, try the parent directory path
            window.location.href = fallbackPath;
        } else {
            // If running directly as local file (file:///), use primary path directly
            window.location.href = primaryPath;
        }
    }

    loginForm.addEventListener("submit", function (e) {
        // Prevent default browser form refresh
        e.preventDefault();

        const role = roleSelect.value;

        if (!role) {
            message.style.color = "#ef4444";
            message.textContent = "Please select a role to login.";
            return;
        }

        if (role === "CITIZEN") {
            // Checks same directory first, falls back to parent directory (../)
            navigateToDashboard("citizen-dashboard.html", "../citizen-dashboard.html");
        } else if (role === "AUTHORITY") {
            // Checks same directory first, falls back to parent directory (../)
            navigateToDashboard("authority-dashboard.html", "../authority-dashboard.html");
        } else {
            message.style.color = "#ef4444";
            message.textContent = "Invalid role selected.";
        }
    });
});