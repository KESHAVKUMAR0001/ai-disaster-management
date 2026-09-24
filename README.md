# AI-Based Disaster Response & Resource Management System

## 📌 Project Overview

The **AI-Based Disaster Response & Resource Management System** is a software platform designed to improve disaster response by collecting real-time disaster reports, analyzing their severity using AI/ML, identifying priority locations, and helping authorities allocate emergency resources effectively.

The system connects **citizens, AI models, rescue teams, resources, maps, and authorities** in a single platform to support faster and more informed disaster management.

---

## 🎯 Why This Project?

During disasters, information can come from many different people and locations. Manually analyzing all reports and deciding which areas need immediate attention can be difficult and time-consuming.

Our system helps solve this problem by:

* Collecting disaster reports from citizens.
* Identifying the location of reported incidents.
* Using AI/ML to analyze disaster severity and priority.
* Identifying high-priority areas that need immediate attention.
* Predicting required emergency resources.
* Helping authorities allocate resources efficiently.
* Providing alerts and notifications to relevant rescue teams.
* Supporting decision-making through an AI-based simulation module.
* Providing map-based information for disaster locations and emergency routes.

### Main Goal

> **To use AI and real-time data to support faster disaster response, better resource allocation, and effective emergency decision-making.**

---

# 🚨 How the System Works

### 1. Citizen Reports a Disaster

A citizen can submit information such as:

* Disaster type
* Location
* Description
* Severity-related information
* Other relevant details

### 2. Location & Map

The reported location is stored and displayed using the map module.

This helps authorities and rescue teams understand **where the disaster has occurred** and identify nearby areas requiring attention.

### 3. AI-Based Prediction

The AI model analyzes the collected disaster information and predicts the severity/priority of the incident.

Example:

**Low → Medium → High**

High-priority incidents can be handled first.

### 4. Resource Prediction

The system estimates the type and amount of emergency resources that may be required, such as:

* Rescue teams
* Medical support
* Emergency supplies
* Transportation
* Other necessary resources

### 5. Alert & Notification

When an incident requires urgent attention, the system generates alerts and notifications for the appropriate authorities or rescue teams.

### 6. Resource Allocation

Authorities can view available resources and decide how they should be allocated to different disaster locations.

### 7. Decision Simulation

The decision simulator allows authorities to evaluate possible response situations and understand how different resource-allocation decisions may affect the response.

---

# ⭐ Key Features

* 👤 Citizen Registration & Login
* 📝 Disaster Report Submission
* 📍 Location & Map Integration
* 🤖 AI-Based Disaster Severity Prediction
* 🎯 Priority Zone Identification
* 📊 Resource Requirement Prediction
* 🚑 Rescue Team Management
* 📦 Emergency Resource Management
* 🔔 AI-Based Alert Recommendations
* 📢 Notifications
* 🧠 AI Decision Simulation
* 🏛️ Authority Dashboard
* 📋 Resource Allocation
* 🛣️ Emergency Route Management
* 💬 Citizen Feedback
* ❤️ System Health Monitoring

---

# 🧠 Where AI/ML Is Used

AI/ML is mainly used to support decision-making rather than simply storing disaster information.

### AI Modules

**1. Disaster Prediction**

Analyzes disaster-related information and predicts the severity/priority.

**2. Resource Prediction**

Predicts the possible resources required based on disaster conditions.

**3. Alert Recommendation**

Helps recommend when an incident requires urgent attention.

**4. Decision Simulation**

Allows authorities to evaluate different disaster-response decisions.

---

# 🏗️ Project Architecture

The system connects citizens, rescue teams, and emergency command authorities:

```text
Citizen / Authority Web Portal
             ↕ (HTTP / REST)
Node.js + Express Backend (:8081)
 ┌───────────────┬───────────────┐
 ↓               ↓               ↓
MongoDB        Python AI       Geospatial
Database       Microservice    Map Engine
(Mongoose)     (Port 5000)
```

---

# 📂 Project Structure

