const {getBoardsData, writeBoardsData} = require('../utils/utils')

module.exports = {
    getBoards: (req, res) => {
        const data = getBoardsData();
        res.send(data);
    },
    createBoard: (req, res) => {
        const data = getBoardsData();
        if (req.body) {
            const {name} = req.body
            const newBoard = {id: Date.now(), name, lists: []}
            data['boards'].push(newBoard);
            res.send(newBoard);
        } else {
            res.sendStatus(405);
            return;
        }

        if (writeBoardsData(data)) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    },
    deleteBoard: (req, res) => {
        const data = getBoardsData();
        const id = Number(req.params.id);
        let deleted = false;

        data['boards'] = data['boards'].filter((board) => {
            if (board.id === id) {
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
