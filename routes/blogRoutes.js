const express = require('express')
const { createBlogController, getAllBlogsController, updateBlogController, getBlogByIdController, deleteBlogController, userBlogController } = require('../controllers/blogControllers')

//router object
const router = express.Router()

//routes

//Post || create blog
router.post('/create-blog', createBlogController)

//Get || all blogs
router.get('/all-blogs', getAllBlogsController)

//Put || update blog
router.put('/update-blog/:id', updateBlogController)

//Get || get blog by id
router.get('/get-blog/:id', getBlogByIdController)

//Delete || delete blog by id
router.delete('/delete-blog/:id', deleteBlogController)

module.exports = router;