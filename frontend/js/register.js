document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    const message = document.getElementById("message");

    if (!registerForm) return;

    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const role = document.getElementById("role").value;

        if (password !== confirmPassword) {
            message.style.color = "#dc2626";
            message.textContent = "Passwords do not match!";
            return;
        }

        if (!role) {
            message.style.color = "#dc2626";
            message.textContent = "Please select Account Type!";
            return;
        }

        message.style.color = "#16a34a";
        message.textContent = "Success! Redirecting to dashboard...";

        setTimeout(() => {
            if (role === "CITIZEN") {
                window.location.href = "citizen-dashboard.html";
            } else if (role === "AUTHORITY") {
                window.location.href = "authority-dashboard.html";
            }
        }, 800);
    });
});