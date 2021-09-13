const express = require('express');
const router = express.Router();
const emissionController = require('../controllers/emissionController');

router.post('/', emissionController.create);

module.exports = router;