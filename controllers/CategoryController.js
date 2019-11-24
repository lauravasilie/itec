const router = require("express").Router()

const categoryService = require("../services/CategoryService")

router.get("/categories", categoryService.getCategories)
router.get("/subcategories/:id", categoryService.getSubcategories)
router.post("/category", categoryService.createCategory)

module.exports = router