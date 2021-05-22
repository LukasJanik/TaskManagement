const {getBoardsData, writeBoardsData, getNumberParams} = require('../utils/utils')

module.exports = {
    createTask: (req, res) => {
        const data = getBoardsData();
        const {name} = req.body;
        const {boardId, taskListId} = getNumberParams(req.params, ['boardId', 'taskListId']);
        if (!boardId || !taskListId || !name) {
            res.sendStatus(405);
            return;
        }

        const targetBoard = data['boards'].find(board => board.id === boardId);
        const targetList = targetBoard.lists.find((list) => list.id === taskListId);
        console.log(targetList);
        const newTask = {id: Date.now(), name}
        targetList.items.push(newTask)

        if (writeBoardsData(data)) {
            res.send(newTask);
        } else {
            res.sendStatus(500);
        }
    },
    deleteTask: (req, res) => {
        const data = getBoardsData();
        const {boardId, taskListId, taskId} = getNumberParams(req.params, ['boardId', 'taskListId', 'taskId']);
        if (!boardId || !taskListId || !taskId) {
            res.sendStatus(405);
            return;
        }

        const targetBoard = data['boards'].find(board => board.id === boardId);
        const targetList = targetBoard.lists.find((list) => list.id === taskListId);

        let deleted = false;
        targetList.items = targetList.items.filter((task) => {
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
    }
}
