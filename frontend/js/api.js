const API_BASE_URL = "http://localhost:8081/api";

async function apiRequest(endpoint, options = {}) {

    try {
        const response = await fetch(API_BASE_URL + endpoint, {
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            },
            ...options
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "API request failed");
        }

        return data;

    } catch (error) {

        console.error("API Error:", error);

        return {
            success: false,
            message: error.message || "Backend server is not available"
        };
    }
}


// ================= AUTH =================

async function registerUser(userData) {
    return await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData)
    });
}

async function loginUser(loginData) {
    return await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(loginData)
    });
}


// ================= DISASTER REPORT =================

async function submitDisasterReport(reportData) {
    return await apiRequest("/reports", {
        method: "POST",
        body: JSON.stringify(reportData)
    });
}


// ================= AI PREDICTION =================

async function predictDisaster(predictionData) {
    return await apiRequest("/predictions", {
        method: "POST",
        body: JSON.stringify(predictionData)
    });
}


// ================= AI RESOURCE PREDICTION =================

async function predictResources(resourceData) {
    return await apiRequest("/ai/resources", {
        method: "POST",
        body: JSON.stringify(resourceData)
    });
}


// ================= AI DECISION SIMULATION =================

async function runAISimulation(simulationData) {
    return await apiRequest("/ai/simulation", {
        method: "POST",
        body: JSON.stringify(simulationData)
    });
}


// ================= AI ALERT =================

async function generateAIAlert(alertData) {
    return await apiRequest("/ai/alerts", {
        method: "POST",
        body: JSON.stringify(alertData)
    });
}


// ================= MAP =================

async function getIncidentLocations() {
    return await apiRequest("/map/incidents");
}

async function getResourceLocations() {
    return await apiRequest("/map/resources");
}

async function getEmergencyRoutes() {
    return await apiRequest("/map/routes");
}


// ================= RESOURCES =================

async function getResources() {
    return await apiRequest("/resources");
}

async function getResourceRequirements(reportId) {
    return await apiRequest(
        `/resources/requirements/${reportId}`
    );
}

async function getResourceLocations() {
    return await apiRequest("/resources/locations");
}


// ================= ALERTS =================

async function getAlerts() {
    return await apiRequest("/alerts");
}


// ================= AUTHORITY =================

async function getAuthorityDashboard() {
    return await apiRequest("/authority/dashboard");
}

async function getAuthorityReports() {
    return await apiRequest("/authority/reports");
}

async function getAuthorityResources() {
    return await apiRequest("/authority/resources");
}


// ================= HEALTH =================

async function checkBackendHealth() {
    return await apiRequest("/health");
}