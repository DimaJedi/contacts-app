const mongoose = require('mongoose')
mongoose.connect('mongodb://mongo:27017/contact', { useNewUrlParser: true, useUnifiedTopology: true })

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: String,
  phone: String,
  address: String
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = { Contact }
