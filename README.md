# AI-Based Disaster Response & Resource Management System

## Overview

The **AI-Based Disaster Response & Resource Management System** is a prototype web application designed to collect disaster incident reports, determine incident severity and resource needs using rule-based scoring algorithms, and provide an administrative dashboard for emergency coordination.

The codebase consists of three main sub-systems:
1. **Frontend**: Static HTML5, CSS3, and client-side JavaScript pages, served either directly or via the Express static server.
2. **Backend**: A Node.js and Express REST API running on port `8081`, supporting MongoDB persistence with an automatic, in-memory data store fallback.
3. **AI Microservice**: A lightweight Python Flask service running on port `5000` that implements rule-based heuristic decision algorithms.

> **Clarification on AI/ML:** This system does **not** contain trained machine learning models, neural networks, or statistical weights (no `.pkl`, `.joblib`, `.h5`, or `.onnx` files). All severity calculations, resource estimates, and decision simulations are deterministic, rule-based heuristic algorithms ("expert systems").

---

## Features (Implemented in Code)

### 1. Incident Reporting & Triage
* **Citizen Disaster Reporting**: Form to submit incident type, location description, GPS coordinates (via browser `navigator.geolocation`), casualty counts, and situational notes.
* **Severity & Priority Assessment**: Deterministic scoring based on disaster category, reported casualties, and situation urgency keywords.
* **Report Status Tracking**: API support for querying reports and updating response status (`REPORTED`, `VERIFIED`, `IN_PROGRESS`, `RESOLVED`).

### 2. Resource Estimation & Allocation
* **Resource Demand Formulas**: Automated calculation of water packets, food rations, trauma medical kits, and rescue personnel required per incident.
* **Resource Tracking API**: Endpoints to list inventory, register new relief supplies, and deduct dispatched stock.

### 3. Strategy Decision Simulation
* **Scenario Planning**: Generation of three tactical response postures (Plan A: Fast/High-Usage, Plan B: Balanced, Plan C: Resource-Constrained).
* **Plan Recommendation**: Rule-based selection of the optimal response plan based on incident severity and available rescue teams.
* **Plan Approval & Override**: API endpoints allowing authorities to record approval or override of simulated recommendations.

### 4. Interactive Mapping (Leaflet + Esri)
* **GIS Map View**: Leaflet-based map visualization using Esri World Street Map vector tiles.
* **Visual Overlays**: Markers for reported disasters, radius buffers for hazard impact zones, supply depot markers, and evacuation route polylines.

### 5. Administrative Dashboard & Operations
* **Command Metrics**: Aggregated counts of total incidents, active critical emergencies, deployed rescue teams, and warehouse inventory utilization.
* **Rescue Team Registry**: Management of emergency response teams, specializations, readiness status (`STANDBY`, `DEPLOYED`), and leader contact details.
* **Alert Broadcast Engine**: Generation of structured emergency alerts with urgency level and broadcast messaging.

---

## System Architecture

```text
┌────────────────────────────────────────────────────────┐
│                   Web Browser Client                   │
│   (HTML5 / Vanilla JS / CSS3 / Leaflet + Esri Tiles)   │
└───────────────────────────┬────────────────────────────┘
                            │
               HTTP / REST  │  Port 8081
                            ▼
┌────────────────────────────────────────────────────────┐
│               Node.js + Express Backend                │
│                   (src/server.js)                      │
│                                                        │
│  ┌─────────────────────────┐  ┌─────────────────────┐  │
│  │   Controllers & Routes  │  │ Resilient In-Memory │  │
│  │    (10 REST Modules)    │  │ Fallback Data Store │  │
│  └────────────┬────────────┘  └──────────▲──────────┘  │
│               │                          │             │
│               │ Mongoose                 │ (if offline)│
│               ▼                          │             │
│       ┌───────────────┐                  │             │
│       │ MongoDB (opt) │──────────────────┘             │
│       │  Port 27017   │                                │
│       └───────────────┘                                │
└───────────────────────────┬────────────────────────────┘
                            │
               HTTP / JSON  │  Port 5000 (Internal)
                            ▼
┌────────────────────────────────────────────────────────┐
│             Python Flask AI Microservice               │
│                   (ai-model/app.py)                    │
│                                                        │
│   - model.py               (Rule-based severity scoring)
│   - predictor.py           (Severity wrapper)           │
│   - resource_predictor.py  (Ratio-based resource math) │
│   - decision_simulatory.py (Heuristic plan selector)   │
│   - alert_recommender.py   (Threshold alert generator) │
└────────────────────────────────────────────────────────┘
```

