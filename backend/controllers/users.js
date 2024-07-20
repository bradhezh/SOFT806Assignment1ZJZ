const routerUsers = require('express').Router()
const bcrypt = require('bcrypt')

const config = require('../config')
const auth = require('../utils/auth')
const User = require('../models/user')

routerUsers.post('/', async (req, res) => {
  const userinfo = req.body

  userinfo.password = await bcrypt.hash(userinfo.password, config.SALT)
  const created = await (new User(userinfo)).save()

  res.status(201).json(created)

})

routerUsers.put('/', auth(), async (req, res) => {
  const user = req.user
  const userinfo = req.body

  userinfo.password = await bcrypt.hash(userinfo.password, config.SALT)
  Object.assign(user, userinfo)
  await user.save()

  res.status(204).end()
})

module.exports = routerUsers
