const router = require("express").Router()

const categoryService = require("../services/CategoryService")

router.get("/category", categoryService.getCategories)
router.post("/category", categoryService.createCategory)

module.exports = router