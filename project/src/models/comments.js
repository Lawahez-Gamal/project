const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')


const commentSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },  
    book_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Book'
    },
    commentDate:{
        type: Date,
         default: Date.now()
    },
    content: {
        type:String,
        trim: true
    }
}, 
{timestamps: true}
)



const Comments = mongoose.model('Comments', commentSchema)

module.exports = Comments