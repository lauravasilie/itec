const mongoose = require("mongoose");
const uuidv4 = require('uuidv4')
const User = require("../models/User");

const UserService = {
    loginUser: async (req, res) => {
      try {
        console.log(req.body.email)
        const user  = await User.checkValidCredentials(req.body.email, req.body.password)
        const token = await user.newAuthToken()
        res.send({ user, token})
      } catch (error) {
        res.status(400).send()        
      }
    },
    getUsers: async (req, res ) => {
      try {
        const users = await User.find()
        res.json(users)
      } catch (err) {
        res.status(400).json({ message: 'There has been an error' })
      }
    },
    createUser: async (req, res) => {
      const user = new User(req.body)
      try {
        const token = await user.newAuthToken()
        await user.save()
        res.status(201).send({user, token})
      } catch(e) {
        res.status(400).send(e)
      }
    },
    updateUser: async (req, res) => {
      try {
          const user = await User.findByIdAndUpdate(req.body.id)
          res.send({ user })
      } catch (err) {
          console.log({ err })
          res.status(400).send({ message: 'error' })
      }
    },
    deleteUser: async (req, res) => {
      try {
          const result = await User.findByIdAndDelete(req.body.id)
          res.send({ result })
      } catch(err) {
          console.log({ err })
          res.status(400).send({ message: 'error' })
      }
    }
  }

module.exports = UserService;