const router = require("express").Router()

const productService = require("../services/ProductService")

router.get("/products", productService.getProducts)
router.post("/products", productService.addProduct)
router.put("/products", productService.updateProduct)
router.delete("/products", productService.deleteProduct)

module.exports = router