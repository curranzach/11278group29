THE RENEWABLE ENERGY DASHBOARD 
=================================================
 
GROUP MEMBERS
-------------------------------------------------
Group #11278group29

Brant Norris
  + Product Manager
  
Zach Curran
  + Scrum Master

Dylan VanStaden
  + Developer

Aaron Upchurch
  + Developer

ABOUT RENEWABLE ENERGY DASHBOARD
-------------------------------------------------
**Overview**

Our project is an online dashboard that collects and analyzes information from multiple geographical and climatic datasets to determine the optimal locations for the construction of new renewable energy plants.

**Vision Statement**

We want our product to leverage historical geographic and weather data to determine suitable locations for new sources of renewable energy, optimize power generation, and reduce areas of inefficient energy usage.

FEATURES
-------------------------------------------------
Google Maps API Interface

Color based information overlay

Real time user data controls

CONFIGURATION
-------------------------------------------------
This project was bootstrapped with Create React App

**Non Local Build**

Go to https://renewable-energy-dash.web.app/

**Local Bulid**

Available Scripts
In the red-client directory, you can run:

**npm start**
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

**npm test**
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

**npm run build**
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

ARCHITECTURAL MODEL - LAYERED
-------------------------------------------------
  + Web Browser
  + User Interface Management (UI Layer)
  + Information Retrieval
  + Basic Serviced (Services Layer)
  + Database (Data Layer)

SYSTEM CONTEXT MODEL
-------------------------------------------------
This application uses Google Firebase to perform cloud functions with data from Firestore to fulfill requests from a React UI which utilizes Google Maps API, as described below:

Database (Cloud Firestore) <--> Cloud Functions <--> Google Firebase <--> UI (React) <-- Google Maps API


APIs USED
-------------------------------------------------
Google Maps		https://developers.google.com/maps  
Wind Toolkit Data API		https://developer.nrel.gov/docs/wind/wind-toolkit/wtk-download/  
Historical Weather API		https://openweathermap.org/history  
Credit to Nicolas Mollet’s “Map Icons Collection” for map icons

HISTORY
-------------------------------------------------
Proposed on September 8th, 2021
Completed on November 14th, 2021


