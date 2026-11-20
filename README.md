# Intern Task Manager (Meissasoft)

A day-by-day internship exercise that builds a task manager: an Express health check, a MongoDB REST API, and a React UI.

## Plan

| Folder | What it does |
|---|---|
| `Day1-plan/health-check.js` | Express server with `GET /health` on port 3000 |
| `Day2-plan/Rest-Api.js` | Task CRUD API with MongoDB (Mongoose) on port 3000 |
| `Day3-plan/adding_UI-task-manager.js` | The same API, used by the React UI |
| `Day3-plan/task-manager-ui/` | React (Create React App) frontend calling `http://localhost:3000/tasks` |

### API (Day 2 / Day 3)

| Method | Path | Description |
|---|---|---|
| `POST` | `/tasks` | Create a task |
| `GET` | `/tasks` | List tasks |
| `GET` | `/tasks/:id` | Get a task |
| `PUT` | `/tasks/:id` | Update a task |
| `DELETE` | `/tasks/:id` | Delete a task |

## Tech Stack

Node.js · Express · Mongoose / MongoDB · cors · React (Create React App) · Axios

## Prerequisites

- Node.js and npm
- MongoDB running locally on `mongodb://localhost:27017` (database `taskdb`)

## Usage

```bash
git clone https://github.com/KahafSameer/intern-task-manager-Meissasoft.git
cd intern-task-manager-Meissasoft
npm install

node Day1-plan/health-check.js          # http://localhost:3000/health
node Day2-plan/Rest-Api.js              # task API
node Day3-plan/adding_UI-task-manager.js
```

Run the UI in a second terminal:

```bash
cd Day3-plan/task-manager-ui
npm install
npm start
```

> The API and the CRA dev server both default to port 3000. When CRA asks to use another port, answer **yes**; the UI still calls the API on port 3000.
