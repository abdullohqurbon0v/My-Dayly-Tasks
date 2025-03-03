require('dotenv').config()
const express = require('express')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const app = express()
const PORT = process.env.PORT


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
      } catch (error) {
            return res.status(500).json({
                  error: true,
                  message: "Error during login user. Pleace try again latter"
            })
      }
})

app.listen(PORT, () => {
      console.log(`API server started on PORT: http://localhost:${PORT}`)
})