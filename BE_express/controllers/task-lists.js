const {getBoardsData, writeBoardsData} = require('../utils/utils')

module.exports = {
    createTaskLists: (req, res) => {
        const data = getBoardsData();
        const {boardId, name} = req.body;
        const targetBoard = data['boards'].find(board => board.id === boardId);
        const newTaskList = {id: Date.now(), name, list: []}
        targetBoard.push(newTaskList);

        if (writeBoardsData(data)) {
            res.send(newTaskList);
        } else {
            res.sendStatus(500);
        }
    },
    updateTaskLists: (req, res) => {
        const data = getBoardsData();
        const {boardId, lists} = req.body;
        const targetBoard = data['boards'].find(board => board.id === boardId);

        lists.forEach(list => {
            const index = targetBoard.list.find(locList => locList.id === list.id);
            targetBoard.list[index] = list;
        })

        if (writeBoardsData(data)) {
            res.send(newTaskList);
        } else {
            res.sendStatus(500);
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
