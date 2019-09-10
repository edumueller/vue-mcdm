import express from 'express';
import db from './db/db';
// Set up the express app
const app = express();
// get all todos
// for postman test :
/*
* localhost:5000/api/v1/todos
* setting up server: node_modules/.bin/babel-node app.js
* */
app.get('/api/v1/todos', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos: db
    })
});
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
