document.getElementById("predictionForm").addEventListener("submit", async function (event) {

    event.preventDefault();

    const disasterType = document.getElementById("disasterType").value;
    const description = document.getElementById("description").value;

    const predictionData = {
        disasterType: disasterType,
        description: description
    };

    const result = await predictDisaster(predictionData);

    if (result.success === false) {
        alert(result.message);
        return;
    }

    document.getElementById("riskScore").textContent = result.riskScore;
    document.getElementById("severity").textContent = result.severity;
    document.getElementById("affectedPeople").textContent = result.affectedPeople;
});