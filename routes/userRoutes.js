const express = require('express')
const { getAllUsers, registerController, loginController } = require('../controllers/userController')
const { userBlogController } = require('../controllers/blogControllers')

//router object
const router = express.Router()

//create/register user || POST
router.post('/register', registerController)

//login || POST
router.post('/login', loginController)

//get all users || GET
router.get('/all-users', getAllUsers)
//GET || user single blog
router.get('/user-blog/:id', userBlogController)

module.exports = router;