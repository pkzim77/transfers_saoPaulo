const express = require("express")
const router = express.Router()

const transfersController = require("../controllers/outsideController")

router.get("/transfers", transfersController.getTransfers)

module.exports = router