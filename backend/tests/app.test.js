const {
  describe,
  test,
  before,
  after,
} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const config = require('../config')
const User = require('../models/user')
const app = require('../app')

const userinfo = {
  username: 'bradhezh',
  name: 'Brad Zhang',
  password: '123456',
}

const api = supertest(app)

describe('register', () => {
  before(async () => {
    await User.deleteMany({})
  })

  test('succeeds with valid user info',
  async () => {
    const res = await api
      .post(config.USERS_ROUTE)
      .send(userinfo)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const user = await User.findById(res.body.id)
    assert.strictEqual(userinfo.username, user.username)
    assert.strictEqual(userinfo.name, user.name)
    const verified = await bcrypt.compare(userinfo.password, user.password)
    assert(verified)
  })
})

describe('login', () => {
  before(async () => {
    await User.deleteMany({})
    const password = await bcrypt.hash(userinfo.password, config.SALT)
    await (new User({
      ...userinfo,
      password,
    })).save()
  })

  test('succeeds with valid user info',
  async () => {
    await api
      .post(config.LOGIN_ROUTE)
      .send(userinfo)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => {
  await mongoose.connection.close()
})
