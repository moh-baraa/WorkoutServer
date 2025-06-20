const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

//login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            throw Error('all field must be filled')
        }
        const user = await User.findOne({ email })
        if (!user) {
            throw Error('Incorrect email')
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            throw Error('Incorrect Password')
        }

        // create a token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// signup a user
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        // validator
        if (!email || !password) {
            throw Error('all field must be filled')
        }
        if (!validator.isEmail(email)) {
            throw Error('email is unvalid')
        }
        if (!validator.isStrongPassword(password)) {
            throw Error('password not strong enough')
        }
        const exists = await User.findOne({ email })
        if (exists) {
            throw Error('Email already in use')
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await User.create({ email, password: hash })
        //create a token
        const token = createToken(user._id)

        res.status(200).json({ email, token })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
module.exports = { signupUser, loginUser }