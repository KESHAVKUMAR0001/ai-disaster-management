def run_simulation(severity, people_affected, available_resources, available_teams):

    severity = severity.upper()

    # Plan A - Fast response
    plan_a = {
        "name": "Plan A",
        "description": "Immediate response with nearby rescue teams",
        "responseTime": "Fast",
        "resourceUsage": "High"
    }

    # Plan B - Balanced response
    plan_b = {
        "name": "Plan B",
        "description": "Balanced allocation of teams and resources",
        "responseTime": "Medium",
        "resourceUsage": "Medium"
    }

    # Plan C - Limited resources
    plan_c = {
        "name": "Plan C",
        "description": "Prioritize the most affected areas",
        "responseTime": "Slow",
        "resourceUsage": "Low"
    }

    # Select best plan
    if severity == "HIGH" and available_teams >= 5:
        best_plan = "Plan A"

    elif severity == "MEDIUM" and available_teams >= 2:
        best_plan = "Plan B"

    else:
        best_plan = "Plan C"

    return {
        "severity": severity,
        "peopleAffected": people_affected,
        "availableResources": available_resources,
        "availableTeams": available_teams,
        "planA": plan_a,
        "planB": plan_b,
        "planC": plan_c,
        "bestPlan": best_plan
    }