---

## Project Structure

```text
ai-disaster/
├── ai-model/                          # Python Flask AI microservice (Port 5000)
│   ├── app.py                         # Flask application & HTTP route definitions
│   ├── model.py                       # Core rule-based scoring logic (3-9 point scale)
│   ├── predictor.py                   # Wrapper mapping request JSON to model.py
│   ├── resource_predictor.py          # Resource requirement calculation formulas
│   ├── decision_simulatory.py         # Heuristic response plan simulator (Plans A, B, C)
│   ├── alert_recommender.py           # Alert classification & message generator
│   └── requirements.txt               # Python dependencies (Flask only)
│
├── backend/                           # Node.js + Express REST API (Port 8081)
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                  # Mongoose connection with timeout & fallback logic
│   │   ├── controllers/               # Business logic controllers
│   │   │   ├── alertController.js     # Alert broadcasting & AI alert gateway
│   │   │   ├── authController.js      # User registration & login (mock tokens, plaintext)
│   │   │   ├── authorityController.js # Aggregated statistics for dashboard
│   │   │   ├── mapController.js       # Incidents, resources, and routes endpoints
│   │   │   ├── miscController.js      # Health check, feedback, and notifications
│   │   │   ├── predictionController.js# AI severity gateway with backend fallback
│   │   │   ├── reportController.js    # Disaster report CRUD operations
│   │   │   ├── rescueTeamController.js# Rescue team registration & status management
│   │   │   ├── resourceController.js  # Supply inventory & dispatch allocation
│   │   │   └── simulationController.js# Simulation runner, approvals, and overrides
│   │   ├── models/                    # Mongoose Schemas
│   │   │   ├── Alert.js
│   │   │   ├── DisasterReport.js
│   │   │   ├── EmergencyRoute.js
│   │   │   ├── Feedback.js
│   │   │   ├── Notification.js
│   │   │   ├── RescueTeam.js
│   │   │   ├── Resource.js
│   │   │   ├── ResourceAllocation.js
│   │   │   ├── Simulation.js
│   │   │   └── User.js
│   │   ├── routes/                    # Express Router definitions
│   │   ├── utils/
│   │   │   └── dataStore.js           # In-memory pre-populated mock database
│   │   ├── seed.js                    # Script to populate MongoDB from dataStore.js
│   │   └── server.js                  # Application entry point, middleware, static hosting
│   ├── package.json                   # Node.js dependencies & scripts
│   └── .env                           # Environment configurations
│
├── database/
│   └── mysql-init.sql                 # Unused legacy SQL schema file (leftover)
│
├── frontend/                          # Client Web Portal
│   ├── css/                           # Stylesheets for individual views
│   ├── html/                          # HTML pages
│   │   ├── alerts.html                # Emergency alerts feed
│   │   ├── authority-dashboard.html   # Command center dashboard
│   │   ├── citizen-dashboard.html     # Citizen portal view
│   │   ├── decision-simulator.html    # AI response plan simulation sandbox
│   │   ├── feedback.html              # Citizen feedback submission form
│   │   ├── index.html                 # Public landing page
│   │   ├── login.html                 # Login page
│   │   ├── map.html                   # Leaflet GIS disaster map
│   │   ├── notifications.html         # Citizen notifications list
│   │   ├── prediction.html            # AI severity prediction test utility
│   │   ├── register.html              # Account registration form
│   │   ├── report-disaster.html       # Citizen incident submission form
│   │   ├── rescue-team.html           # Rescue team registration form
│   │   ├── rescue-teams.html          # Active rescue teams list
│   │   ├── resource-allocation.html   # Supply dispatch allocation console
│   │   └── resources.html             # Supply inventory review
│   └── js/                            # Client-side JavaScript scripts
│       ├── api.js                     # Centralized fetch wrapper for backend endpoints
│       ├── config.js                  # API base URL configuration (http://localhost:8081/api)
│       └── [page].js                  # Individual page controllers
│
├── run.bat                            # Shortcut delegating to start.bat
├── start.bat                          # One-click launcher (Python + Node.js + Browser)
├── stop.bat                           # Script to terminate processes on ports 5000 & 8081
└── README.md                          # Documentation
```

---

