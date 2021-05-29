const { BulletinBoardController } = require('../database/controllers');

const router = require('express').Router({ mergeParams: true });

router
    .route('/bulletinboard')
    .get(BulletinBoardController.findAll)
    .post(BulletinBoardController.insert);

module.exports = router;