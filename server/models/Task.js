const { Schema, model } = require('mongoose')

const taskSchema = new Schema({
      date: {
            type: String,
            required: true
      },
      description: {
            type: String,
            required: true
      },
      user: {
            type: Schema.Types.ObjectId,
            ref: "User"
      }
})

module.exports = model("Task", taskSchema)