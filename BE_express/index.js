const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();

const {port} = require('./definitions/constants')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({type: '*/*'}));
app.use(cors())

const {getBoards, createBoard, deleteBoard} = require('./controllers/boards');
const {createTaskList, deleteTaskList, updateTaskLists} = require('./controllers/task-lists');
const {createTask, deleteTask} = require('./controllers/tasks');

// Boards handling
app.get('/boards', getBoards)
app.post('/boards', createBoard)
app.delete('/boards/:id', deleteBoard)

// Task-lists handling
app.post('/boards/:boardId/task-list', createTaskList)
app.put('/boards/:boardId/task-list', updateTaskLists)
app.delete('/boards/:boardId/task-list/:taskListId', deleteTaskList)

// Tasks handling
app.post('/boards/:boardId/task-list/:taskListId/task', createTask)
app.delete('/boards/:boardId/task-list/:taskListId/task/:taskId', deleteTask)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
