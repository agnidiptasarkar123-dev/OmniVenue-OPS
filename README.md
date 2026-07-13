# 🏟️ OmniVenue Ops
**Autonomous Stadium Operations & Smart Orchestration Command Center**

## 📌 Overview
OmniVenue Ops is an enterprise-grade smart stadium management platform designed to monitor, manage, and secure multi-venue global tournaments. The system integrates real-time IoT telemetry, AI-driven incident management, and crowd control orchestration into a centralized, high-fidelity command dashboard.

## 🚀 Key Features
*   **Dynamic IoT Telemetry:** Real-time simulation and tracking of environmental vectors (Acoustic Pressure, AQI, Wind Velocity).
*   **Intelligent Incident Command:** Automated threat detection and logging for rapid security deployment.
*   **Seamless State Synchronization:** Low-latency polling connecting a fast Python backend with an interactive SVG-based frontend.
*   **Data Persistence:** Robust SQLite databases (`stadium.db`, `threat_logs.db`) for tracking structural stadium states and security logs.

## 🛠️ Tech Stack
*   **Backend:** Python (FastAPI/Flask)
*   **Frontend:** HTML5, CSS3, JavaScript, React (`app.jsx`)
*   **Database:** SQLite 
*   **Architecture:** RESTful API with asynchronous event handling

## ⚙️ How to Run Locally
1. Clone the repository: `git clone https://github.com/agnidiptasarkar123-dev/OmniVenue-OPS.git`
2. Navigate to the directory: `cd OmniVenue-OPS`
3. Start the backend server: `python main.py`
4. Open `index.html` in your browser to access the command dashboard.

---
*Built with ❤️ for the Prompt Wars Virtual Hackathon by Google & Hack2skill.*
