function addTeam() {

    const name = document.getElementById("teamName").value;
    const leader = document.getElementById("teamLeader").value;
    const location = document.getElementById("teamLocation").value;
    const status = document.getElementById("teamStatus").value;

    if (!name || !leader || !location) {
        document.getElementById("message").textContent =
            "Please fill all fields.";
        return;
    }

    const teams =
        JSON.parse(localStorage.getItem("rescueTeams")) || [];

    teams.push({
        name,
        leader,
        location,
        status
    });

    localStorage.setItem(
        "rescueTeams",
        JSON.stringify(teams)
    );

    document.getElementById("message").textContent =
        "Rescue team added successfully.";

    document.getElementById("teamName").value = "";
    document.getElementById("teamLeader").value = "";
    document.getElementById("teamLocation").value = "";

    loadTeams();
}

function loadTeams() {

    const teams =
        JSON.parse(localStorage.getItem("rescueTeams")) || [];

    const list = document.getElementById("teamList");

    if (teams.length === 0) {
        list.innerHTML = "<p>No rescue teams added.</p>";
        return;
    }

    list.innerHTML = teams.map(team => `
        <div class="team">
            <strong>${team.name}</strong><br>
            Leader: ${team.leader}<br>
            Location: ${team.location}<br>
            Status: ${team.status}
        </div>
    `).join("");
}

loadTeams();