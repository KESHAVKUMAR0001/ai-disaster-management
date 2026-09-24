
// Resource Management Page

const resourceData = {

    disasterArea: "Visakhapatnam",

    affectedPopulation: 350,

    overallDemand: "HIGH",

    priority: "IMMEDIATE"

};


// Display AI prediction data

document.getElementById("disasterArea").textContent =
    resourceData.disasterArea;

document.getElementById("affectedPopulation").textContent =
    resourceData.affectedPopulation;

document.getElementById("overallDemand").textContent =
    resourceData.overallDemand;

document.getElementById("priority").textContent =
    resourceData.priority;


// Check latest report

const latestReport =
    localStorage.getItem("latestReport");


if (latestReport) {

    const report =
        JSON.parse(latestReport);


    if (report.location) {

        document.getElementById("disasterArea")
            .textContent =
            report.location;

    }


    if (report.peopleAffected) {

        document.getElementById("affectedPopulation")
            .textContent =
            report.peopleAffected;

    }


    if (report.situation) {

        document.getElementById("overallDemand")
            .textContent =
            report.situation;

    }

}
