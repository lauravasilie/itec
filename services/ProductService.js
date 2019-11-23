// const Product = require("../models/User")

// const ProductService = {
//     getProducts: async (req, res ) => {
//       try {
//         const products = await Product.find()
//         res.status(200).json(products)
//       } catch (err) {
//         res.status(400).json({ message: 'There has been an error' })
//       }
//     },
//     createProduct: async (req, res) => { 
//       const product = new Product(req.body)
//       try {
//         await product.save()
//         res.status(201).json(product)
//       } catch(e) {
//         res.status(400).send(e)
//       }
//     },
//     updateProduct: async (req, res) => {
//         try {
//             const product = await Product.findByIdAndUpdate(req.body.id)
//             res.status(200).json(product)
//         } catch (err) {
//             console.log({ err })
//             res.status(400).send({ message: 'error' })
//         }
//     },
//     deleteProduct: async (req, res) => {
//         try {
//             const result = await Product.findByIdAndDelete(req.body.id)
//             res.status(200).send({ result })
//         } catch(err) {
//             console.log({ err })
//             res.status(400).send({ message: 'error' })
//         }
//     }
//   }

// module.exports = ProductService;