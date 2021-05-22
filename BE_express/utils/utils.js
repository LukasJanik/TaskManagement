const fs = require('fs');
const {dataPath} = require('../definitions/constants')

exports.getBoardsData = () => {
    return JSON.parse(fs.readFileSync('data/data.json'));
}

exports.writeBoardsData = writeBoardsData = (data) => {
    try {
        fs.writeFile(dataPath, JSON.stringify(data), (err) => {
            if (err) throw err;
        });
        return true;
    } catch (e) {
        return false;
    }
}

exports.getNumberParams = (params, keys) => {
    const paramsKeys = Object.keys(params);
    return keys.reduce((numberParams, key) => {
        numberParams[key] = paramsKeys.includes(key) ? Number(params[key]) : null;
        return numberParams;
    }, {})
}

exports.handleDelete = (res, data, toExecute) => {
    const deleted = toExecute(false);
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
