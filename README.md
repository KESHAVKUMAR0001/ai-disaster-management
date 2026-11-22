# AI-Based Disaster Response & Resource Management System

A full-stack emergency response prototype connecting citizen reporting, rule-based AI triage, resource planning, and authority coordination.

---

## 🏗️ Architecture & Real Tech Stack

* **Frontend**: HTML5, CSS3, Vanilla JavaScript, Leaflet.js (`1.9.4`) with Esri World Street Map vector tiles.
* **Backend API (Port 8081)**: Node.js (ESM), Express (`4.21.2`), Mongoose (`8.9.5`), Axios, CORS, Dotenv.
* **Database**: MongoDB (`mongodb://127.0.0.1:27017/ai_disaster_response`) with automatic **in-memory data store fallback** (`src/utils/dataStore.js`) when MongoDB is unavailable. *(Note: `database/mysql-init.sql` is an unused legacy file).*
* **AI Service (Port 5000)**: Python 3, Flask (`3.0.3`). Uses standard library only (no ML packages).

```text
Browser Web Portal (:8081) ──HTTP──> Express Backend (:8081) ──HTTP──> Python AI Engine (:5000)
                                           │
                                  ┌────────┴────────┐
                             MongoDB (27017)   In-Memory Store
```

---

## 📁 Project Structure

```text
ai-disaster/
├── ai-model/       # Flask microservice (:5000) for heuristic scoring & plan simulation
├── backend/        # Node.js + Express REST API (:8081), Mongoose schemas, and in-memory store
├── database/       # mysql-init.sql (legacy, unused)
├── frontend/       # HTML, CSS, JS client pages & Leaflet map views
├── start.bat       # 1-Click launcher (starts AI service, backend, and opens browser)
└── stop.bat        # 1-Click shutdown for background services on ports 5000 and 8081
```

---

## 🤖 AI Modules: Real Logic (Rule-Based, No Learning)

The system does **not** use trained machine learning models, neural networks, or dataset weights (no `.pkl`, `.h5`, or scikit-learn). All logic is deterministic symbolic/heuristic rules:

1. **Disaster Severity & Priority (`ai-model/model.py`)**:
   * Evaluates 3 criteria on a **3–9 point scale**:
     * **Disaster Type**: Earthquake/Flood/Cyclone/Tsunami (+3), Fire/Landslide/Drought (+2), Other (+1).
     * **Affected People**: $\ge 500$ (+3), $100–499$ (+2), $< 100$ (+1).
     * **Urgency**: Critical/Emergency (+3), Serious/Danger (+2), Normal (+1).
   * **Output**: Score $\ge 7 \rightarrow$ `HIGH` (Immediate); $\ge 5 \rightarrow$ `MEDIUM` (Urgent); $< 5 \rightarrow$ `LOW` (Normal).
2. **Resource Demand Prediction (`ai-model/resource_predictor.py`)**:
   * **HIGH**: $3\times$ water/food per victim, $\max(10, \lfloor N/10 \rfloor)$ medkits, $\max(5, \lfloor N/50 \rfloor)$ rescue teams.
   * **MEDIUM**: $2\times$ water/food, $\max(5, \lfloor N/20 \rfloor)$ medkits, $\max(2, \lfloor N/100 \rfloor)$ rescue teams.
   * **LOW**: $1\times$ water/food, $\max(2, \lfloor N/50 \rfloor)$ medkits, $\max(1, \lfloor N/200 \rfloor)$ rescue teams.
3. **Decision Simulator (`ai-model/decision_simulatory.py`)**:
   * Selects among Plan A (Fast/High usage), Plan B (Balanced), and Plan C (Constrained).
   * Picks **Plan A** if High severity and $\ge 5$ teams; **Plan B** if Medium severity and $\ge 2$ teams; otherwise **Plan C**.
