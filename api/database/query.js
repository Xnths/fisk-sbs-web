const connection = require('./connection');

module.exports = (query, parameters = {}) => {
    return new Promise((resolve, reject) => {
        try {
            const result = connection.query(query, parameters);

            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}