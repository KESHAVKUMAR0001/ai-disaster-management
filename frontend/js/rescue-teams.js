
document.addEventListener("DOMContentLoaded", function () {

    const form =
        document.getElementById("rescueTeamForm");

    const teamList =
        document.getElementById("teamList");

    const result =
        document.getElementById("result");


    displayTeams();


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const teamName =
            document.getElementById("teamName").value.trim();

        const teamLeader =
            document.getElementById("teamLeader").value.trim();

        const teamLocation =
            document.getElementById("teamLocation").value.trim();

        const teamStatus =
            document.getElementById("teamStatus").value;


        if (
            teamName === "" ||
            teamLeader === "" ||
            teamLocation === ""
        ) {

            result.textContent =
                "Please fill all fields.";

            return;
        }


        const team = {

            name: teamName,

            leader: teamLeader,

            location: teamLocation,

            status: teamStatus,

            date: new Date().toLocaleString()

        };


        let teams =
            JSON.parse(
                localStorage.getItem("rescueTeams")
            ) || [];


        teams.push(team);


        localStorage.setItem(
            "rescueTeams",
            JSON.stringify(teams)
        );


        result.textContent =
            "Rescue team added successfully.";


        form.reset();


        displayTeams();

    });


    function displayTeams() {

        const teams =
            JSON.parse(
                localStorage.getItem("rescueTeams")
            ) || [];


        if (teams.length === 0) {

            teamList.innerHTML =
                '<p class="empty">No rescue teams added yet.</p>';

            return;
        }


        teamList.innerHTML = "";


        teams
            .slice()
            .reverse()
            .forEach(function (team) {

                const item =
                    document.createElement("div");

                item.className =
                    "team-item";


                const statusClass =
                    team.status.toLowerCase();


                item.innerHTML = `

                    <h3>
                        🚑 ${team.name}
                    </h3>

                    <p>
                        <strong>Team Leader:</strong>
                        ${team.leader}
                    </p>

                    <p>
                        <strong>Current Location:</strong>
                        ${team.location}
                    </p>

                    <p>
                        <strong>Status:</strong>

                        <span class="status ${statusClass}">
                            ${team.status}
                        </span>
                    </p>

                    <p>
                        <strong>Added:</strong>
                        ${team.date}
                    </p>

                `;


                teamList.appendChild(item);

            });

    }

});
