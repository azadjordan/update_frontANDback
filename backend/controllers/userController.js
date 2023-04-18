const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
   return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: '3d'}) // since they're named the same we can use {_id} instead
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})  // now we're passing the token back to the browser
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)

        // create a token (after saving to the db)
        const token = createToken(user._id)

        // res.status(200).json({email, user})  this was before jwt
        res.status(200).json({email, token})  // now we're passing the token back to the browser
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

module.exports = {signupUser, loginUser}