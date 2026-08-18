# 🚀 TMU CanSat Ground Station

## Overview

This project was developed as part of the TMU CanSat Ground Station onboarding challenge.

The application reads telemetry data from a CSV file, processes sensor measurements using Python, and displays interactive visualizations through a web-based dashboard. The goal is to simulate a simplified ground station capable of monitoring flight telemetry and presenting mission data in a clear and accessible format.

---

## Features

### Telemetry Processing
- Reads telemetry data from a CSV file
- Processes accelerometer, gyroscope, pressure, voltage, current, and GPS data
- Computes acceleration magnitude from X, Y, and Z accelerometer axes
- Estimates altitude from barometric pressure measurements

### Backend
- Built using Flask
- Serves telemetry data through a REST API endpoint
- Uses Pandas and NumPy for data processing and calculations

### Dashboard
- Interactive Plotly visualizations
- Accelerometer data visualization
- Gyroscope data visualization
- Pressure visualization
- Estimated altitude visualization
- Mission statistics cards displaying:
  - Maximum acceleration
  - Maximum pressure
  - GPS satellite count
  - Current altitude
  - Number of telemetry samples
  - Flight duration

### User Interface
- Responsive dashboard layout
- Dark-themed telemetry monitoring interface
- Interactive charts with zoom and pan functionality

---

## Technologies Used

### Backend
- Python
- Flask
- Pandas
- NumPy

### Frontend
- HTML
- CSS
- JavaScript
- Plotly.js

### Version Control
- Git
- GitHub

---

## Project Structure

```text
groundstation/
│
├── app.py
├── requirements.txt
├── README.md
│
├── data/
│   └── telemetry.csv
│
├── templates/
│   └── index.html
│
└── static/
    ├── css/
    │   └── style.css
    │
    └── js/
        └── app.js
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Srushti-Patel442/tmu-cansat-groundstation.git
cd tmu-cansat-groundstation
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

### 3. Activate the virtual environment

Windows:

```bash
venv\Scripts\activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

---

## Running the Application

Start the Flask server:

```bash
python app.py
```

Open the dashboard in your browser:

```text
http://127.0.0.1:5000
```

---

## API Endpoint

The application exposes a telemetry API endpoint:

```text
/api/telemetry
```

This endpoint returns telemetry data in JSON format for use by the dashboard.

---

## System Architecture

```text
Telemetry CSV
       │
       ▼
   Flask Backend
       │
       ▼
 Data Processing
(Pandas + NumPy)
       │
       ▼
    JSON API
       │
       ▼
 JavaScript Fetch
       │
       ▼
 Plotly Dashboard
```

---

## Design Decisions

- Flask was chosen for its lightweight architecture and ease of API development.
- Pandas was used for efficient telemetry data processing.
- NumPy was used to calculate acceleration magnitude and altitude estimates.
- Plotly was selected to provide interactive telemetry visualizations.
- Telemetry calculations are performed on the backend to keep frontend logic simple and maintainable.

---

## Future Improvements

- Real-time telemetry streaming using WebSockets
- GPS path visualization on an interactive map
- Telemetry anomaly detection and alerting
- Flight replay functionality
- Additional mission health monitoring metrics

---

## Author

**Srushti Patel**

TMU Computer Engineering  
TMU CanSat Ground Station Onboarding Project