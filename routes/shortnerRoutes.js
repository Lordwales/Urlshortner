const express = require('express');
const shortnerController = require('../controllers/shortnerController');
const router = express.Router();

router.post('/api/v1/shortner', shortnerController.createUrl);
router.get('/:code', shortnerController.redirect);

module.exports = router;
