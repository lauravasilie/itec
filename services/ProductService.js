const Product = require("../models/Product")
const Session = require("../models/Session")

const ProductService = {
    getProducts: async (req, res ) => {
        const token = req.headers['auth-token'];
        let session = await Session.findOne({token}).lean().exec();
        console.log(token)
        if (!session) {
            res.status(404).json();
        } 
        else
        try {
            const page = req.query.page
            const size = req.query.size
            const category = req.query.category
            const subcategory = req.query.subcategory
            // const min = req.query.min
            // const max = req.query.max

            var products
            if(category && subcategory)
                products = await Product.find({category: category, subcategory: subcategory}).skip(parseInt(size * page)).limit(parseInt(size)).lean().exec()
            else if(category)
                products = await Product.find({category: category}).skip(parseInt(size * page)).limit(parseInt(size)).lean().exec()
            else
                products = await Product.find({}).skip(parseInt(size * page)).limit(parseInt(size)).lean().exec()
            res.status(200).json(products)
        } catch (err) {
            res.status(400).json({ message: 'There has been an error' })
        }
    },
    addProduct: async (req, res) => {
        const token = req.headers['auth-token'];
        let session = await Session.findOne({token}).lean().exec();
        console.log(token)
        if (!session) {
            res.status(404).json();
        } 
        else
            try {
                const product = new Product(req.body)
                await product.save()
                res.status(201).json(product)
            } catch(e) {
                res.status(400).send(e)
            }
    },
    updateProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(req.body.id)
            res.status(200).json(product)
        } catch (err) {
            console.log({ err })
            res.status(400).send({ message: 'error' })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const result = await Product.findByIdAndDelete(req.body.id)
            res.status(200).send({ result })
        } catch(err) {
            console.log({ err })
            res.status(400).send({ message: 'error' })
        }
    }
  }

module.exports = ProductService;