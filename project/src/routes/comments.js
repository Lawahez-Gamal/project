const express = require('express')

const Comments = require('../models/comments')

const {auth,authAdmin} = require('../middleware/author')

const router = new express.Router()

router.post('/Addcomment/:id',auth,authAdmin(1), async(req, res) => {

    const data = new Comments({
       ...req.body,
       owner : req.user._id,
       forbook : req.params.id 
    })
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

router.get('/comments', auth, async(req, res) => {

    try{
        const comment = await Comments.find({owner:req.user._id})
        if(!comment) {return res.status(200).send({
            status:2,
            data:{},
            msg:"You have no comments"
        })}
        res.status(200).send({
            status:1,
            data: comment,
            msg: 'All comments selected',
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data: e,
            msg: 'error loading data'
        })
    }
})

module.exports=router