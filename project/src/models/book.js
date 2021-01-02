const validator = require('validator')
const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        trim: true,
        minLength:5,
        maxLength:50
    },
    authorName:{
        type:String,
        required: true,
        trim: true,
        minLength:5,
        maxLength:50
    },
   description:{
    type:String,
    trim: true,
    minLength:10,
    maxLength:500
   },
   publishAt:{
    type:Date
   },
   rate: { type: Number, default: 5 },
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'
}
}, 
{timestamps: true}
)

// bookSchema.virtual('Comments',{
//     ref:'Comments', localField:'_id', foreignField:'bookId'
// })


const Book = mongoose.model('Book', bookSchema)

module.exports = Book