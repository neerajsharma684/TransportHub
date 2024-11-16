const express = require("express")
const fetchBranchController = require("../controller/fetchBranchController")

const router = express.Router();

router.get("/", fetchBranchController.fetchBranch)

module.exports = router