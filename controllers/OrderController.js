const router = require("express").Router()

const orderService = require("../services/OrderService")

router.get("/order", orderService.getOrders)
router.post("/order", orderService.makeOrder)

module.exports = router