## triViaXZ | Trivia Game Web App

A trivia game web app with MERN Stack that allows a user to answer true or false and multiple-choice questions and login as guest or create an account to save scores.

- Utilized Open Trivia Database API to retrieve trivia questions
- Built a CRUD RESTful API with Node.js, Express, and MongoDB.
- Implemented authentication and authorization using JSON Web Tokens and Bcrypt.
- Applied React Hooks and Context API for frontend’s state management technique.

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm i`

To start client and server:

`npm start`

Adding Environment Variables:

Create `.env.development.local` file in /client directory:

Key  | Example Value
------------- | -------------
REACT_APP_BACKEND_URL | http://localhost:5000/api
REACT_APP_ASSET_URL | http://localhost:5000
REACT_APP_JWT_SECRET_KEY | yoursecretkey

Also on /server/config, create `config.env`:

Key  | Example Value
------------- | -------------
MONGODB_URI_LOCAL  | mongodb://127.0.0.1:27017/trivia-quiz
JWT_SECRET_KEY | yoursecretkey
