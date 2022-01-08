const router = require('express').Router();
const User = require('../model/User');

router.post('/signup', async (req, res) => {
    // const user = new User({
    //     username : req.body.user,
    //     password : req.body.password
    // })
    res.send(req.body.username, req.body.password)
    try {
        //const newUser = await user.save()
        // res.status(200).send({
        //     id: newUser._id,
        //     username: newUser.username
        //   })
      } 
      catch (error) {
        res.status(404).send({message: error.message})
      }
})

router.post('/signin', (req, res) => {
    res.send("signin")
})


module.exports = router;