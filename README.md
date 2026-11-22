# AI-Based Disaster Response & Resource Management System

A full-stack emergency decision-support platform designed to collect disaster incident reports, calculate severity and priority scores using multi-criteria heuristic algorithms, estimate emergency resource requirements, and assist response authorities.

---

## 1. Project Overview & Problem Statement
During large-scale natural disasters (e.g., floods, earthquakes, cyclones), emergency command authorities receive high volumes of unstructured citizen reports. Manually assessing severity, prioritizing critical zones, and calculating required relief supplies creates operational bottlenecks. This project implements a centralized web portal and an algorithmic decision-support pipeline to automate incident triage, resource demand estimation, and tactical planning.

## 2. Project Objectives
* Provide a responsive web-based reporting interface for citizens to submit geolocated disaster incidents.
* Implement an automated decision-support engine to score disaster severity and response priority.
* Calculate mathematical estimates for emergency relief supplies (drinking water, rations, medical trauma kits, rescue teams).
* Provide an interactive GIS map visualization for disaster impact zones and logistics depots.
* Simulate tactical contingency plans (Plans A, B, C) to evaluate resource allocation feasibility.
* Enable role-based coordination between citizen reporting and emergency administrative oversight.

## 3. Implemented Features
* **Citizen Incident Reporting**: Web form capturing incident category, description, coordinates (via browser Geolocation API), affected population, and urgency.
* **Algorithmic Triage Engine**: Heuristic multi-criteria evaluation determining severity (`HIGH`, `MEDIUM`, `LOW`) and priority (`IMMEDIATE`, `URGENT`, `NORMAL`).
* **Resource Demand Calculator**: Deterministic mathematical model calculating required water packets, food rations, trauma kits, and personnel.
* **Tactical Decision Simulator**: Scenario evaluation engine comparing 3 predefined response postures and recommending an optimal strategy.
* **Interactive GIS Map**: Leaflet.js map with Esri World Street Map vector tiles displaying hazard radii, depots, and evacuation routes.
* **Administrative Operations**: Endpoints for inventory tracking, rescue unit deployment status, and emergency alert generation.
* **Dual Persistence Layer**: MongoDB primary persistence with seamless automatic fallback to an in-memory data store.

## 4. AI & Decision-Support Approach (Heuristic / Rule-Based)
The decision-support microservice (`ai-model/`) implements a **Symbolic Multi-Criteria Rule-Based Expert System**. No statistical machine learning models, neural networks, or weights are used (no `.pkl`, `.h5`, or scikit-learn). All logic is deterministic:

### A. Disaster Severity & Priority Scoring (`ai-model/model.py`)
Incoming incident reports are evaluated on a **3 to 9 point scale** across three criteria:
* **Disaster Category Weight**:
  * High-impact (`earthquake`, `flood`, `cyclone`, `tsunami`): **+3 points**
  * Medium-impact (`fire`, `landslide`, `drought`): **+2 points**
  * Other events: **+1 point**
* **Casualty & Affected Population Weight**:
  * $\ge 500$ people affected: **+3 points**
  * $100 - 499$ people affected: **+2 points**
  * $< 100$ people affected: **+1 point**
* **Situation Urgency Weight**:
  * `critical`, `very serious`, `emergency`: **+3 points**
  * `serious`, `danger`: **+2 points**
  * Normal / standard descriptions: **+1 point**
* **Classification Thresholds**:
  * Score $\ge 7 \implies$ Severity: `HIGH` | Risk: `HIGH` | Priority: `IMMEDIATE`
  * Score $\ge 5 \implies$ Severity: `MEDIUM` | Risk: `MEDIUM` | Priority: `URGENT`
  * Score $< 5 \implies$ Severity: `LOW` | Risk: `LOW` | Priority: `NORMAL`

