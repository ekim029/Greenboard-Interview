const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js');

router.post('/submit', controller.submit);
router.get('/archived/:site', controller.listArchived);
router.get('/archived/:site/:timestamp', controller.listArchivedByTimestamp);

module.exports = router;