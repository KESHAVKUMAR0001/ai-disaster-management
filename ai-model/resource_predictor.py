def predict_resources(severity, people_affected):

    severity = severity.upper()

    if severity == "HIGH":
        water = people_affected * 3
        food = people_affected * 3
        medical_kits = max(10, people_affected // 10)
        rescue_teams = max(5, people_affected // 50)

    elif severity == "MEDIUM":
        water = people_affected * 2
        food = people_affected * 2
        medical_kits = max(5, people_affected // 20)
        rescue_teams = max(2, people_affected // 100)

    else:
        water = people_affected
        food = people_affected
        medical_kits = max(2, people_affected // 50)
        rescue_teams = max(1, people_affected // 200)

    return {
        "waterPackets": water,
        "foodPackets": food,
        "medicalKits": medical_kits,
        "rescueTeams": rescue_teams
    }