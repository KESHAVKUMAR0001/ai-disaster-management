document.getElementById("reportForm").addEventListener("submit", async function (event) {

    event.preventDefault();

    const disasterType = document.getElementById("disasterType").value;
    const description = document.getElementById("description").value;
    const locationName = document.getElementById("locationName").value;
    const latitude = parseFloat(document.getElementById("latitude").value);
    const longitude = parseFloat(document.getElementById("longitude").value);

    const reportData = {
        disasterType: disasterType,
        description: description,
        locationName: locationName,
        latitude: latitude,
        longitude: longitude
    };

    const result = await submitDisasterReport(reportData);

    if (result.success !== false) {
        alert("Disaster report submitted successfully!");
        window.location.href = "citizen-dashboard.html";
    } else {
        alert(result.message);
    }
});