### B. Resource Demand Calculation (`ai-model/resource_predictor.py`)
Computes essential emergency relief quantities based on severity tier and population count ($N$):
* **HIGH Severity**: Water Packets $= N \times 3$, Food Packets $= N \times 3$, Medical Kits $= \max(10, \lfloor N / 10 \rfloor)$, Rescue Teams $= \max(5, \lfloor N / 50 \rfloor)$.
* **MEDIUM Severity**: Water Packets $= N \times 2$, Food Packets $= N \times 2$, Medical Kits $= \max(5, \lfloor N / 20 \rfloor)$, Rescue Teams $= \max(2, \lfloor N / 100 \rfloor)$.
* **LOW Severity**: Water Packets $= N \times 1$, Food Packets $= N \times 1$, Medical Kits $= \max(2, \lfloor N / 50 \rfloor)$, Rescue Teams $= \max(1, \lfloor N / 200 \rfloor)$.

### C. Decision Simulation & Plan Selection (`ai-model/decision_simulatory.py`)
Evaluates three pre-configured strategic response plans:
* **Plan A (Fast Response)**: Rapid deployment using nearby teams; high resource consumption.
* **Plan B (Balanced Response)**: Balanced distribution of personnel and equipment; medium consumption.
* **Plan C (Targeted / Constrained)**: Conservation triage prioritizing high-density clusters; low consumption.
* **Selection Rule**: Picks **Plan A** if severity is `HIGH` and available teams $\ge 5$; **Plan B** if severity is `MEDIUM` and available teams $\ge 2$; otherwise defaults to **Plan C**.

### D. Alert Recommendation (`ai-model/alert_recommender.py`)
* Maps severity and risk tier to `CRITICAL EMERGENCY`, `EMERGENCY WARNING`, or `GENERAL WARNING`.
* Formats structured broadcast dispatches with recommended public actions and location details.

## 5. Why This Approach Was Selected
* **Deterministic Explainability**: Life-safety triage decisions require transparent, auditable rules rather than opaque black-box probabilistic models.
* **Zero Model Overhead**: Executes in sub-millisecond latency without requiring dedicated GPUs, external cloud API quotas, or offline training pipelines.
* **Appropriate for System-Level Prototyping**: Validates full-stack architectural feasibility before training specialized ML classifiers on historical disaster records.

## 6. Dataset & Operational Data
* **Model Training Dataset**: None (no supervised training was performed).
* **System Testing Data**: Pre-seeded synthetic records (`backend/src/utils/dataStore.js`, `backend/src/seed.js`) containing realistic incident reports, supply inventory items, and rescue units.

## 7. System Architecture & Tech Stack
```text
Browser Client (HTML/JS/Leaflet) ──HTTP──> Express Backend (:8081) ──HTTP──> Python Flask Service (:5000)
                                                │
                                       ┌────────┴────────┐
                                  MongoDB (27017)   In-Memory Store
```
* **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+), Leaflet.js 1.9.4, Esri World Street Map vector tiles.
* **Backend**: Node.js (ES Modules), Express.js 4.21.2, Mongoose 8.9.5, Axios 1.7.9, CORS 2.8.5, Dotenv 16.4.7.
* **Database**: MongoDB (port 27017) with automatic **resilient in-memory fallback store** (`src/utils/dataStore.js`) when offline. *(Note: `database/mysql-init.sql` is a legacy unused file).*
* **Decision Microservice**: Python 3.8+, Flask 3.0.3 (standard library only).

## 8. Project Structure
```text
ai-disaster/
├── ai-model/       # Python Flask microservice (:5000) for severity scoring & simulation
├── backend/        # Node.js + Express REST API (:8081), Mongoose models & in-memory store
├── database/       # Legacy unused mysql-init.sql file
├── frontend/       # HTML, CSS, JS portal views & Leaflet GIS map
├── start.bat       # One-click Windows launcher (starts Flask, Express, opens browser)
└── stop.bat        # Process termination script for ports 5000 and 8081
```

