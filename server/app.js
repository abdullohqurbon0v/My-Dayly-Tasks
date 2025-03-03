require('dotenv').config()
const express = require('express')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const isTokenValid = require('./middlewares/token')
const Task = require('./models/Task')
const app = express()
const PORT = process.env.PORT

app.use(cors({
      origin: "*"
}))
app.use(express.json())

app.post('/api/user/create', async (req, res) => {
      try {
            const { email, password } = req.body
            if (!email || !password) {
                  return res.status(400).json({
                        error: true,
                        message: "All field is required"
                  })
            }

            const existing = await User.findOne({ email })
            if (existing) {
                  return res.status(400).json({
                        error: true,
                        message: "User with this email already exist"
                  })
            }
            const createduser = await User.create({ email, password })
            return res.status(201).json({
                  message: "User created",
                  user: createduser,
                  error: false
            })
      } catch (error) {
            console.log(error)
            return res.status(500).json({
                  error: true,
                  message: "Error during create user. Pleace try again latter"
            })
      }
})

app.post('/api/user/login', async (req, res) => {
      try {
            const { email, password } = req.body
            if (!email || !password) {
                  return res.status(400).json({
                        error: false,
                        message: "All field is required"
                  })
            }
            const existuser = await User.findOne({ email })
            if (!existuser) {
                  return res.status(400).json({
                        error: false,
                        message: "user not found"
                  })
            }
            const token = jwt.sign({ existuser }, process.env.JWT_SECRET, {
                  expiresIn: "1y"
            })
            return res.status(200).json({
                  message: "Login successfuly",
                  token,
                  user: existuser
            })
      } catch (error) {
            console.log(error)
            return res.status(500).json({
                  error: true,
                  message: "Error during login user. Pleace try again latter"
            })
      }
})

app.post('/api/task/create', isTokenValid, async (req, res) => {
      try {
            const { existuser } = req.user
            const { date, description } = req.body
            if (!date || !description) {
                  return res.status(400).json({
                        message: "All field is required",
                        error: true
                  })
            }
            const createdTask = await Task.create({ date, description, user: existuser._id })

            return res.status(201).json({
                  message: "Task created",
                  task: createdTask
            })
      } catch (error) {
            console.log(error)
            return res.status(500).json({
                  error: true,
                  message: "Error during create task. Pleace try again latter"
            })
      }
})

app.get('/api/task/get', isTokenValid, async (req, res) => {
      try {
            const { existuser } = req.user
            const tasks = await Task.find({ user: existuser._id })

            return res.status(200).json({
                  mesasge: "Data get successfuly",
                  error: false,
                  tasks
            })
      } catch (error) {
            console.log(error)
            return res.status(500).json({
                  error: true,
                  message: "Error during get tasks. Pleace try again latter"
            })
      }
})

app.listen(PORT, () => {
      mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log("MONGO CONNECT")
      }).catch(err => {
            console.log("MONGO DB ERROR", err)
      })
      console.log(`API server started on PORT: http://localhost:${PORT}`)
})