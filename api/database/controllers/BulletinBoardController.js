const { BulletinBoardService } = require('../services')
const bulletinBoardService = new BulletinBoardService();

class BulletinBoardController {
    static async insert(req, res, next) {
        try {
            const data = req.body;

            await bulletinBoardService.insert(data);

            res.status(201).json(data);
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
    static async delete(req, res, next) {
        try {
            const { id } = req.params;

            await bulletinBoardService.delete(id);

            res.status(200).end();
            next();
        } catch (error) {
            next(error);
        }
    }
    static async findOneById(req, res, next) {
        try {
            const { id } = req.params;

            const note = await bulletinBoardService.findOneById(id);

            res.status(200).json(note);
            next();
        } catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const data = req.body;

            await bulletinBoardService.update(data, id);

            res.status(200).end();
            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = BulletinBoardController;