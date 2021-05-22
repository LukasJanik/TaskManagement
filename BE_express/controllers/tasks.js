const {getBoardsData, writeBoardsData} = require('../utils/utils')

module.exports = {
    createTask: (req, res) => {
        const data = getBoardsData();
        const {boardId, listId, name} = req.body;

        if (!boardId || !listId || !name) {
            req.sendStatus(405);
        }

        const targetBoard = data['boards'].find(board => board.id === boardId);
        const targetList = targetBoard.list.find((list) => list.id === listId);

        const newTask = {id: Date.now(), name}

        targetList.push(newTask)

        if (writeBoardsData(data)) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    },
    deleteTask: (req, res) => {
        const data = getBoardsData();
        const {boardId, listId, taskId} = req.body;

        if (!boardId || !listId || taskId) {
            req.sendStatus(405);
        }

        const targetBoard = data['boards'].find(board => board.id === boardId);
        const targetList = targetBoard.list.find((list) => list.id === listId);

        let deleted = false;

        targetList.list = targetList.list.filter((task) => {
            if (task.id === taskId) {
                deleted = true;
                return false;
            }
            return true;
        });

        if (deleted) {
            if (writeBoardsData(data)) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(404);
        }
    },
    deleteTaskLists: (req, res) => {
        const data = getBoardsData();
        const {boardId, listId} = req.body;

        if (!boardId || !listId) {
            req.sendStatus(405);
        }

        const targetBoard = data['boards'].find(board => board.id === boardId);

        let deleted = false;

        targetBoard.list = targetBoard.list.filter((list) => {
            if (list.id === listId) {
                deleted = true;
                return false;
            }
            return true;
        });

        if (deleted) {
            if (writeBoardsData(data)) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(404);
        }
    },
}
