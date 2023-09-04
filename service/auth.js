const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const StandardError = require("../constant/standard.error")
const tokenGenerator = require("../utils/jwt.token")

const userRegister = async ({ db, username, password, role }) => {
  const user = await db.collection("users").findOne({ username })
  
  if (user) {
    throw new StandardError({ message: "Username already exists"})
  }
  
  const hashedPassword = await bcrypt.hash(password, 10)
  
  const newUser = {
    username,
    password: hashedPassword,
    role,
  }
  
  const result = await db.collection("users").insertOne(newUser)
}

const userLogin = async ({ db, username, password }) => {
   const user = await db.collection("users").findOne({ username })
   
   if (!user) {
     throw new StandardError({ message: "User not found"})
   }
   
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new StandardError({ message: "Password incorrect"})
  }
  const token = jwt.sign({ id: user._id, role: user.role, username: user.username }, process.env.SECRET_KEY)
  
  return token
}

module.exports = {
  userRegister,
  userLogin
}