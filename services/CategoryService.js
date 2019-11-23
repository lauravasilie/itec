const mongoose = require("mongoose")
const Category = require("../models/Category");

const CategoryService = {
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find()
            res.status(200).json(categories)
        } catch (e) {
            res.status(400).send({e})
        }
    },
    createCategory: async (req, res) => {
        try {
            const category = new Category(req.body)
            category.save()
            res.status(201).json(category)
        } catch (e) {
            res.status(400).send({e}) 
        }
    }
}

module.exports = CategoryService