## 9. Key REST API Endpoints
* `POST /api/reports` : Submit disaster report (triggers AI triage or backend fallback).
* `POST /api/predictions` : Forward report attributes to Flask microservice for scoring.
* `GET, POST /api/resources` : Query inventory and register emergency relief materials.
* `POST /api/resources/allocate` : Record dispatch of supplies to an incident area.
* `POST /api/simulation/run` : Run scenario evaluation and contingency plan selection.
* `GET, POST /api/alerts` : Retrieve active emergency broadcasts or issue a new alert.
* `GET, POST /api/rescue-teams` : Register rescue teams and update deployment status.
* `GET /api/map/incidents` : Query incident locations and status for map rendering.

## 10. Installation & How to Run
### Prerequisites: Node.js (v18+), Python (3.8+), optionally MongoDB.
1. **Automated Launch (Windows)**:
   * Run `start.bat` to launch Python AI (:5000) and Express (:8081), and open `http://localhost:8081`.
   * Run `stop.bat` to terminate all background services.
2. **Manual Startup**:
   * **AI Service**: `cd ai-model && pip install -r requirements.txt && python app.py`
   * **Backend**: `cd backend && npm install && npm run seed && npm start`
   * Open `http://localhost:8081` in any web browser.
3. **Demo Credentials**: Authority: `admin@disaster.gov` / `password123` | Citizen: `citizen@example.com` / `password123`.

## 11. Input and Output Verification
* **Severity Scoring Input (`POST /api/predictions`)**:
  `{"disasterType": "Flood", "peopleAffected": 150, "situation": "critical"}`
* **Severity Scoring Output**:
  `{"severity": "HIGH", "riskLevel": "HIGH", "priority": "IMMEDIATE", "estimatedAffectedPeople": 150}`
* **Resource Estimation Output (`POST /resources/predict`)**:
  `{"waterPackets": 450, "foodPackets": 450, "medicalKits": 15, "rescueTeams": 5}`

## 12. Verified Results
* **Microservice Interoperability**: Express successfully proxies JSON payloads to Flask and returns computed severity within < 15ms locally.
* **Dual Persistence**: Data seamlessly routes to MongoDB when active, or into the in-memory array store without runtime exceptions when MongoDB is unavailable.

## 13. Project Limitations
* **Rule-Based Only**: Scoring does not statistically adapt to historical disaster training sets.
* **Authentication Security**: Passwords are verified in plaintext; tokens are mock strings (`jwt_mock_...`) rather than signed JWTs (`bcryptjs` and `jsonwebtoken` installed but unused).
* **Client-Side Decoupling**: GIS map displays hardcoded demo coordinates in Visakhapatnam; several secondary forms (`feedback`, `rescue-teams`) persist to `localStorage` rather than the live REST API.
* **No Real-Time Transport**: Communication uses standard HTTP poll/fetch rather than WebSockets.

## 14. Future Improvements
* Train and deploy a supervised machine learning classifier (e.g., Random Forest / XGBoost) on historical FEMA/NDMA disaster datasets.
* Implement production-grade password hashing with `bcrypt` and signed token authorization with `jsonwebtoken`.
* Fully bind all frontend views and dynamic Leaflet GIS marker layers to backend REST endpoints.
* Implement WebSockets (Socket.io) for real-time dispatch alerts and field updates.

## 15. References
1. National Disaster Management Authority (NDMA), Government of India: *National Disaster Management Guidelines - Incident Response System (IRS)*.
2. Leaflet.js Documentation: *An Open-Source JavaScript Library for Mobile-Friendly Interactive Maps* (https://leafletjs.com/).
3. Express.js & Node.js Documentation: *Fast, unopinionated, minimalist web framework for Node.js* (https://expressjs.com/).
4. Flask Documentation: *A lightweight WSGI web application framework* (https://flask.palletsprojects.com/).
