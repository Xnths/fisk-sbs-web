const query = require('../query');

module.exports = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS
            Bulletin_board (
                id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                author VARCHAR(40) NOT NULL,
                title VARCHAR(40) NOT NULL,
                message VARCHAR(500) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
    `
    return query(sql);
}