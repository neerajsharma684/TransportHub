const express = require('express');
const fetchAdminController = require('../controller/fetchAdminController');

const router = express.Router();

router.get("/", fetchAdminController.fetchAdmins);

module.exports = router;