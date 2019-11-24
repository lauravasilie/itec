const mongoose = require("mongoose");
const crypto = require('crypto')
const User = require("../models/User")
const Order = require("../models/Order")

const OrderService = {
    getOrders: async (req, res) => {
        try {
            const token = req.headers['auth-token'];
            let session = await Session.findOne({token}).lean().exec();
            if (session) {
                res.status(401).json("Session token is not valid");            }
            else {
                const orders = await Order.find()
                res.status(200).json(orders.filter(order => order.buyer_id === user.id))
            } 
        } catch (err) {
            res.status(400).send(err)
        }
    },
    makeOrder: async (req, res) => {
        try {
            const token = req.headers['auth-token'];
            let session = await Session.findOne({token}).lean().exec();
            console.log(token)
            if (session) {
                res.status(401).json("Session token is not valid");            }
            else {
                const order = new Order(req.body)
                await order.save()
                res.status(201).json(order)
            }
        } catch (err) {
            res.status(400).send(err)
        }
    }
  }

module.exports = OrderService;