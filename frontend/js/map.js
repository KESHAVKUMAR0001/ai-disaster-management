// ===============================
// MAP INITIALIZATION
// ===============================

const map = L.map("map").setView([17.6868, 83.2185], 11);


// Esri World Street Map Layer (Free, clean, high-performance vector basemap without API key watermarks)
L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    {
        attribution: "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012",
        maxZoom: 19
    }
).addTo(map);


// ===============================
// LAYERS
// ===============================

const disasterLayer = L.layerGroup().addTo(map);
const riskLayer = L.layerGroup().addTo(map);
const resourceLayer = L.layerGroup().addTo(map);
const routeLayer = L.layerGroup().addTo(map);


// ===============================
// DEMO DISASTER DATA
// Later → Backend API
// GET /api/map/incidents
// ===============================

const disasters = [
    {
        type: "Flood",
        location: "Visakhapatnam",
        lat: 17.6868,
        lng: 83.2185,
        severity: "HIGH",
        people: 350
    },

    {
        type: "Cyclone",
        location: "Bheemunipatnam",
        lat: 17.8900,
        lng: 83.4500,
        severity: "MEDIUM",
        people: 180
    }
];


// ===============================
// DISASTER MARKERS
// ===============================

disasters.forEach(disaster => {

    const marker = L.marker([
        disaster.lat,
        disaster.lng
    ]);

    marker.bindPopup(`
        <h3>🚨 ${disaster.type}</h3>
        <p><b>Location:</b> ${disaster.location}</p>
        <p><b>Severity:</b> ${disaster.severity}</p>
        <p><b>Affected People:</b> ${disaster.people}</p>
    `);

    disasterLayer.addLayer(marker);
});


// ===============================
// AI RISK ZONES
// ===============================

const highRiskZone = L.circle(
    [17.6868, 83.2185],
    {
        radius: 7000,
        fillOpacity: 0.25,
        weight: 2
    }
);

highRiskZone.bindPopup(`
    <h3>🔴 High Risk Zone</h3>
    <p>AI predicted high disaster impact.</p>
    <p><b>Risk Score:</b> 82/100</p>
`);

riskLayer.addLayer(highRiskZone);


const mediumRiskZone = L.circle(
    [17.8900, 83.4500],
    {
        radius: 5000,
        fillOpacity: 0.20,
        weight: 2
    }
);

mediumRiskZone.bindPopup(`
    <h3>🟡 Medium Risk Zone</h3>
    <p>AI predicted moderate disaster impact.</p>
    <p><b>Risk Score:</b> 58/100</p>
`);

riskLayer.addLayer(mediumRiskZone);


// ===============================
// RESOURCE LOCATIONS
// Later → GET /api/map/resources
// ===============================

const resources = [
    {
        name: "Emergency Medical Center",
        type: "Hospital",
        lat: 17.7120,
        lng: 83.3010
    },

    {
        name: "Rescue Team Base",
        type: "Rescue Team",
        lat: 17.6700,
        lng: 83.2200
    },

    {
        name: "Emergency Resource Center",
        type: "Resource Center",
        lat: 17.7300,
        lng: 83.2500
    }
];


resources.forEach(resource => {

    const marker = L.marker([
        resource.lat,
        resource.lng
    ]);

    marker.bindPopup(`
        <h3>🏥 ${resource.name}</h3>
        <p><b>Type:</b> ${resource.type}</p>
    `);

    resourceLayer.addLayer(marker);
});


// ===============================
// EVACUATION ROUTE
// Later → GET /api/map/routes
// ===============================

const evacuationRoute = [
    [17.6868, 83.2185],
    [17.7000, 83.2300],
    [17.7200, 83.2500],
    [17.7400, 83.2700]
];

const route = L.polyline(
    evacuationRoute,
    {
        weight: 5
    }
);

route.bindPopup(`
    <h3>🚑 Recommended Evacuation Route</h3>
    <p>AI recommended this route for emergency evacuation.</p>
`);

routeLayer.addLayer(route);


// ===============================
// CHECKBOX CONTROLS
// ===============================

document
    .getElementById("disasterToggle")
    .addEventListener("change", function () {

        if (this.checked) {
            map.addLayer(disasterLayer);
        } else {
            map.removeLayer(disasterLayer);
        }
    });


document
    .getElementById("riskToggle")
    .addEventListener("change", function () {

        if (this.checked) {
            map.addLayer(riskLayer);
        } else {
            map.removeLayer(riskLayer);
        }
    });


document
    .getElementById("resourceToggle")
    .addEventListener("change", function () {

        if (this.checked) {
            map.addLayer(resourceLayer);
        } else {
            map.removeLayer(resourceLayer);
        }
    });


document
    .getElementById("routeToggle")
    .addEventListener("change", function () {

        if (this.checked) {
            map.addLayer(routeLayer);
        } else {
            map.removeLayer(routeLayer);
        }
    });


// ===============================
// USER CURRENT LOCATION
// ===============================

document
    .getElementById("locationBtn")
    .addEventListener("click", function () {

        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(

            function (position) {

                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                map.setView([lat, lng], 14);

                const userMarker = L.marker([lat, lng])
                    .addTo(map);

                userMarker.bindPopup(
                    "<b>📍 Your Current Location</b>"
                ).openPopup();
            },

            function () {
                alert(
                    "Unable to get your location. Please allow location access."
                );
            }
        );
    });


// ===============================
// REFRESH MAP
// ===============================

const refreshBtn = document.getElementById("refreshMap");
if (refreshBtn) {
    refreshBtn.addEventListener("click", function () {
        map.setView([17.6868, 83.2185], 11);
        map.invalidateSize();
    });
}


// ===============================
// AI ANALYSIS DATA
// ===============================

document.getElementById("priorityZone").textContent =
    "Visakhapatnam – High Risk";

document.getElementById("affectedPopulation").textContent =
    "350 People";

document.getElementById("resourceRequirement").textContent =
    "High";

document.getElementById("evacuationPriority").textContent =
    "Immediate";


// ===============================
// LOGOUT
// ===============================

document
    .getElementById("logoutBtn")
    .addEventListener("click", function (event) {

        event.preventDefault();

        localStorage.removeItem("user");
        localStorage.removeItem("latestReportId");

        window.location.href = "login.html";
    });