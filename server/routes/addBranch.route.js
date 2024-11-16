const express = require("express")
const addBranchController = require("../controller/addBranchController")

const router = express.Router();

router.post("/", addBranchController.createBranch);

module.exports = router;