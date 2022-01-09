const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken') ;
const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi');


// const schema = Joi.object({
//     username: Joi.string().min(5).required,
//     password: Joi.string().min(8).required
// })

const schema = Joi.object({
    username: Joi.string().min(5).required(),
    password: Joi.string().min(8).required()
});

router.post('/signup', async (req, res) => {

    //validate data entry to new user
    const { error } = schema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //validate if the user is exist or not
    const usernameExist = await User.findOne({ username: req.body.username })
    if (usernameExist) return res.status(400).send("the username is exists")

    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //create a new user
    const user = new User({
        username: req.body.username,
        password: hashedPassword
    })

    //add to user to database
    try {
        const newUser = await user.save()
        res.status(200).json({ newUser })
    }
    catch (error) {
        res.status(404).send({ message: error.message })
    }
})

router.post('/signin', async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    //validate data entry to new user
    const { error } = schema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //Check if username is exsist
    if (!user) return res.status(400).send("the username is not exsist");

    // Check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send({ message: 'the password is wrong' })

    // if all information is true
    // Create a token and assign it to the user
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
})


module.exports = router;