## AI Modules: How They Actually Work

The AI microservice (`ai-model/`) is built on **Symbolic / Rule-Based Heuristic Evaluation** (no machine learning model training or learned weights). All code runs deterministically.

### 1. Disaster Severity & Priority Model (`ai-model/model.py`)
Incoming incidents are scored on a scale from **3 to 9 points** using three factors:

```python
score = 0

# Factor 1: Disaster Category
if disaster_type in ["earthquake", "flood", "cyclone", "tsunami"]:
    score += 3
elif disaster_type in ["fire", "landslide", "drought"]:
    score += 2
else:
    score += 1

# Factor 2: Casualty Count
if people_affected >= 500:
    score += 3
elif people_affected >= 100:
    score += 2
else:
    score += 1

# Factor 3: Reported Urgency / Keywords
if situation in ["critical", "very serious", "emergency"]:
    score += 3
elif situation in ["serious", "danger"]:
    score += 2
else:
    score += 1
```

**Thresholds:**
* `score >= 7`: `severity = "HIGH"`, `riskLevel = "HIGH"`, `priority = "IMMEDIATE"`
* `score >= 5`: `severity = "MEDIUM"`, `riskLevel = "MEDIUM"`, `priority = "URGENT"`
* `score < 5`: `severity = "LOW"`, `riskLevel = "LOW"`, `priority = "NORMAL"`

*(Note: If the Python service is offline, `reportController.js` and `predictionController.js` in the Express backend execute an internal fallback heuristic using similar threshold conditions).*

### 2. Resource Demand Predictor (`ai-model/resource_predictor.py`)
Computes supplies based on the severity tier and the number of affected people ($N$):

| Severity | Water Packets | Food Packets | Medical Trauma Kits | Rescue Teams |
| :--- | :--- | :--- | :--- | :--- |
| **HIGH** | $N \times 3$ | $N \times 3$ | $\max(10, \lfloor N / 10 \rfloor)$ | $\max(5, \lfloor N / 50 \rfloor)$ |
| **MEDIUM** | $N \times 2$ | $N \times 2$ | $\max(5, \lfloor N / 20 \rfloor)$ | $\max(2, \lfloor N / 100 \rfloor)$ |
| **LOW** | $N \times 1$ | $N \times 1$ | $\max(2, \lfloor N / 50 \rfloor)$ | $\max(1, \lfloor N / 200 \rfloor)$ |

### 3. Decision Simulator (`ai-model/decision_simulatory.py`)
Provides three predefined strategic postures:
* **Plan A** (*Fast Response*): High resource usage, fast response time.
* **Plan B** (*Balanced Response*): Medium resource usage, medium response time.
* **Plan C** (*Targeted / Constrained*): Low resource usage, slower response time.

**Selection Rule:**
* `if severity == "HIGH" and available_teams >= 5`: Selects **Plan A**.
* `elif severity == "MEDIUM" and available_teams >= 2`: Selects **Plan B**.
* `else`: Selects **Plan C**.

### 4. Alert Generator (`ai-model/alert_recommender.py`)
Selects alert categories based on severity and risk:
* `severity == "HIGH"` and `risk_level == "HIGH"` $\rightarrow$ `CRITICAL EMERGENCY` (`IMMEDIATE` priority)
* `severity == "MEDIUM"` $\rightarrow$ `EMERGENCY WARNING` (`URGENT` priority)
* All other combinations $\rightarrow$ `GENERAL WARNING` (`NORMAL` priority)

---

## Database Architecture & Fallback Mechanism

The backend supports dual data layers:

1. **MongoDB via Mongoose (`backend/src/config/db.js`)**:
   * The backend attempts to connect to `mongodb://127.0.0.1:27017/ai_disaster_response` with a 2.5-second connection timeout (`serverSelectionTimeoutMS: 2500`).
   * When connected, all read and write operations persist to MongoDB collections (`users`, `disasterreports`, `resources`, `alerts`, `rescueteams`, `emergencyroutes`, `simulations`, `feedbacks`, `notifications`, `resourceallocations`).
   * A database seeder (`backend/src/seed.js`) is provided to populate collections with realistic initial demo data.

2. **Resilient In-Memory Fallback Store (`backend/src/utils/dataStore.js`)**:
   * If MongoDB is not installed or unreachable, the application logs a warning and automatically switches to an in-memory JavaScript data store.
   * All API routes seamlessly read from and write to in-memory arrays during the active server session, allowing full local development and testing without installing MongoDB.

