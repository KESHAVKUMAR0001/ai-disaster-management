// Resource Allocation

function allocateResource() {
    const reportId = document.getElementById("reportId").value;
    const resourceType = document.getElementById("resourceType").value;
    const quantity = document.getElementById("quantity").value;
    const location = document.getElementById("location").value;
    const result = document.getElementById("result");

    if (!reportId || !quantity || !location) {
        result.textContent = "Please fill all required fields.";
        return;
    }

    const allocation = {
        reportId: reportId,
        resourceType: resourceType,
        quantity: quantity,
        location: location,
        date: new Date().toLocaleString()
    };

    let allocations =
        JSON.parse(localStorage.getItem("resourceAllocations")) || [];

    allocations.push(allocation);

    localStorage.setItem(
        "resourceAllocations",
        JSON.stringify(allocations)
    );

    result.textContent = "Resource allocated successfully.";

    document.getElementById("reportId").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("location").value = "";

    displayResourceStatus();
}

function displayResourceStatus() {
    const resourceStatus = document.getElementById("resourceStatus");

    let allocations =
        JSON.parse(localStorage.getItem("resourceAllocations")) || [];

    if (allocations.length === 0) {
        resourceStatus.innerHTML = "<p>No resources allocated yet.</p>";
        return;
    }

    resourceStatus.innerHTML = allocations.map((item, index) => `
        <div class="resource-item">
            <strong>Allocation ${index + 1}</strong>
            <p>Report ID: ${item.reportId}</p>
            <p>Resource: ${item.resourceType}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Location: ${item.location}</p>
            <p>Date: ${item.date}</p>
        </div>
    `).join("");
}

document.addEventListener("DOMContentLoaded", displayResourceStatus);