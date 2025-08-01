# 🚴 BicingAprop: Real-Time Bicing Stations Availability (Barcelona)

This mobile app helps you find nearby Bicing Stations in Barcelona with real-time availability of bikes and docks.

## INDEX
1.  [Project Overview](#project-overview)
2.  [Core Features (MVP)](#core-features-mvp)
3.  [Tech Stack](#tech-stack)
4.  [Download the App](#download-the-app)
5.  [Getting Started (dev)](#getting-started-dev)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Running the Application](#running-the-application)
    - [Scripts Overview](#scripts-overview)
    - [API Endpoints](#api-endpoints)
6.  [Credits and Data Source](#credits-and-data-source)

## 📄 Project Overview

The goal of this project is to help Bicing users in Barcelona find the nearest bike or free dock, **fast and easy**.

Simply open the app and it will show you the nearest Bicing stations along with their bike and dock availability in real time.

The application's architecture consists of a **mobile frontend developed with Expo** and a robust **backend API built with Python/Flask**. This backend is responsible for consuming data from the Bicing API in real-time, performing geographical calculations to identify stations within a 1000m radius from the user's location, and serving this information to the frontend.

This entire system has been successfully deployed on **Google Cloud Platform (GCP)**, utilizing Cloud Run for a serverless, scalable, and cost-effective backend solution. The project has been containerized using **Docker** to ensure a consistent and portable deployment environment.

Furthermore, this application serves as a foundation for future development, with plans to integrate **machine learning models to predict** the future availability of bikes and docks at nearby stations, providing users with even more valuable insights.

To enhance the user experience, the application currently integrates with Google Maps, allowing users to navigate directly to their selected Bicing station with a single tap. Looking ahead, the project's roadmap includes a plan to connect with the Smou mobility application. This future integration would enable a deeper level of functionality, allowing users to not only find a bike but also to directly reserve it and execute the full rental process within the native Smou platform, creating a seamless and end-to-end user journey.

## 📱 Core Features (MVP)

-   ✅ **Geolocation**: Automatically detects your current location.
-   ✅ **Nearby Stations**: Displays a list of the closest Bicing stations (default radius: 1000m).
-   ✅ **Real-Time Data**: Shows up-to-the-minute information on available bikes (e-bikes and mechanicals) and empty docks.
-   ✅ **Distance Calculation**: Calculates and shows the distance to each station from your location.
-   ✅ **Manual Refresh**: A simple button to update the station data on demand.
-   ✅ **Google Maps Integration**: With a simple tap you will be redirected to Google Maps to navigate to the selected station.

## 🛠️ Tech Stack

-   **Backend**: Python, Flask, Gunicorn
-   **Frontend**: React Native, Expo
-   **APIs**: Open Data Barcelona (Bicing)
-   **Geolocation**: Expo Location

## ⬇️ Download the App

*(Add your app store links here)*

## 🚀 Getting Started (dev)

This guide will walk you through setting up and running the application in a local development environment.

### Prerequisites

To run the project locally and deploy it to Google Cloud, you will need the following tools:

#### For Local Development
* **Python 3.9+**
* **Node.js 18+** (which includes npm)
* **Expo Go App** on your smartphone or an emulator.

#### For Google Cloud Deployment
* **Google Cloud CLI (`gcloud`)**
* **Docker**
* **EAS CLI** (Expo Application Services Command-Line Interface)

### Setup

The project is divided into two main parts: the `backend` (Python/Flask) and the `frontend` (Expo).

1.  **Backend Setup**
    * Navigate to the backend directory:
        ```bash
        cd backend
        ```
    * Install the required Python dependencies:
        ```bash
        pip install -r requirements.txt
        ```
    * Create an empty `.env` file in the `backend` folder.

2.  **Frontend Setup**
    * Navigate to the frontend directory:
        ```bash
        cd ../frontend
        ```
    * Install the required Node.js dependencies:
        ```bash
        npm install
        ```

### Running the Application

To run the full application, you need to start both the backend and frontend servers in separate terminal windows.

1.  **Start the Backend Server**
    * In a terminal, navigate to the `backend` directory and run:
        ```bash
        python app.py
        ```
    * The server will be running at `http://localhost:8000`.

2.  **Start the Frontend App**
    * In a **second** terminal, navigate to the `frontend` directory and run:
        ```bash
        npm start
        ```
    * This will launch the Metro bundler and provide you with a QR code to run the app on your device using Expo Go.

### Scripts Overview

This section provides an overview of the main project files and commands.

* `app.py`: The core Python/Flask application file for the backend.
* `bicing_api_service.js`: The frontend service that handles all API calls to the backend.
* `requirements.txt`: Lists all Python dependencies for the backend.
* `package.json`: Lists all Node.js dependencies for the frontend.
* `app.json`: The main configuration file for the Expo frontend app.

### ⚙️ API Endpoints

The backend provides the following endpoints:

* `GET /api/health`: A health check to ensure the API is running.
* `GET /api/stations/nearby`: Finds Bicing stations near a specified location.
    * **Parameters:** `lat` (latitude), `lng` (longitude), `radius` (optional, default: 1000m).
* `GET /api/stations`: Returns all Bicing stations.

## **Credits and Data Source**

The application obtains real-time information about Bicing stations in Barcelona through the public API provided by **Barcelona Open Data**.
