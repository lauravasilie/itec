const router = require("express").Router()

const paymentService = require("../services/PaymentService")

router.post("/pay", paymentService.pay)

module.exports = router