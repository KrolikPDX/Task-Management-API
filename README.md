# Task Management App (NestJS & React)

This project is a full-stack web application built using NestJS for the backend API and React for the frontend user interface.  The project is structured with separate directories for the backend (`/api`) and frontend (`/ui`) components.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Backend (API) Setup](#backend-api-setup)
  - [Frontend (UI) Setup](#frontend-ui-setup)
- [Running the Application](#running-the-application)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Features](#features)
- [API Endpoints](#api-endpoints) 


## Introduction

* Purpose of this project was to introduce myself to TypeScript, NestJS, and React. 
* This application provides a simple and efficient way for users to manage their tasks.  
* Users can create new tasks, mark them as complete, edit existing task titles/descriptions, and delete tasks they no longer need.  
* At the moment no authentication is added 

## Technologies Used

*   **Backend:** NestJS, Node.js, TypeScript, PostgreSQL.
*   **Frontend:** React, Vive, TypeScript
*   **Other:** Currently hosted in a EC2 Ubuntu Server

## Installation

### Backend (API) Setup

1.  Navigate to the backend directory: `cd api`
2.  Install dependencies: `npm install` or `yarn install`
3.  Setup a PostgreSql database (https://www.postgresql.org/docs/current/tutorial-install.html)
4.  Create a `.env` file in the root /api directory. Add the following entries and fill in the [] with your own database configurations. 
    ```
    POSTGRES_HOST=localhost
    POSTGRES_PORT=5432
    POSTGRES_USER=[postgres]
    POSTGRES_PASSWORD=[password]
    POSTGRES_DATABASE=tma
    ```

### Frontend (UI) Setup

1.  Navigate to the frontend directory: `cd ui`
2.  Install dependencies: `npm install` or `yarn install`
3.  Create a `.env` file in the root /ui directory.
    * Add the following entry, this is the API url React will reference
    ```
    VITE_APP_API_URL="http://localhost:3000"
    ```
Project structure should look like this, where .env is outside source and inside /api or /ui
```
task-management-app/
├── api/          # Backend (NestJS)
│   ├── src/
│   │   ├── tasks/
│   │   ├── users/
│   │   ├── ...
│   ├── .env
│   ├── ...
├── ui/           # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   ├── interfaces/
│   │   ├── App.tsx
│   │   ├── ...
│   ├── package.json
│   ├── ...
|   ├── .env
├── .gitignore
├── package-lock.json
├── README.md
```

## Running the Application

### Backend

1.  Navigate to the backend directory: `cd api`
2.  Start the development server: `npm run start:dev` or `yarn dev`

### Frontend

1.  Navigate to the frontend directory: `cd ui`
2.  Start the development server: `npm run start` or `yarn start`

## Features

*   **User Login:**
    *   Users can log in using their username.  No email or password required for simplicity but will be added in a future update.
    *   Will add JWT (JSON Web Tokens) for user authentication in the future
*   **Task Management:**
    *   **Create Tasks:** Users can create new tasks, specifying a title, and description.
    *   **View Tasks:** Users can view a list of their tasks, displayed with relevant information (e.g., title, description, completion status).
    *   **Edit Tasks:** Users can edit existing tasks, modifying the title, description, and completion status.
    *   **Delete Tasks:** Users can delete tasks they no longer need.
    *   **Task Status:** Tasks can have a completion status which can be edited. 
*   **User Interface:**
    *   Responsive Design: The UI adapts to different screen sizes (desktop, tablet, mobile).
    *   Intuitive and User-Friendly:  Easy-to-use interface for managing tasks.
*   **Data Persistence:** Tasks are stored in a database (PostgreSQL) so they are not lost when the user closes the browser.
*   **Backend API:**  A well-documented RESTful API provides the backend functionality for the frontend. *See documentation below*

## API Endpoints

API documentation: https://documenter.getpostman.com/view/40377241/2sAYXCmKU1 
