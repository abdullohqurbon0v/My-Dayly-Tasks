const jwt = require('jsonwebtoken')


const isTokenValid = (req, res, next) => {
      console.log(req.headers)
      const header = req.headers['authorization']
      const token = header.split(' ')[1]
      if (!token) {
            return res.status(401).json({
                  message: "Invalid or expired token",
                  error: true
            })
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                  return res.status(400).json({
                        message: "Error verify token",
                        error: true
                  })
            }
            req.user = user
            next()
      })
}

module.exports = isTokenValid