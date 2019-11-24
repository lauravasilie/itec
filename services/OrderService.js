const mongoose = require("mongoose");
const crypto = require('crypto')
const User = require("../models/User")
const Order = require("../models/Order")

const OrderService = {
    getOrders: async (req, res) => {
        const token = req.headers['auth-token'];
        let session = await Session.findOne({token}).lean().exec();
        console.log(userToken)
        if (session) {
            res.status(404).json();
        }
        else
            try {
                const token = req.headers["auth-token"]
                const user = await User.findOne({ token })
                console.log(user)
                const orders = await Order.find()
                res.status(200).json(orders.filter(order => order.buyer_id === user.id))
            } catch (err) {
                res.status(400).send(err)
            }
    },
    makeOrder: async (req, res) => {
        const token = req.headers['auth-token'];
        let session = await Session.findOne({token}).lean().exec();
        console.log(userToken)
        if (session) {
            res.status(404).json();
        }
        else 
            try {
                const token = req.headers["auth-token"]
                const user = await User.findOne({ token })
            } catch (err) {
                res.status(400).send(err)
            }
    }
  }

module.exports = OrderService;