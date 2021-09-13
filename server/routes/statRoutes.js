const express = require('express');
const router = express.Router();
const statController = require('../controllers/statController');

router.get('/:id', statController.getStats)
router.get('/', statController.getStats)

module.exports = router;