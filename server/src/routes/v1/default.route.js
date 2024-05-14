const express = require('express');
const { defaultController } = require('../../controllers');

const router = express.Router();

router.route('/map').get(defaultController.searchMap);

module.exports = router;
