from flask import Flask, request, jsonify

from predictor import get_prediction
from resource_predictor import predict_resources
from decision_simulatory import run_simulation
from alert_recommender import generate_alert

app = Flask(__name__)


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "AI service is running"
    })


@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "No input data received"
        }), 400

    try:
        result = get_prediction(data)

        return jsonify({
            "success": True,
            "message": "AI prediction completed",
            "prediction": result
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


@app.route("/resources/predict", methods=["POST"])
def resources_predict():

    data = request.get_json()

    try:
        result = predict_resources(
            data.get("severity", "LOW"),
            int(data.get("peopleAffected", 0))
        )

        return jsonify({
            "success": True,
            "resourcePrediction": result
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


@app.route("/simulation/run", methods=["POST"])
def simulation():

    data = request.get_json()

    try:
        result = run_simulation(
            data.get("severity", "LOW"),
            int(data.get("peopleAffected", 0)),
            data.get("availableResources", ""),
            int(data.get("availableTeams", 0))
        )

        return jsonify({
            "success": True,
            "simulation": result
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


@app.route("/alert/generate", methods=["POST"])
def alert():

    data = request.get_json()

    try:
        result = generate_alert(
            data.get("severity", "LOW"),
            data.get("riskLevel", "LOW"),
            data.get("location", "Unknown"),
            int(data.get("peopleAffected", 0))
        )

        return jsonify({
            "success": True,
            "alert": result
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )