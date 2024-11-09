const express = require('express');
const fetchUserController = require('../controller/fetchUserController');

const router = express.Router();

router.get("/", fetchUserController.fetchUsers);

module.exports = router;