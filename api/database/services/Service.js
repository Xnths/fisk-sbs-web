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
}

module.exports = Service;