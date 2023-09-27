# Individual Project - Frontend

This repository contains the frontend portion of the project.

## Prerequisites

Ensure that you have the following installed on your local machine:

- [Node.js and npm](https://nodejs.org/)
- [MySQL](https://dev.mysql.com/downloads/)

## Setup

Clone the frontend and backend repositories to the same parent directory:

```
git clone https://github.com/akifbayram/IP_be.git IP_be
git clone https://github.com/akifbayram/IP_fe.git IP_fe
```

Navigate to the frontend folder and install the dependencies:

```
cd IP_fe
npm install
```

## Running the App

 Start the development server

```
npm start
```

The app should now be running on `http://localhost:3000`.

## Dependencies

- `react-router-dom`: For routing within the app.
- `axios`: For making API calls.
- `jspdf`: For generating PDF reports.

## Project Structure

- `App.js`: Main application file that sets up routing.
- `NavBar.js`: Navigation bar component.
- `HomePage.js`: Displays top movies and actors.
- `Movies.js`: Page for browsing and searching movies.
- `Customers.js`: Page for browsing and searching customers.
- `ActorDetailsCard.js`, `CustomerDetailsCard.js`, `MovieDetailsCard.js`: Components for displaying detailed information.
- `pdfExporter.js`: Utility for exporting customer rental data to PDF.
