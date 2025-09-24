const express = require('express');
const router = express.Router();
const submit = require('../controllers/submitController.js');
const listArchived = require('../controllers/listArchivedController.js');
const listArchivedByTimestamp = require('../controllers/listArchivedByTimestampController.js');

router.post('/submit', submit);
router.get('/archived/:site', listArchived);
router.get('/archived/:site/:timestamp', listArchivedByTimestamp);

module.exports = router;