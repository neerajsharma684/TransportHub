const express = require('express');
const { deleteUser } = require('../controller/deleteUserController');

const router = express.Router();

router.delete('/:email', deleteUser);

module.exports = router;