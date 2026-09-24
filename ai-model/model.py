# model.py

def predict_severity(disaster_type, people_affected, situation):

    # Convert input to lowercase
    disaster_type = disaster_type.lower()
    situation = situation.lower()

    score = 0

    # Disaster type
    if disaster_type in ["earthquake", "flood", "cyclone", "tsunami"]:
        score += 3
    elif disaster_type in ["fire", "landslide", "drought"]:
        score += 2
    else:
        score += 1

    # Number of affected people
    if people_affected >= 500:
        score += 3
    elif people_affected >= 100:
        score += 2
    else:
        score += 1

    # Situation
    if situation in ["critical", "very serious", "emergency"]:
        score += 3
    elif situation in ["serious", "danger"]:
        score += 2
    else:
        score += 1

    # Final prediction
    if score >= 7:
        severity = "HIGH"
        risk_level = "HIGH"
        priority = "IMMEDIATE"
    elif score >= 5:
        severity = "MEDIUM"
        risk_level = "MEDIUM"
        priority = "URGENT"
    else:
        severity = "LOW"
        risk_level = "LOW"
        priority = "NORMAL"

    return {
        "severity": severity,
        "riskLevel": risk_level,
        "priority": priority
    }