4. **Alert Generator (`ai-model/alert_recommender.py`)**:
   * High severity & risk $\rightarrow$ `CRITICAL EMERGENCY`; Medium $\rightarrow$ `EMERGENCY WARNING`; else `GENERAL WARNING`.

---

## 🔌 Key REST API Endpoints

| Service | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Backend (:8081)** | `GET` | `/api/health` | Backend status & MongoDB/in-memory mode |
| | `POST` | `/api/auth/register`, `/api/auth/login` | Account management *(plaintext passwords, mock token)* |
| | `GET`, `POST` | `/api/reports` | List all incidents or submit new citizen report |
| | `POST` | `/api/predictions` | Proxy severity scoring to AI service |
| | `GET`, `POST` | `/api/resources` | Fetch inventory or register new resources |
| | `POST` | `/api/resources/allocate` | Dispatch resource stock to disaster zone |
| | `GET`, `POST` | `/api/simulation/run` | Execute decision simulation and record plan |
| | `GET`, `POST` | `/api/alerts` | Retrieve alerts or broadcast emergency notice |
| | `GET`, `POST` | `/api/rescue-teams` | Manage emergency rescue units & deployments |
| | `GET` | `/api/map/incidents` | Incident coordinates and status |
| **AI Service (:5000)**| `POST` | `/predict`, `/resources/predict` | Severity scoring & resource demand formulas |
| | `POST` | `/simulation/run`, `/alert/generate` | Tactical plan selection & alert dispatch text |

---

## 🚀 Setup & Execution

### Prerequisites
* Node.js (v18+) & Python (3.8+)
* *(Optional)* MongoDB locally on port 27017 (auto-falls back to in-memory store if offline)

### 1-Click Launch (Windows)
* **Start All Services**: Run `start.bat` (launches AI service on `:5000`, backend on `:8081`, opens browser).
* **Stop All Services**: Run `stop.bat` (terminates background processes on ports 5000 & 8081).

### Manual Startup
```bash
# Terminal 1: AI Microservice
cd ai-model && pip install -r requirements.txt && python app.py

# Terminal 2: Backend & Web Portal
cd backend && npm install && npm run seed && npm start
```
*Access Web Portal at: `http://localhost:8081`*

### Demo Credentials
* **Authority**: `admin@disaster.gov` | `password123`
* **Citizen**: `citizen@example.com` | `password123`

---

## ⚠️ Known Limitations & Code Reality

1. **Heuristic AI Only**: Zero machine learning, neural networks, or statistical training.
2. **Plaintext Passwords**: Passwords stored unhashed (`bcryptjs` unused); auth returns mock tokens (`jsonwebtoken` unused).
3. **Frontend Data Source**: Leaflet map (`map.js`) uses hardcoded demo coordinates (Visakhapatnam); secondary pages (`dashboard`, `rescue-teams`, `feedback`) use browser `localStorage` instead of backend REST endpoints.
4. **No Real-Time Protocols**: No WebSockets/SSE; relies on standard HTTP request/response.

---

## 🔄 Differences from Legacy Claims

| Item | Old Claim | Code Reality |
| :--- | :--- | :--- |
| **AI/ML** | Machine Learning models | **100% Rule-based heuristic scoring** (`model.py`). No ML packages installed. |
| **Backend** | Java & Spring Boot | **Zero Java code**. 100% Node.js & Express. |
| **Database** | MySQL | **MongoDB** with automatic **in-memory fallback**. (`mysql-init.sql` is unused). |
| **Security** | Bcrypt & JWT auth | Passwords stored in **plaintext**; tokens are mock strings. |
| **Map Data** | Dynamic GIS engine | Displays **hardcoded demo coordinates** in Visakhapatnam. |

---

## 🔮 Future Work

* Integrate a trained ML classifier (Scikit-learn Random Forest / XGBoost) or LLM API for report parsing.
* Implement real bcrypt hashing and signed JWT validation on API routes.
* Connect all frontend forms and dynamic GIS map layers directly to backend REST endpoints.
