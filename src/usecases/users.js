const Users = require('../models/users')

const bcrypt = require('../lib/bcrypt')

const jwt = require('../lib/jwt')

async function signup (email, password) {
  const user = await Users.findOne({ email })

  if (user) { throw new Error('User is already registered') }

  const hash = bcrypt.hash(password)
  return Users.create({ email, password: hash })
}

async function login (email, password) {
  const user = await Users.findOne({ email })

  if (!user) { throw new Error('Invalid data') }

  const isValidPassword = bcrypt.compare(password, user.password)
  if (!isValidPassword) throw new Error('Invalid data')

  return jwt.create({ id: user._id })
}

function getAll () {
  return Users.find()
}

module.exports = {
  signup,
  getAll,
  login
}
