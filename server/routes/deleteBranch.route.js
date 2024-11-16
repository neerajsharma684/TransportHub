const express = require('express');
const { deleteBranch } = require('../controller/deleteBranchController');

const router = express.Router();

router.delete('/:id', deleteBranch);

module.exports = router;