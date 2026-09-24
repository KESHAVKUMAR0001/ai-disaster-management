
document.addEventListener("DOMContentLoaded", function () {

    const form =
        document.getElementById("resourceForm");

    const result =
        document.getElementById("result");

    const allocationList =
        document.getElementById("allocationList");


    displayAllocations();

    updateResourceCounts();


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const reportId =
            document.getElementById("reportId").value;

        const resourceType =
            document.getElementById("resourceType").value;

        const quantity =
            Number(document.getElementById("quantity").value);

        const location =
            document.getElementById("location").value.trim();


        if (
            reportId === "" ||
            resourceType === "" ||
            quantity <= 0 ||
            location === ""
        ) {

            result.textContent =
                "Please fill all fields correctly.";

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
            JSON.parse(
                localStorage.getItem("resourceAllocations")
            ) || [];


        allocations.push(allocation);


        localStorage.setItem(
            "resourceAllocations",
            JSON.stringify(allocations)
        );


        result.textContent =
            "Resource allocated successfully.";


        form.reset();


        displayAllocations();

        updateResourceCounts();

    });


    function displayAllocations() {

        const allocations =
            JSON.parse(
                localStorage.getItem("resourceAllocations")
            ) || [];


        if (allocations.length === 0) {

            allocationList.innerHTML =
                '<p class="empty">No resources allocated yet.</p>';

            return;
        }


        allocationList.innerHTML = "";


        allocations
            .slice()
            .reverse()
            .forEach(function (allocation) {

                const item =
                    document.createElement("div");

                item.className =
                    "allocation-item";


                item.innerHTML = `

                    <h3>
                        📦 ${allocation.resourceType}
                    </h3>

                    <p>
                        <strong>Report ID:</strong>
                        ${allocation.reportId}
                    </p>

                    <p>
                        <strong>Quantity:</strong>
                        ${allocation.quantity}
                    </p>

                    <p>
                        <strong>Location:</strong>
                        ${allocation.location}
                    </p>

                    <p>
                        <strong>Allocated:</strong>
                        ${allocation.date}
                    </p>

                `;


                allocationList.appendChild(item);

            });

    }


    function updateResourceCounts() {

        const allocations =
            JSON.parse(
                localStorage.getItem("resourceAllocations")
            ) || [];


        const counts = {

            "Water": 0,

            "Food": 0,

            "Medical Kits": 0,

            "Ambulances": 0,

            "Rescue Teams": 0,

            "Emergency Shelters": 0

        };


        allocations.forEach(function (allocation) {

            if (counts.hasOwnProperty(
                allocation.resourceType
            )) {

                counts[allocation.resourceType] +=
                    Number(allocation.quantity);

            }

        });


        document.getElementById("waterCount").textContent =
            counts["Water"];

        document.getElementById("foodCount").textContent =
            counts["Food"];

        document.getElementById("medicalCount").textContent =
            counts["Medical Kits"];

        document.getElementById("ambulanceCount").textContent =
            counts["Ambulances"];

        document.getElementById("rescueCount").textContent =
            counts["Rescue Teams"];

        document.getElementById("shelterCount").textContent =
            counts["Emergency Shelters"];

    }

});
