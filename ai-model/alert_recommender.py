def generate_alert(severity, risk_level, location, people_affected):

    severity = severity.upper()
    risk_level = risk_level.upper()

    if severity == "HIGH" and risk_level == "HIGH":
        alert_type = "CRITICAL EMERGENCY"
        priority = "IMMEDIATE"

    elif severity == "MEDIUM":
        alert_type = "EMERGENCY WARNING"
        priority = "URGENT"

    else:
        alert_type = "GENERAL WARNING"
        priority = "NORMAL"

    message = (
        f"{alert_type}: Disaster reported at {location}. "
        f"Approximately {people_affected} people may be affected. "
        f"Required response priority: {priority}."
    )

    return {
        "alertType": alert_type,
        "priority": priority,
        "location": location,
        "peopleAffected": people_affected,
        "message": message
    }