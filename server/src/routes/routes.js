const express = require('express');
const router = express.Router();
const submit = require('../controllers/submitController.js');
const listArchived = require('../controllers/listArchivedController.js');

router.post('/submit', submit);
router.get('/archived/:site', listArchived);

module.exports = router;