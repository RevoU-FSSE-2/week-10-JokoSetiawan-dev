const { userLogin, userRegister} = require('../service/auth')

const register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body
    const { db } = req
    await userRegister({ db, username, password, role })
    res.status(201).json({ message: "User registered" })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const { db } = req
    const token = await userLogin({ db, username, password })
    res.json({ message: "User logged in", token })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  register,
  login
}