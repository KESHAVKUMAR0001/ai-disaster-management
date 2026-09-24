
const simulateBtn =
    document.getElementById("simulateBtn");

const simulationMessage =
    document.getElementById("simulationMessage");

const whatIfResult =
    document.getElementById("whatIfResult");

const recommendedPlan =
    document.getElementById("recommendedPlan");

const recommendationReason =
    document.getElementById("recommendationReason");


// RUN SIMULATION

simulateBtn.addEventListener("click", function () {

    const ambulances =
        Number(document.getElementById("ambulances").value);

    const rescueTeams =
        Number(document.getElementById("rescueTeams").value);

    const foodKits =
        Number(document.getElementById("foodKits").value);

    const roadStatus =
        document.getElementById("roadStatus").value;


    simulationMessage.textContent =
        "AI is analyzing the available resources...";


    setTimeout(function () {

        // Base scores

        let scoreA = 78;
        let scoreB = 91;
        let scoreC = 85;


        // RESOURCE IMPACT

        if (ambulances < 3) {

            scoreA -= 10;
            scoreB -= 8;
            scoreC -= 6;

        } else if (ambulances < 5) {

            scoreA -= 3;
            scoreB -= 2;
            scoreC -= 1;

        }


        if (rescueTeams < 3) {

            scoreA -= 8;
            scoreB -= 6;
            scoreC -= 4;

        }


        if (foodKits < 300) {

            scoreA -= 5;
            scoreB -= 7;
            scoreC -= 8;

        }


        // ROAD IMPACT

        if (roadStatus === "PARTIAL") {

            scoreA -= 5;
            scoreB -= 4;
            scoreC -= 3;

        }


        if (roadStatus === "BLOCKED") {

            scoreA -= 12;
            scoreB -= 10;
            scoreC -= 8;

        }


        // Prevent negative scores

        scoreA = Math.max(0, scoreA);
        scoreB = Math.max(0, scoreB);
        scoreC = Math.max(0, scoreC);


        // DISPLAY SCORES

        document.getElementById("scoreA")
            .textContent = scoreA;

        document.getElementById("scoreB")
            .textContent = scoreB;

        document.getElementById("scoreC")
            .textContent = scoreC;


        // FIND BEST PLAN

        const scores = {

            A: scoreA,

            B: scoreB,

            C: scoreC

        };


        let bestPlan = "A";

        if (scores.B > scores[bestPlan]) {
            bestPlan = "B";
        }

        if (scores.C > scores[bestPlan]) {
            bestPlan = "C";
        }


        // RECOMMENDATION

        if (bestPlan === "A") {

            recommendedPlan.textContent =
                "Plan A – Fast Response";

            recommendationReason.textContent =
                "AI recommends Plan A because rapid deployment is more suitable under the current resource and road conditions.";

        }

        else if (bestPlan === "B") {

            recommendedPlan.textContent =
                "Plan B – Balanced Response";

            recommendationReason.textContent =
                "AI recommends Plan B because it provides a strong balance between response speed, resource usage and risk reduction.";

        }

        else {

            recommendedPlan.textContent =
                "Plan C – Maximum Resource";

            recommendationReason.textContent =
                "AI recommends Plan C because maximum resource deployment provides stronger risk reduction under the current conditions.";

        }


        // WHAT-IF ANALYSIS

        let whatIf = [];


        if (ambulances <= 2) {

            whatIf.push(
                "Ambulance shortage detected. AI recommends reallocating ambulances from nearby centers."
            );

        }


        if (rescueTeams <= 2) {

            whatIf.push(
                "Rescue team shortage detected. Additional teams may be required."
            );

        }


        if (foodKits < 300) {

            whatIf.push(
                "Food kit shortage detected. AI recommends moving food kits from nearby resource centers."
            );

        }


        if (roadStatus === "PARTIAL") {

            whatIf.push(
                "Some roads are partially blocked. AI recommends alternate access routes."
            );

        }


        if (roadStatus === "BLOCKED") {

            whatIf.push(
                "Main roads are blocked. AI recommends alternate evacuation and rescue routes."
            );

        }


        if (whatIf.length === 0) {

            whatIfResult.textContent =
                "Current resources are sufficient for the selected response plans.";

        } else {

            whatIfResult.innerHTML =
                whatIf.map(
                    item => "• " + item
                ).join("<br><br>");

        }


        simulationMessage.textContent =
            "Simulation completed successfully.";

    }, 1000);

});


// APPROVE PLAN

document.getElementById("approveBtn")
    .addEventListener("click", function () {

        const plan =
            recommendedPlan.textContent;

        document.getElementById("authorityMessage")
            .textContent =
            plan + " approved successfully.";

    });


// OVERRIDE PLAN

document.getElementById("overrideBtn")
    .addEventListener("click", function () {

        document.getElementById("authorityMessage")
            .textContent =
            "Override mode activated. Authority can select another response plan.";

    });
