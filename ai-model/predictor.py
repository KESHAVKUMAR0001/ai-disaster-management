from model import predict_severity


def get_prediction(data):

    disaster_type = data.get("disasterType", "")
    people_affected = int(data.get("peopleAffected", 0))
    situation = data.get("situation", "")

    result = predict_severity(
        disaster_type,
        people_affected,
        situation
    )

    result["estimatedAffectedPeople"] = people_affected

    return result