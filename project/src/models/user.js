const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        minLength:5,
        maxLength:50
    },
    userName:{
        type:String,
        required: true,
        trim: true,
        unique: true,
        minLength:5,
        maxLength:50
    },
    email:{
        type:String,
        required: true,
        unique: true,
        trim:true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error ('invalid email')
        }
    },
    password:{
        type:String,
        minLength:6,
        maxLength:100,
        trim:true ,
        validate(value){
            if(value.toLowerCase().includes('pass')) throw new Error('invalid password')
        }
    },
    status:{
        type: Boolean, default: true
    },
   
    tokens:[{
       token:{
        type:String,
        required:true
        }
     }
    ],
    role : {
        type: Number,
        default: 1,
        required: true
    
    },
    pimg:{
        type:String
    },
    gender:{
        type:Boolean,
        required:true
    }
  
}, 
{timestamps: true}
)

userSchema.virtual('Comments',{
    ref:'Comments', localField:'_id', foreignField:'user_id'
})

userSchema.virtual('Book',{
    ref:'Book', localField:'_id', foreignField:'userId'
})

userSchema.methods.toJSON = function(){
    const user = this.toObject()
    delete user.password
    delete user.tokens
    return user
}

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password'))
    user.password = await bcrypt.hash(user.password , 10)
    next()
})

// userSchema.pre('remove',async function(next){
//     const user = this
//     if(user.role == role)
//    await Comments.deleteMany({user_id:user.id})
//     next()
// })

userSchema.statics.findByCredentials = async (email, password, role)=>{
    
    const user= await User.findOne({ email })

    if(!user) throw new Error('unauthorized')
    if(user.role != role) throw new Error("Unable to login")
    
    const matched = await bcrypt.compare(password, user.password)
    if(!matched) throw new Error('unauthorized')
    return user    
}

userSchema.methods.generateToken = async function (){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'AaAaBbBb')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}


const User = mongoose.model('User', userSchema)

module.exports = User