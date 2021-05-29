const { BulletinBoardService } = require('../services')
const bulletinBoardService = new BulletinBoardService();

class BulletinBoardController {
    static async insert(req, res, next) {
        try {
            const body = req.body;

            await bulletinBoardService.insert(body);

            res.status(201).json(body);
            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = BulletinBoardController;