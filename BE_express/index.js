const express = require('express')
const bodyParser = require('body-parser')
const app = express();

const {port} = require('./definitions/constants')

app.use(bodyParser.json({type: '*/*'}));

const {getBoards, createBoard, deleteBoard} = require('./controllers/boards');
const {createTaskLists, deleteTaskLists, updateTaskLists} = require('./controllers/task-lists');
const {createTask, deleteTask} = require('./controllers/tasks');

// Boards handling
app.get('/boards', getBoards)
app.post('/boards', createBoard)
app.delete('/boards/:id', deleteBoard)

// Task-lists handling
app.post('/task-lists', createTaskLists)
app.put('/task-lists', updateTaskLists)
app.delete('/task-lists', deleteTaskLists)

// Tasks handling
app.post('/tasks', createTask)
app.delete('/tasks', deleteTask)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