```text
ai-disaster/
│
├── frontend/                     # Web Portal (HTML5, CSS3, JavaScript)
│   ├── html/                     # Portal pages (Dashboard, Reports, Map, Resources, etc.)
│   ├── css/                      # Custom stylesheets
│   └── js/                       # Client logic & REST API integration
│
├── backend/                      # Node.js + Express REST API (:8081)
│   ├── src/
│   │   ├── config/               # Database connection (MongoDB / Mongoose)
│   │   ├── models/               # Mongoose schemas (User, Report, Alert, Resource, etc.)
│   │   ├── controllers/          # Business logic & AI service integration
│   │   ├── routes/               # REST API endpoints
│   │   ├── utils/                # Utility helpers & fallback data store
│   │   ├── seed.js               # Database seeder
│   │   └── server.js             # Express application entry point
│   ├── package.json
│   └── .env
│
├── ai-model/                     # Python Flask Microservice (:5000)
│   ├── app.py                    # Flask server
│   ├── predictor.py              # Disaster severity prediction
│   ├── resource_predictor.py     # Resource requirement estimation
│   ├── decision_simulatory.py    # AI decision simulator
│   └── alert_recommender.py      # Emergency alert recommendation
│
├── start.bat                     # 1-Click Launch: AI Model + Express + Frontend
├── stop.bat                      # 1-Click Stop for all background services
└── run.bat                       # Launcher script
```

---

# 💻 Technologies Used

## Frontend
* HTML5 & CSS3
* JavaScript (ES6+)
* REST API Client (`fetch`)

## Backend
* Node.js & Express.js
* Mongoose (MongoDB ODM)
* JWT Authentication & bcryptjs
* CORS, Axios, Morgan logging

## Database
* MongoDB (with automatic local fallback store for seamless dev)

## AI / ML Service
* Python 3 & Flask
* Machine Learning & heuristic prediction models

---

# 👥 User Roles

### 👤 Citizen

Citizens can:

* Register/Login
* Report disasters
* Provide disaster location
* View relevant alerts
* Receive notifications
* Provide feedback

### 🏛️ Authority

Authorities can:

* View disaster reports
* Monitor priority areas
* Analyze AI predictions
* Monitor available resources
* Manage rescue teams
* Allocate resources
* Use decision simulation
* Monitor alerts and notifications

### 🚑 Rescue Teams

Rescue teams receive information about priority disaster locations and the emergency support required.

---

# 🔄 Complete Workflow

```text
Citizen
   ↓
Reports Disaster
   ↓
Location Captured
   ↓
Data Stored in MySQL
   ↓
AI/ML Analysis
   ↓
Severity & Priority Prediction
   ↓
Priority Area Identified
   ↓
Resource Requirement Prediction
   ↓
Alert Generated
   ↓
Authority Notified
   ↓
Resources Allocated
   ↓
Rescue Team Responds
   ↓
Feedback & Monitoring
```

---

# 🌟 Project Innovation

The main idea is to combine multiple disaster-management functions into one integrated platform.

Instead of only reporting a disaster, the system connects:

**Disaster Reporting + AI Prediction + Maps + Resource Prediction + Alerts + Resource Allocation + Decision Simulation**

This provides a more complete decision-support system for emergency response.

---

# 🎓 Project Purpose

This project is developed as a **B.Tech / academic AI & ML project** to demonstrate the practical use of:

* Artificial Intelligence
* Machine Learning
* Java & Spring Boot
* Python
* REST APIs
* MySQL
* Web Technologies
* Map-based systems
* Decision-support systems

---

# 🚀 Future Enhancements

* Real-time weather and disaster data integration
* Advanced ML models using larger datasets
* Real-time GPS tracking of rescue teams
* Automated emergency communication
* Satellite and remote-sensing data integration
* Mobile application
* Real-time resource tracking
* Improved disaster forecasting
* Multilingual citizen reporting

---

# 📄 Documentation

Project documentation and system diagrams are available in the `documentation/` folder.

---

# 👩‍💻 Project Team

**AI-Based Disaster Response & Resource Management System**

Developed as an academic project in the field of **Artificial Intelligence and Machine Learning**.

---

## 📌 Note

This project is a prototype intended to demonstrate how AI, data, maps, and software systems can support disaster-response decision making. It is not intended to replace official emergency-management systems or professional emergency services.
