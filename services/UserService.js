const mongoose = require("mongoose")
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const User = require("../models/User")
const Session = require("../models/Session")

const UserService = {
    login: async (req, res) => {
      try {
        const user = await User.findOne({ email: req.body.email })
        if(!user)
          res.status(404).send("User not registered")
        else {
          const pass = await bcrypt.compare(req.body.password, user.password)
          if(!pass)
            res.status(401).send("Wrong password")
          else {
            const sess = await Session.findOne({ user_id: user.id })
            if(sess)
              res.status(401).send("User already logged in")
            else {
              const token = crypto.randomBytes(64).toString('hex');
              Session.create({
                token: token,
                user_id: user.id
              })
              res.status(200).json({ user, token })
            }
          }
        }
      } catch (err) {
        res.status(400).json(err)        
      }
    },
    logout: async (req, res) => {
      try {
        const token = req.headers['auth-token'];
        let session = await Session.findOne({token}).lean().exec();
        if (!session) {
          res.status(404).send("Session token not found");
        } else {
          console.log(session)
          const result = await Session.deleteOne({ token: token })
          res.status(200).json({ result })
        }
        
      } catch (err) {
        res.status(400).json(err)        
      }
    },
    getUserById: async (req, res) => {
      try {
        const token = req.headers['auth-token'];
        let session = await Session.findOne({token}).lean().exec();
        if (!session) {
          res.status(401).json("Session token is not valid");
        } 
        else {
          const user = await User.findOne( { id: req.params.id.toString }).lean().exec()
          console.log(user)
          res.status(200).json({
            id: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            address: user.address,
            company: user.company,
            isBuyer: user.isBuyer
          })
        }
      } catch (error) {
        res.status(400).send()        
      }
    },
    getUsers: async (req, res ) => {
      try {
        const token = req.headers['auth-token'];
        let session = await Session.findOne({token}).lean().exec();
        if (!session) {
          res.status(401).json("Session token is not valid");
        } 
        else {
          const page = req.query.page;
          const size = req.query.size;
          const name = req.query.name

          var users
          if(name)
            users = await User.find({ name: { $regex: name , $options: "$i"}}).skip(parseInt(size * page)).limit(parseInt(size)).lean().exec();
          else
            users = await User.find({}).skip(parseInt(size * page)).limit(parseInt(size)).lean().exec();
          res.json(users.map(function(user) { 
            return { 
              id: user.id,
              name: user.name,
              phone: user.phone,
              email: user.email,              
              address: user.address,
              company: user.company,
              isBuyer: user.isBuyer 
            }; 
          }))
        }
      } catch (err) {
        res.status(400).json({ message: 'There has been an error' })
      }
    },
    getBuyers: async (req, res) => {
      try {
        const token = req.headers['auth-token'];
        let session = await Session.findOne({token}).lean().exec();
        if (!session) {
          res.status(401).json("Session token is not valid");
        } 
        else {
          const page = req.query.page;
          const size = req.query.size;
          const users = await User.find({ isBuyer: true }).skip(parseInt(size * page)).limit(parseInt(size)).lean().exec();
          res.json(users)
        }
      } catch (err) {
        res.status(400).json({ message: 'There has been an error' })
      }
    },
    getSellers: async (req, res) => {
      try {
        const token = req.headers['auth-token'];
        let session = await Session.findOne({token}).lean().exec();
        if (!session) {
          res.status(401).json("Session token is not valid");
        } 
        else {         
          const page = req.query.page;
          const size = req.query.size;
          const users = await User.find({ isBuyer: false }).skip(parseInt(size * page)).limit(parseInt(size)).lean().exec();
          res.json(users.map(function(user) { 
            return { 
              id: user.id,
              name: user.name,
              phone: user.phone,
              email: user.email,
              address: user.address,
              company: user.company,
              isBuyer: user.isBuyer 
            }; 
          }))
        }
      } catch (err) {
        res.status(400).json({ message: 'There has been an error' })
      } 
    },
    createUser: async (req, res) => {
      const newUser = new User(req.body)
      newUser.address = "Timisoara, Romania"
      console.log(newUser.address)
      try {
        const user = await User.findOne({email: newUser.email}).lean().exec() 
        // console.log(user)
        if(user){
          res.status(403).json
          console.log("User already exists")
        }
        else {
          newUser.save()
          res.status(201).json(newUser)
        }
      } catch(e) {
        res.status(400).send(e)
      }
    },
    updateUser: async (req, res) => {
      try {
        const token = req.headers['auth-token'];
        let session = await Session.findOne({token}).lean().exec();
        if (!session) {
          res.status(401).json("Session token is not valid");
        } 
        else {  
          const user = await User.findByIdAndUpdate(req.params.id)
          res.status(200).send({user})
        }
      } catch (err) {
          console.log({ err })
          res.status(400).send({ message: 'error' })
      }
    },
    deleteUser: async (req, res) => {
      try {
        const token = req.headers['auth-token'];
        let session = await Session.findOne({token}).lean().exec();
        if (!session) {
          res.status(401).json("Session token is not valid");
        } 
        else { 
          const result = await User.findByIdAndDelete(req.params.id)
          res.status(200).send({ result })
        }
      } catch(err) {
          console.log({ err })
          res.status(400).send({ message: 'error' })
      }
    }
  }

module.exports = UserService;