const express = require('express')

const User = require('../models/user')

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
        const user = await User.findByCredentials(req.body.email, req.body.password, req.body.role)
        const token = await user.generateToken()
        res.send({
            status: 1,
            data: {user, token, token_type:'Bearer '},
            message: " user logged in"
        })
    }
    catch(e){
        res.status(200).send({
            status: 0,
            data: e,
            message: "Error occurs while log in"
        })
    }
})

//upload Image
let uniqueSuffix
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      
        uniqueSuffix = Date.now() + file.originalname.match(/\.(jpg|png)$/)[0]
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  var upload = multer({ storage: storage })
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
    const allowed = ['name', 'password']
    const isValid = updates.every(update => allowed.includes(update))
    try{
        if(!isValid) throw new Error('invalid updates')
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


router.post('/logoutuser',auth, async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter( token =>{
            return token.token != req.token
        })
        await req.user.save()
        res.status(200).send({
            status:1,
            data:'',
            message:"logged out successfully"
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

router.post('/logOutAllusers', auth, async(req, res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.status(200).send({
            status:1,
            data:'',
            message:"logged out successfully"
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
            msg:'account removed'
        })
    }
    catch(e){
        res.send({
            status:0,
            msg:'error removing'
        })
    }
})



module.exports=router
