const mongoose = require('mongoose')

const schemaUser = new mongoose.Schema({
  username: {
    type: String,
    minLength: 1,
    required: true,
    unique: true,
  },
  name: String,
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
})
schemaUser.set('toJSON', {
  transform: (document, returned) => {
    returned.id = returned._id.toString()
    delete returned._id
    delete returned.__v
    delete returned.password
  },
})

module.exports = mongoose.model('User', schemaUser)
