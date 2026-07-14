# 🏟️ OmniVenue-OPS
**Enterprise Stadium Operations & Smart Orchestration Command Center**

[![Deployed on Render](https://img.shields.io/badge/Deployed-Render-success?style=for-the-badge&logo=render)](https://omnivenue-ops.onrender.com)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.14+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Frontend](https://img.shields.io/badge/Frontend-Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)]()

## 📌 Overview
**OmniVenue-OPS** is a GenAI-powered, state-of-the-art stadium operations dashboard designed specifically for high-capacity events like the **FIFA World Cup 2026**. It acts as a centralized Command Center, integrating real-time crowd analytics, IoT sensor telemetry, and an autonomous Agentic AI Copilot to ensure fan safety, streamline logistics, and mitigate critical incidents seamlessly.

## 🚀 Key Features
* **🤖 Agentic Operations Copilot:** An embedded GenAI assistant capable of executing system commands via text or voice (e.g., "Reroute security drones to Gate B").
* **📊 Zone Density Matrix & Crowd Optimizer:** Real-time visualization of stadium zones using heatmaps and gravity well analytics to prevent stampedes and optimize clearance times.
* **🌍 Global Venue Mapping:** Interactive SVG-based stadium blueprints tracking live fan movement and active matches.
* **🚨 Chaos Mode Simulation:** A dedicated system stress-tester to simulate critical emergency patterns and evaluate dynamic rerouting engines.
* **📡 IoT Sensor Telemetry & Predictive Flow:** Real-time monitoring of temperature, acoustic pressure, air quality, and wind velocity with predictive trend analysis.
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
   git clone [https://github.com/agnidiptasarkar123-dev/OmniVenue-OPS.git](https://github.com/agnidiptasarkar123-dev/OmniVenue-OPS.git)
   cd OmniVenue-OPS
## Install the required dependencies:
pip install -r requirements.txt

## Run the FastAPI server locally:
uvicorn main:app --host 0.0.0.0 --port 10000 --reload

## Access the application:
Open your browser and navigate to http://localhost:10000

## 📌 Hackathon Instructions Alignment (Evaluation Criteria)

**1. Your chosen vertical:** 
Smart Stadium Operations & AI Orchestration (Persona: Stadium Command Center Operator).

**2. Approach and logic:** 
The approach utilizes a microservices-inspired architecture combining a FastAPI Python backend for rapid data processing with a lightweight, dependency-free Vanilla JS frontend. The logic hinges on real-time asynchronous data fetching to monitor crowd density, IoT sensor metrics, and orchestrate security deployments autonomously.

**3. How the solution works:** 
The backend continuously streams mock telemetry data (JSON) representing crowd density, acoustic levels, and temperature. The frontend consumes this via REST APIs and updates the DOM using efficient Vanilla JS. An integrated 'Agentic Copilot' processes natural language commands to dynamically alter the stadium's operational state (e.g., triggering emergency rerouting).

**4. Any assumptions made:** 
- It is assumed that IoT edge devices across the stadium securely transmit data to the central server via low-latency networks.
- The AI Copilot assumes English as the primary operational language for command parsing.
- Real-time CCTV feeds are mocked via data-driven density matrices for the scope of this prototype.
