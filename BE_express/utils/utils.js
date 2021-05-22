const fs = require('fs');
const {dataPath} = require('../definitions/constants')

exports.getBoardsData = () => {
    return JSON.parse(fs.readFileSync('data/data.json'));
}

exports.writeBoardsData = (data) => {
    try {
        fs.writeFile(dataPath, JSON.stringify(data), (err) => {
            if (err) throw err;
        });
        return true;
    } catch (e) {
        return false;
    }
}
