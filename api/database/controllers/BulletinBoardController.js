const { BulletinBoardService } = require('../services')
const bulletinBoardService = new BulletinBoardService();

class BulletinBoardController {
    static async insert(req, res, next) {
        try {
            const body = req.body;
            const data = JSON.parse(body);

            await bulletinBoardService.insert(data);

            res.status(201).json(body);
            next();
        } catch (error) {
            next(error);
        }
    }
    static async findAll(req, res, next) {
        try {
            const notes = await bulletinBoardService.findAll();

            res.status(200).json(notes);
            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = BulletinBoardController;