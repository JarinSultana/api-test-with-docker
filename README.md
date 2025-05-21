# User API with Tests - Docker Setup

This repository contains a simple RESTful API for user management, fully dockerized with integrated tests.

## Project Structure

<pre> /project 
├── server.js # Express API server 
├── models/ # MongoDB models 
│ └── User.js 
├── apiTest.js # Integration tests 
├── Dockerfile # For API service 
├── Dockerfile.test # For test service 
├── docker-compose.yml # Orchestrates all backend services 
├── docker-compose-test.yml # Orchestrates all test services 
├── wait-for-api.sh # Ensures API is ready before tests 
├── run-tests.sh # Helper script to run tests 
├── package.json # Dependencies 
├── .gitignore 
└── .dockerignore </pre>

## API Endpoints
✅ POST /api/user - Create a new user

✅ GET /api/user/:email - Get user by email

✅ PUT /api/user/:email - Update user by email

✅ PATCH /api/user/:email - Partially update user by email

✅ DELETE /api/user/:email - Delete user by email


## Running the Application

### Start all backend services:
```bash
docker compose up --build -d
```

### Start all test services:
```bash
docker compose -f docker-compose-test.yml up --build -d
```

## Technical Details

🔹  API: Node.js/Express

🔹  Database: MongoDB

🔹  Testing: Mocha and Pactum

🔹 Container Orchestration: Docker Compose



## Docker Services (Backend)

🔹 api: The Express API

🔹 mongo: MongoDB database

All backend services are connected via the network-test.


## Docker Services (Test)

🔹 test: Test runner service

🔹 api-test: API for test environment

🔹 mongo-test: MongoDB database for test environment

All test services are connected via the network-test.