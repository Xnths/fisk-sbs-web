const { BulletinBoardController } = require('../database/controllers');

const router = require('express').Router({ mergeParams: true });

router
    .route('/bulletinboard')
    .post(BulletinBoardController.insert);

module.exports = router;