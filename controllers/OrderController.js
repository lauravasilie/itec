const router = require("express").Router()

const orderService = require("../services/OrderService")

router.get("/orders", orderService.getOrders)
router.post("/orders", orderService.makeOrder)

module.exports = router