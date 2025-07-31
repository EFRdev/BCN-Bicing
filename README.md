# 🚴 BCN-Bicing: Real-Time Bike Stations in Barcelona

This mobile application helps you find nearby Bicing stations in Barcelona with real-time availability of bikes and docks.

## 📱 Core Features (MVP)

- ✅ **Geolocation**: Automatically detects your current location.
- ✅ **Nearby Stations**: Displays a list of the closest Bicing stations (default radius: 1km).
- ✅ **Real-Time Data**: Shows up-to-the-minute information on available bikes and empty docks.
- ✅ **Distance Calculation**: Calculates and shows the distance to each station from your location.
- ✅ **Manual Refresh**: A simple button to update the station data on demand.

## 🏗️ Project Structure

```
BCN-Bicing/
├── backend/                # Python/Flask REST API
│   ├── main.py             # Main Flask application
│   ├── api_client.py       # Client for the Bicing API
│   ├── services/           # Business logic modules
│   │   └── location_service.py
│   ├── utils/              # Utility functions
│   │   └── geo_utils.py
│   └── test_api.py         # API tests
├── frontend/               # React Native / Expo Mobile App
│   ├── App.js              # Main app component and navigation
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   └── station_item.js
│   │   ├── screens/        # App screens
│   │   │   └── HomeScreen.js
│   │   ├── services/       # Services for API calls
│   │   │   └── bicing_api_service.js
│   │   └── utils/          # Utility functions
│   │       └── geolocation.js
│   └── package.json
├── backend_env.sh          # Script to run the backend server
├── frontend_env.sh         # Script to run the frontend app
├── setup_project.sh        # Initial project setup script
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Python 3.12+
- Node.js 16+
- Expo CLI
- A smartphone with the Expo Go app or an emulator.

### Setup

1.  **Run the setup script** to install all dependencies for both frontend and backend:

    ```bash
    chmod +x setup_project.sh
    ./setup_project.sh
    ```

### Running the Application

1.  **Start the Backend Server**:

    Open a terminal and run:

    ```bash
    ./backend_env.sh
    ```

    The backend will be running at `http://localhost:8000`.

2.  **Start the Frontend App**:

    Open a second terminal and run:

    ```bash
    ./frontend_env.sh
    ```

    This will start the Metro bundler and provide you with a QR code to run the app on your device using Expo Go.

## 🔧 Scripts Overview

-   `setup_project.sh`: Use this once to set up the entire project.
-   `backend_env.sh`: Runs the backend server and its dependencies.
-   `frontend_env.sh`: Runs the frontend application.
-   `dev_commands.sh`: A utility script with several development commands.

## ⚙️ API Endpoints

The backend provides the following endpoints:

-   `GET /api/health`: Health check.
-   `GET /api/stations`: Get a list of all stations.
-   `GET /api/stations/nearby?lat=<latitude>&lng=<longitude>`: Get stations near a specific location.

## 🛠️ Tech Stack

-   **Backend**: Python, Flask, Requests
-   **Frontend**: React Native, Expo
-   **APIs**: Open Data Barcelona (Bicing)
-   **Geolocation**: Expo Location
