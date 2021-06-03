const query = require("../query");

class Service {
    constructor(modelName) {
        this._modelName = modelName;
    }
    async insert(params) {
        const sql = `
            INSERT INTO ${this._modelName} SET ?
        `
        return query(sql, params);
    }
    async findAll() {
        const sql = `SELECT * FROM ${this._modelName}`
        return query(sql);
    }
    async delete(id) {
        const sql = `DELETE FROM ${this._modelName} WHERE id=?`
        return query(sql, id);
    }
}

module.exports = Service;