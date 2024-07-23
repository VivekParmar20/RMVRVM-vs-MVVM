const express = require("express");
const { listApps, flterApps } = require("../controlleres/apps");
const router = express.Router();

router.get("/allapp", listApps);

router.get("/filteredapp", flterApps);

module.exports = router;