3. **Leftover Files**:
   * `database/mysql-init.sql`: A legacy 75-byte SQL table initialization script. It is **not** used by the backend code and is purely residual.

---

## Authentication Mechanism

* **Password Storage**: Passwords are saved and evaluated as **plaintext strings** (`user.password !== password` in `authController.js`). They are not hashed with `bcryptjs` at runtime, despite the library being installed.
* **Session Tokens**: Successful logins return a mock string format (`'jwt_mock_' + user._id`). They are not cryptographically signed JWTs, despite `jsonwebtoken` being installed in `package.json`.
* **Frontend Authentication**: The client pages [login.js](file:///c:/Users/kesha/Documents/ai-disaster/frontend/js/login.js) and [register.js](file:///c:/Users/kesha/Documents/ai-disaster/frontend/js/register.js) currently validate only that an account role is selected and redirect immediately to the respective dashboard without dispatching an HTTP request to `/api/auth/login`.

---

## Frontend Data Flow: Live API vs. LocalStorage / Demo Data

| Page / Component | Script | Data Source & Behavior |
| :--- | :--- | :--- |
| **Prediction Tester** (`prediction.html`) | `prediction.js`, `api.js` | 🟢 **Live Backend API**: Sends `POST /api/predictions` to port 8081. |
| **Incident Reporting** (`report-disaster.html`) | `report.js`, `api.js` | 🟢 **Live Backend API**: Submits `POST /api/reports`. |
| **Leaflet GIS Map** (`map.html`) | `map.js` | ⚠️ **Hardcoded Demo Coordinates**: Renders hardcoded incident coordinates in Visakhapatnam (`17.6868, 83.2185`) and Bheemunipatnam (`17.8900, 83.4500`). Does not fetch dynamic backend incident pins. |
| **Decision Simulator** (`decision-simulator.html`) | `simulator.js` | ⚠️ **Client-Side Math**: Calculates scores directly in the browser with local JavaScript penalties; does not invoke `/api/simulation/run`. |
| **Citizen & Admin Dashboards** | `dashboard.js` | ⚠️ **Browser LocalStorage**: Reads counts from `localStorage.getItem("disasterReports")`. |
| **Resource Inventory View** (`resources.html`) | `resources.js` | ⚠️ **LocalStorage / Static Object**: Reads from hardcoded `resourceData` object and `localStorage.getItem("latestReport")`. |
| **Rescue Teams** (`rescue-teams.html`) | `rescue-teams.js` | ⚠️ **Browser LocalStorage**: Stores and reads teams from `localStorage.getItem("rescueTeams")`. |
| **Supply Allocation** (`resource-allocation.html`) | `resource-allocation.js` | ⚠️ **Browser LocalStorage**: Persists dispatches to `localStorage.getItem("resourceAllocations")`. |
| **Feedback Submission** (`feedback.html`) | `feedback.js` | ⚠️ **Browser LocalStorage**: Appends reviews to `localStorage.getItem("feedbacks")`. |
| **Notifications** (`notifications.html`) | `notifications.js` | ⚠️ **Browser LocalStorage**: Appends notices to `localStorage.getItem("notifications")`. |
| **Alerts Feed** (`alerts.html`) | `alerts.js` | ⚠️ **Hardcoded Demo Object**: Renders static demo array `alertData.alerts`. |

---

## Complete REST API Endpoints

### 1. Express Backend Endpoints (Port `8081`)

| Module | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **System** | `GET` | `/api/health` | Service uptime and MongoDB/in-memory status |
| **Auth** | `POST` | `/api/auth/register` | Register new citizen, authority, or rescuer account |
| **Auth** | `POST` | `/api/auth/login` | Authenticate user against stored plaintext password |
| **Disaster Reports** | `GET` | `/api/reports` | List all reported disaster incidents |
| **Disaster Reports** | `POST` | `/api/reports` | Submit incident; calls AI service or fallback scoring |
| **Disaster Reports** | `GET` | `/api/reports/:id` | Fetch specific disaster report details |
| **Disaster Reports** | `PATCH`| `/api/reports/:id/status` | Update status (`REPORTED`, `IN_PROGRESS`, etc.) |
| **AI Predictions** | `POST` | `/api/predictions` | Evaluate severity via AI microservice / fallback |
| **AI Predictions** | `POST` | `/api/predictions/resources` | Estimate supplies via AI microservice / fallback |
| **Resources** | `GET` | `/api/resources` | Fetch relief resource inventory |
| **Resources** | `POST` | `/api/resources` | Add new emergency resources |
| **Resources** | `GET` | `/api/resources/locations` | Coordinates and quantities of storage depots |
| **Resources** | `GET` | `/api/resources/requirements/:reportId` | Hardcoded requirement profile for a report |
| **Resources** | `POST` | `/api/resources/allocate` | Dispatch resource stock and deduct available count |
| **Simulation** | `GET` | `/api/simulation` | Fetch history of generated simulation scenarios |
| **Simulation** | `POST` | `/api/simulation/run` | Execute decision simulation (proxy to AI service) |
| **Simulation** | `GET` | `/api/simulation/:simulationId` | Fetch simulation details |
| **Simulation** | `POST` | `/api/simulation/:simulationId/approve`| Mark response plan as `APPROVED` |
| **Simulation** | `POST` | `/api/simulation/:simulationId/override`| Mark response plan as `OVERRIDDEN` |
| **Alerts** | `GET` | `/api/alerts` | List active emergency alerts |
| **Alerts** | `POST` | `/api/alerts` | Broadcast an emergency alert |
| **Alerts** | `POST` | `/api/alerts/generate` | Generate AI advisory message |
| **Rescue Teams** | `GET` | `/api/rescue-teams` | Fetch all rescue units |
| **Rescue Teams** | `POST` | `/api/rescue-teams` | Register a new rescue unit |
| **Rescue Teams** | `PATCH`| `/api/rescue-teams/:id` | Update team deployment status or location |
| **Map Engine** | `GET` | `/api/map/incidents` | Incident coordinates and status |
| **Map Engine** | `GET` | `/api/map/resources` | Storage depot coordinates and quantities |
| **Map Engine** | `GET` | `/api/map/routes` | Evacuation route polylines and statuses |
| **Authority** | `GET` | `/api/authority/dashboard` | Aggregated command summary counts |
| **Feedback** | `GET` | `/api/feedback` | Retrieve citizen feedback submissions |
| **Feedback** | `POST` | `/api/feedback` | Submit citizen feedback |
| **Notifications** | `GET` | `/api/notifications` | Retrieve broadcast notifications |
| **Notifications** | `POST` | `/api/notifications` | Dispatch notification |

### 2. Python AI Microservice Endpoints (Port `5000`)

| Method | Endpoint | Input Parameters | Returns |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | None | Service operational status |
| `POST` | `/predict` | `{disasterType, peopleAffected, situation}` | Calculated severity, riskLevel, priority |
| `POST` | `/resources/predict` | `{severity, peopleAffected}` | Quantities of water, food, kits, teams |
| `POST` | `/simulation/run` | `{severity, peopleAffected, availableResources, availableTeams}` | Plan A, B, C objects and `bestPlan` |
| `POST` | `/alert/generate` | `{severity, riskLevel, location, peopleAffected}` | Alert type, priority, formatted message |

---

## Tech Stack (Verified from Dependencies)

### Backend
* **Runtime**: Node.js (ES Modules, `"type": "module"`)
* **Web Framework**: Express (`^4.21.2`)
* **Database Driver**: Mongoose (`^8.9.5`)
* **HTTP Client**: Axios (`^1.7.9`) (used to proxy requests to Python service)
* **Middleware**: CORS (`^2.8.5`), Morgan (`^1.10.0`), Dotenv (`^16.4.7`)
* **Installed but Unused at Runtime**: `bcryptjs` (`^2.4.3`), `jsonwebtoken` (`^9.0.2`)

### AI Microservice
* **Runtime**: Python 3.8+
* **Web Framework**: Flask (`3.0.3` / `requirements.txt`)
* **ML / Math Libraries**: None (Standard Python library only)

### Frontend
* **Core**: HTML5, CSS3, Vanilla JavaScript (ES6+)
* **Mapping**: Leaflet.js (`1.9.4` via CDN)
* **Map Tiles**: Esri World Street Map Tiles (`server.arcgisonline.com`)

---

## Setup & Running the Project

### Prerequisites
* **Node.js** (v18.x or newer) and **npm**
* **Python** (v3.8 or newer)
* *(Optional)* **MongoDB Community Server** running locally on port `27017` (if absent, the in-memory fallback will activate automatically).

### Option 1: One-Click Startup (Windows)
Run the automated launcher script from the project root:
```cmd
start.bat
```
*(or run `run.bat` which calls `start.bat`)*

This script automatically:
1. Starts the Python AI service in the background on `http://localhost:5000`.
2. Starts the Node.js Express backend in the background on `http://localhost:8081`.
3. Waits 4 seconds for services to initialize.
4. Opens `http://localhost:8081` in your default browser.

To stop both services:
```cmd
stop.bat
```

---

### Option 2: Manual Terminal Execution

#### 1. Start the Python AI Microservice
```powershell
cd ai-model
pip install -r requirements.txt
python app.py
```
*Runs on `http://localhost:5000`*

#### 2. Seed and Start the Express Backend
Open a second terminal window:
```powershell
cd backend
npm install
npm run seed     # (Optional: Populates demo records into MongoDB if connected)
npm start
```
*Runs on `http://localhost:8081`*

#### 3. Access the Web Portal
Open your browser and navigate to:
```text
http://localhost:8081
```
*(or open `frontend/html/index.html` directly).*

---

## Demo Credentials (Pre-Seeded Data)

| Role | Email | Password |
| :--- | :--- | :--- |
| **Authority / Admin** | `admin@disaster.gov` | `password123` |
| **Citizen** | `citizen@example.com` | `password123` |

---

## Known Limitations

1. **Heuristic AI Only**: There is no machine learning or continuous learning model. Predictions do not adapt based on historical data.
2. **Plaintext Passwords**: User credentials in both MongoDB and in-memory stores are stored unhashed; authentication tokens are non-cryptographic mock strings.
3. **Frontend API Disconnect**: Several frontend pages (`dashboard.html`, `map.html`, `resources.html`, `alerts.html`, `rescue-teams.html`, `feedback.html`) manage state using browser `localStorage` or static fixtures rather than consuming the backend REST API endpoints.
4. **Static Map Data**: The Leaflet map displays hardcoded demo incident coordinates centered on Visakhapatnam rather than pulling real-time coordinates from `/api/map/incidents`.
5. **No Real-Time Protocols**: There are no WebSockets, SSE, or message queues. All updates require page refreshes or poll requests.

---

## Future Work

* **ML Model Integration**: Train and export actual Scikit-learn (Random Forest / XGBoost) classifiers or integrate an LLM API (e.g. Gemini) for natural-language incident parsing.
* **Security Hardening**: Implement `bcrypt` password hashing and signed JWT validation middleware on protected API routes.
* **Frontend-to-Backend Integration**: Refactor remaining frontend pages to consume backend REST endpoints instead of `localStorage`.
* **Dynamic GIS Layering**: Bind the Leaflet map directly to `/api/map/incidents` and `/api/map/resources` to reflect submitted citizen reports dynamically.
* **Real-Time Push Notifications**: Add WebSockets (e.g., Socket.io) for real-time alert broadcasts without browser reloading.

---

## Differences from the Old README

| Item | Claim in Old README | Verified Reality in Code |
| :--- | :--- | :--- |
| **AI / ML Technology** | Claimed "Machine Learning & AI models" | **100% Rule-based expert system** (`model.py`). No ML libraries (`scikit-learn`, `torch`, `tensorflow`) or weight files exist. |
| **Backend Framework** | Claimed "Java & Spring Boot" | **Zero Java code exists**. The backend is entirely Node.js + Express (`backend/src/`). |
| **Database** | Claimed "MySQL" database | Backend uses **Mongoose/MongoDB** with an automatic **in-memory data store fallback** (`dataStore.js`). Only an unused 75-byte `.sql` file exists in `database/`. |
| **Authentication** | Claimed "JWT Authentication & bcryptjs" | Passwords are saved and evaluated in **plaintext**. Tokens are mock strings (`jwt_mock_...`). Frontend login forms redirect based on dropdown without checking API. |
| **Geospatial Map** | Claimed dynamic GIS map engine | Map uses **hardcoded demo coordinates** in Visakhapatnam (`map.js`). It does not load incident pins from the database. |
| **Real-Time Communication**| Claimed "real-time alerts & tracking" | No WebSockets, SSE, or socket servers exist. Uses standard HTTP request/response. |
| **Frontend State** | Implied full end-to-end integration | 8 out of 12 frontend pages use browser **`localStorage`** or hardcoded demo objects instead of consuming backend REST endpoints. |
