const mongoose = require("mongoose")
const Category = require("../models/Category");
const Session = require("../models/Session")

const CategoryService = {
    getCategories: async (req, res) => {
        try {
            const token = req.headers['auth-token'];
            let session = await Session.findOne({token}).lean().exec();
            if (!session) {
                res.status(401).json("Session token is not valid");            }
            else {
                const categories = await Category.find()
                res.status(200).json(categories)
            }
        } catch (err) {
            res.status(400).send(err)
        }
    },
    getSubcategories: async (req, res) => {
        try {
            const token = req.headers['auth-token'];
            let session = await Session.findOne({token}).lean().exec();
            if (!session) {
                res.status(401).json("Session token is not valid");            }
            else {
                const id = req.params.id
                const categories = await Category.findById(id)
                res.status(200).json(categories.subcategories)
            }
        } catch (err) {
            res.status(400).send(err)
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