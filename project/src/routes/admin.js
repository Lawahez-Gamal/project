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


module.exports=router