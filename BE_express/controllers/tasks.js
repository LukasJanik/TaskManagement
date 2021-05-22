const {getBoardsData, writeBoardsData, getNumberParams, handleDelete} = require('../utils/utils')

const findTargetList = (data, boardId, taskListId) => {
    const targetBoard = data['boards'].find(board => board.id === boardId);
    return targetBoard.lists.find((list) => list.id === taskListId);
}

module.exports = {
    createTask: (req, res) => {
        const data = getBoardsData();
        const {name} = req.body;
        const {boardId, taskListId} = getNumberParams(req.params, ['boardId', 'taskListId']);
        if (!boardId || !taskListId || !name) {
            res.sendStatus(405);
            return;
        }

        const targetList = findTargetList(data, boardId, taskListId);
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

        const targetList = findTargetList(data, boardId, taskListId);

        handleDelete(res, data, (deleted) => {
            targetList.items = targetList.items.filter((task) => {
                if (task.id === taskId) {
                    deleted = true;
                    return false;
                }
                return true;
            });
            return deleted;
        });
    }
}
