const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
     
    title: {
        type: String,
        required: [ true, "title is required" ],
    },
    description: {
        type: String,
        required: [ true, "description is required" ],
    },
    image: {
        type: String,
        required: [ true, "image is required" ],
    },
    //user and blog relation
    user: {
        type: mongoose.Types.ObjectId, //only relation establish when we write objectId
        ref: "blog_Users",
        require:[true,"user id is required"]
    }
},
    { timestamps: true }
);
const blogModel = mongoose.model('Blog', blogSchema)
 
module.exports = blogModel;