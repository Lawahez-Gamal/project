const express = require('express')

const User = require('../models/user')

const {auth} = require('../middleware/author')

const router = new express.Router()

router.post('/Admin', async(req, res) => {
    const data = new User(req.body)
    try{
        await data.save()
        const token = await data.generateToken()
        res.status(200).send({
            status:1,
            data: data,
            msg: 'data inserted',
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

router.post('/loginAdmin', async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.pass)

        const token = await user.generateToken()
        res.send({
            status:1,
            data:user,
            msg:"logged in",
            token :token
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


module.exports=router