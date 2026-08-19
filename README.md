# StackOverflow Questions API

Simple Node.js API using the built-in `http` module — no frameworks or external libraries.

## Features

* Get all questions
* Filter by title, tags, answered status, and votes
* Get a question by ID
* Clean utility-based structure

## Run

```bash
npm start
```

Server runs at `http://localhost:8000`.

## Endpoints

| Method | Endpoint                          | Description          |
| ------ | --------------------------------- | -------------------- |
| GET    | `/api/questions`                  | Get all questions    |
| GET    | `/api/questions?tags=nodejs`      | Filter by tag        |
| GET    | `/api/questions?isAnswered=false` | Unanswered questions |
| GET    | `/api/questions?minVotes=20`      | 20+ votes            |
| GET    | `/api/questions?title=jwt`        | Search by title      |
| GET    | `/api/questions/3`                | Get question by ID   |

## Structure

```text
stackoverflow-api/
├── package.json
├── db.js
├── server.js
└── utils/
    ├── sendResponse.js
    └── filterQuestions.js
```

## Tech

* Node.js
* Built-in `http` module
* ES Modules
* `async/await`
* No external packages
