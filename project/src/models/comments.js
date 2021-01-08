const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },  
    forbook:{
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