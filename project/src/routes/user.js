const express = require('express')

const User = require('../models/user')

const Comments = require('../models/comments')

const jwt       = require('jsonwebtoken')

const {auth} = require('../middleware/author')

const multer = require('multer')

const router = new express.Router()

router.post('/Registeruser', async(req, res) => {
    const user = new User(req.body)
    try{
       
        await user.save()
        const token = await user.generateToken()
        res.status(200).send({
            status:1,
            data: user,
            msg: 'Thanks for signing in',
            token : token
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data:e,
            msg:'error inserting data',
            token:""
        })
    }
})

router.post('/loginuser', async(req,res)=>{
    try{
        
        const role = req.body.role
        if(!role) {throw new Error('add user role')}
        const user = await User.findByCredentials(req.body.email, req.body.password,req.body.role)

        const token = await user.generateToken()
        res.send({
            status:1,
            data:user,
            msg:"logged in",
            token :{token,token_type:'Bearer '}
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data:e,
            msg:"err in data",
            token:""
        })
    }
})

let uniqueSuffix
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
        console.log(Date.now() + file.originalname.match(/\.(jpg|png)$/)[0]);
        uniqueSuffix = Date.now() + file.originalname.match(/\.(jpg|png)$/)[0]
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  var upload = multer({ storage: storage })
  console.log(upload);
router.post('/me/uploadImg',auth , upload.single('upload'), async(req,res)=>{
    
    console.log(uniqueSuffix);
    req.user.pimg = `images/${uniqueSuffix}`
    await req.user.save()
    res.send(req.user)
})

router.get('/profile',auth, async(req,res)=>{
   
       
        res.status(200).send({
            status:1,
            data: req.user, 
            msg:"User data retreived successfuly"
        })

})

router.patch('/users/me', auth, async(req, res)=>{
    const updates = Objects.keys(req.body)
    const allowed = ['name', 'password','gender']
    const isValid = updates.every(update => allowed.includes(update))
    try{
        if(!isValid) throw new Error('')
        updates.forEach( update => req.user[update] = req.body[update] )
        await req.user.save()
        res.send({
            status:1,
            data: req.user,
            message:"user updated"
        })
    }
    catch(e){
        res.send({
            status:0,
            data: e,
            message:"error update user data"
        })
    }
})

router.patch('/user/:id',auth, async(req,res)=>{
    const _id            = req.params.id
    const updates        = req.body
    const updatesKeys    = Object.keys(req.body)
    const allowedUpdates = ["userName","pass"]
    const validUpdates   = updatesKeys.every((u)=>allowedUpdates.includes(u))
    if(!validUpdates)
        res.status(400).send({
            status:4,
            data:'',
            msg:'invalid updates'
        })
    try{
        const user = await User.findByIdAndUpdate(_id, updates,{
            new:true,
            runValidators:true
        })
        if(!user){
            res.status(200).send({
                status:2,
                data:"",
                msg:"User not found"
            })
        }
        res.status(200).send({
            status:1,
            data: user, 
            msg:"user data retreived successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            statue: 0,
            data:'',
            msg:"error edit data"
        })
    }
})

router.post('/logout', async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter( token =>{
            return token.token != req.token
        })
        await req.user.save()
        res.status(200).send({
            status:1,
            data:'',
            message:"logged out"
        })
    }
    catch(e){
        res.status(500).send({
            statue: 0,
            data:e,
            msg:"error in data"
        })
    }
})

router.post('/users/logOutAll', auth, async(req, res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.status(200).send({
            status:1,
            data:'',
            message:"logged out"
        })
    }
    catch(e){
        res.status(200).send({
            status: 0,
            data: e,
            message: "Unauthorized user"
        })
    }
})

router.delete('/users/me', auth, async(req,res)=>{
    try{
        await req.user.remove()
        res.status(200).send({
            status:1,
            message:'account removed'
        })
    }
    catch(e){
        res.send({
            status:0,
            message:'error removing'
        })
    }
})

router.delete('/user/:id',auth, async(req,res)=>{
    const _id= req.params.id
    try{
        const user = await User.findByIdAndDelete(_id)
        if(!user){
            res.status(200).send({
                status:2,
                data:"",
                msg:"User not found"
            })
        }
        res.status(200).send({
            status:1,
            data: user, 
            msg:"you're unsuscribe successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            statue: 0,
            data:'',
            msg:"Error deleting data"
        })
    }
})


//Comments Routes
router.post('/Addcomment',auth, async(req, res) => {

    const data = new Comments(req.body)
    try{
        await data.save()
        res.status(200).send({
            status:1,
            data: data,
            msg: "You've just commented on this",
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data:e,
            msg:'Error inserting data',
        })
    }
})


router.delete('/comment/:id',auth, async(req,res)=>{
    const _id= req.params.id
    try{
        const comment = await Comments.findByIdAndDelete(_id)
        if(!comment){
            res.status(200).send({
                status:2,
                data:"",
                msg:"comment not found"
            })
        }
        res.status(200).send({
            status:1,
            data: comment, 
            msg:"your comment has been deleted successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            statue: 0,
            data:'',
            msg:"Error deleting data"
        })
    }
})


router.patch('/comment/:id',auth, async(req,res)=>{
    const _id            = req.params.id
    const updates        = req.body

    try{
        const comment = await Comments.findByIdAndUpdate(_id, updates,{
            new:true,
            runValidators:true
        })
        if(!comment){
            res.status(200).send({
                status:2,
                data:"",
                msg:"comment not found"
            })
        }
        res.status(200).send({
            status:1,
            data: comment, 
            msg:"comment data retreived successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            statue: 0,
            data:'',
            msg:"Error occurs while editing comment"
        })
    }
})


router.get('/Searchbook/:id', async(req,res)=>{
    const _id  = req.params.id
    console.log(_id);
    let result =[]
   
    // const result = await Book.find({title})
    // if (!title) {
    //     throw new Error('Book not found');
    //    }
    try{
        if(req.query.title){
       result = await Book.find({title: req.query.title})
        res.status(200).send({
            status:1,
            data: result,
            msg: 'Book retrieved succesfully',
        })
    }
    }
    catch(e){
        res.status(500).send({
            status:0,
            data:e,
            msg:'No books found',
        })
    }
})

module.exports=router
