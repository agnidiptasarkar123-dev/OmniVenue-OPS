# 🏟️ OmniVenue-OPS
**Enterprise Stadium Operations & Smart Orchestration Command Center**

[![Deployed on Render](https://img.shields.io/badge/Deployed-Render-success?style=for-the-badge&logo=render)](https://omnivenue-ops.onrender.com)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.14+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Frontend](https://img.shields.io/badge/Frontend-Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)]()

## 📌 Overview
**OmniVenue-OPS** is a comprehensive, real-time stadium operations dashboard designed specifically for high-capacity events like the **FIFA World Cup 2026**. It acts as a centralized Command Center, integrating live crowd analytics, IoT sensor telemetry, cyber-physical threat correlation, and a multilingual AI Copilot to support fan safety, streamline logistics, and help operators respond to incidents quickly.

## 🚀 Key Features
* **🤖 Multilingual Agentic Operations Copilot:** An embedded AI assistant that automatically detects the query language, translates it, routes intent (telemetry, logistics, security, infrastructure, admin), and can execute system commands via text or voice (e.g., "Reroute security drones to Gate B").
* **📊 Zone Density Matrix & Crowd Optimizer:** Real-time visualization of stadium zones using heatmaps and gravity-well analytics to help prevent overcrowding and optimize clearance times.
* **🌍 Global Venue Mapping:** Interactive, keyboard-accessible SVG-based stadium blueprints tracking live fan density and active matches across 16 FIFA 2026 venues.
* **🔐 Cyber-Physical Threat Correlation:** Network-layer threat analysis (`/analyze`) that automatically links detected cyber threats to physical incident logs for the affected venue.
* **🚨 Chaos Mode Simulation:** An admin-protected system stress-tester to simulate critical emergency patterns and evaluate dynamic rerouting engines.
* **📡 IoT Sensor Telemetry & Predictive Flow:** Real-time monitoring of temperature, acoustic pressure, air quality, and wind velocity with predictive trend visualization.
* **📄 Automated Compliance Reporting:** One-click generation of official FIFA compliance and incident reports for post-event auditing.

## 💻 Tech Stack
* **Frontend:** HTML5, Modern CSS3 (Glassmorphism UI), Vanilla JavaScript, Chart.js
* **Backend:** FastAPI, Python, Uvicorn
* **Database:** SQLite (`stadium.db`)
* **Deployment:** Render Cloud Platform

## 🌐 Live Demo
Access the live command center here: [OmniVenue-OPS on Render](https://omnivenue-ops.onrender.com)

## 🛠️ Local Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/agnidiptasarkar123-dev/OmniVenue-OPS.git
   cd OmniVenue-OPS


## Install the required dependencies:
pip install -r requirements.txt

## Environment Variables:
export ADMIN_KEY=your-secret-admin-key

## Run the FastAPI server locally:
uvicorn main:app --host 0.0.0.0 --port 8001 --reload

## Access the application:
Open your browser and navigate to http://localhost:8001

## 🧪Running Tests:
pytest test_main.py -v

## With Coverage Reports:
pytest --cov=main --cov-report=term-missing


## 📌 Hackathon Instructions Alignment (Evaluation Criteria)

**1. Your chosen vertical:** 
Smart Stadium Operations & AI Orchestration (Persona: Stadium Command Center Operator).

**2. Approach and logic:** 
The approach uses a FastAPI Python backend for real-time data processing paired with a lightweight, dependency-free Vanilla JS frontend. A background-threaded simulation engine continuously updates crowd density, match state, sensor telemetry, and concession queues across 16 venues. State-changing operations (Chaos Mode, incident acknowledgment) are protected behind API-key authentication, and database writes are executed via a threadpool to keep the async request path non-blocking.

**3. How the solution works:** 
The backend continuously simulates telemetry data (crowd density, acoustic levels, temperature, match events) and exposes it via REST APIs. The frontend consumes this data and updates the DOM using Vanilla JS, with SVG-based interactive zone maps and Chart.js visualizations. An integrated multilingual AI Copilot processes natural-language queries and commands, routing them by intent and — for emergency-related queries — autonomously triggering Chaos Mode and logging the incident.

**4. Any assumptions made:** 
- IoT edge devices across the stadium are assumed to securely transmit data to the central server via low-latency networks; this prototype simulates that data stream rather than connecting to physical hardware.
- Real-time CCTV feeds are mocked via deterministic, randomized density matrices for the scope of this prototype.
- The `/analyze` endpoint is intentionally left public, simulating an external network sensor feed reporting into the system; all internal state-changing actions are authenticated.

## ⚠️ Known Limitations
- Threat detection (`/analyze` and the chatbot's security-intent routing) uses rule-based keyword matching for demo purposes, not a trained NLP/ML model.
- SQLite is used for simplicity; a production deployment handling concurrent multi-instance traffic would use PostgreSQL.
- CCTV/IoT feeds are simulated via deterministic data generation rather than connected to real hardware.
- The Gemini-powered AI summary endpoint is optional and only active when a `GEMINI_API_KEY` is configured.


   ## 👤Author
   Agnidipta Sarkar
