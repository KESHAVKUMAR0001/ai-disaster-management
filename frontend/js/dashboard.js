document.addEventListener("DOMContentLoaded", function () {

    loadDashboardData();

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("user");
        });
    }

});


function loadDashboardData() {

    const reports =
        JSON.parse(localStorage.getItem("disasterReports")) || [];

    const notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];


    /* MY REPORTS */

    const reportCount =
        document.getElementById("reportCount");

    if (reportCount) {
        reportCount.textContent = reports.length;
    }


    /* ACTIVE DISASTERS */

    const activeDisasters =
        document.getElementById("activeDisasters");

    if (activeDisasters) {
        activeDisasters.textContent = reports.length;
    }


    /* HIGH RISK AREAS */

    const highRisk =
        document.getElementById("highRisk");

    if (highRisk) {

        const highRiskReports = reports.filter(function (report) {

            return (
                report.severity === "HIGH" ||
                report.riskLevel === "HIGH" ||
                report.priority === "HIGH"
            );

        });

        highRisk.textContent = highRiskReports.length;
    }


    /* EMERGENCY ALERTS */

    const alertCount =
        document.getElementById("alertCount");

    if (alertCount) {
        alertCount.textContent = notifications.length;
    }


    /* RECENT REPORTS */

    displayRecentReports(reports);
}


function displayRecentReports(reports) {

    const recentReports =
        document.getElementById("recentReports");

    if (!recentReports) {
        return;
    }


    if (reports.length === 0) {
        return;
    }


    recentReports.innerHTML = "";


    const latestReports =
        reports.slice(-5).reverse();


    latestReports.forEach(function (report) {

        const reportCard =
            document.createElement("div");

        reportCard.className = "action-card";


        reportCard.innerHTML = `
            <h3>
                ${report.disasterType || "Disaster Report"}
            </h3>

            <p>
                Location:
                ${report.location || "Not specified"}
            </p>

            <p>
                Severity:
                ${report.severity ||
                  report.riskLevel ||
                  "Pending"}
            </p>
        `;


        recentReports.appendChild(reportCard);

    });

}