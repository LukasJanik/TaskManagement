const {getBoardsData, writeBoardsData, getNumberParams, handleDelete} = require('../utils/utils')

module.exports = {
    createTaskList: (req, res) => {
        const data = getBoardsData();
        const {name} = req.body;
        const {boardId} = getNumberParams(req.params, ['boardId'])
        const targetBoard = data['boards'].find(board => board.id === boardId);
        const newTaskList = {id: Date.now(), name, items: []}
        if (!targetBoard.lists) {
            targetBoard.lists = [];
        }
        targetBoard.lists.push(newTaskList);

        if (writeBoardsData(data)) {
            res.send(newTaskList);
        } else {
            res.sendStatus(500);
        }
    },
    updateTaskLists: (req, res) => {
        const data = getBoardsData();
        const {lists} = req.body;
        const {boardId} = getNumberParams(req.params, ['boardId']);
        const targetBoard = data['boards'].find(board => board.id === boardId);

        lists.forEach(list => {
            const index = targetBoard.lists.findIndex(locList => locList.id === list.id);
            targetBoard.lists[index] = list;
        })

        if (writeBoardsData(data)) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    },
    deleteTaskList: (req, res) => {
        const data = getBoardsData();
        const {boardId, taskListId} = getNumberParams(req.params, ['boardId', 'taskListId']);

        if (!boardId || !taskListId) {
            res.sendStatus(405);
            return;
        }

        const targetBoard = data['boards'].find(board => board.id === boardId);

        handleDelete(res, data, (deleted) => {
            targetBoard.lists = targetBoard.lists.filter((list) => {
                if (list.id === taskListId) {
                    deleted = true;
                    return false;
                }
                return true;
            });
            return deleted;
        });
    },
}
