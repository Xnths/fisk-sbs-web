const { BulletinBoardController } = require('../database/controllers');

const router = require('express').Router({ mergeParams: true });

router
    .route('/bulletinboard')
    .get(BulletinBoardController.findAll)
    .post(BulletinBoardController.insert);
router
    .route('/bulletinboard/:id')
    .get(BulletinBoardController.findOneById)
    .put(BulletinBoardController.update)
    .delete(BulletinBoardController.delete);

module.exports = router;