const express = require('express')
const User  = require('../models/user')
const Book  = require('../models/book')
const {authAdmin , auth} = require('../middleware/author')
const router  = new express.Router()

router.post('/Register', async(req, res) => {
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


router.post('/login', async(req,res)=>{
    try{
        const writer = await User.findByCredentials(req.body.email, req.body.pass)

        const token = await writer.generateToken()
        res.send({
            status:1,
            data:writer,
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


router.get('/allWriters',async (req,res)=>{
    try{
        const writers = await User.find({})
        res.status(200).send({
            status:1,
            data: writers,
            msg: 'All writers selected',
            me : req.data
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data: e,
            msg: 'error loading doctors data'
        })
    }
})

router.get('/profile',async(req,res)=>{
    try{
        res.send({
            data : req.data,
            status:1
        })
    }
    catch(e){
        res.send({
            status:0,
            data: e,
            msg: 'error loading data'
    })
}
})

router.get('/writer/:id', async(req,res)=>{
    const _id = req.params.id
    try{
        const writer = await User.findById(_id)
        if(!writer){
            res.status(200).send({
                status:2,
                data:"",
                msg:"writer not found"
            })
        }
        res.status(200).send({
            status:1,
            data: doc, 
            msg:"writer data retreived successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data: e,
            msg:'error loading writer data'
        })
    }
})

router.patch('/writer/:id', async(req,res)=>{
    const _id= req.params.id
    const updates = req.body
    const updatesKeys = Object.keys(req.body)
    const allowedUpdates = ["username","email"]
    const validUpdates = updatesKeys.every((u)=>allowedUpdates.includes(u))
    if(!validUpdates)
        res.status(400).send({
            status:4,
            data:'',
            msg:'invalid updates'
        })
    try{
        const writer = await User.findByIdAndUpdate(_id, updates,{
            new:true,
            runValidators:true
        })
        if(!writer){
            res.status(200).send({
                status:2,
                data:"",
                msg:"writer not found"
            })
        }
        res.status(200).send({
            status:1,
            data: doc, 
            msg:"writer data retreived successfuly"
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

router.delete('/writer/:id', async(req,res)=>{
    const _id= req.params.id
    try{
        const writer = await User.findByIdAndDelete(_id)
        if(!writer){
            res.status(200).send({
                status:2,
                data:"",
                msg:"writer not found"
            })
        }
        res.status(200).send({
            status:1,
            data: doc, 
            msg:"you're unsuscribe successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            statue: 0,
            data:'',
            msg:"error delete data"
        })
    }
})


router.delete('/logoutwriter/:id', async(req,res)=>{
    const _id= req.params.id
    try{
        const writer = await User.findByIdAndDelete(_id)
        if(!writer){
            res.status(200).send({
                status:2,
                data:"",
                msg:"writer not found"
            })
        }
        res.status(200).send({
            status:1,
            data: doc, 
            msg:"you're unsuscribe successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            statue: 0,
            data:'',
            msg:"error delete data"
        })
    }
})



//Book Router
router.post('/Addbook',authAdmin('Admin'),auth, async(req, res) => {
    try{
    const book = new Book(req.body)

        await book.save()
      
            res.status(200).send({
            status:1,
            data: book,
            msg: 'Book uploaded succesfully',
        })
    }
    catch(e){
       res.status(500).send({
            status:0,
            data:e,
            msg:'error inserting data',
        })
    }
})

router.delete('/Deletebook/:id', async(req,res)=>{
    const _id= req.params.id
    try{
        const book = await Book.findByIdAndDelete(_id)
        if(!book){
            res.status(200).send({
                status:2,
                data:"",
                msg:"book not found"
            })
        }
        res.status(200).send({
            status:1,
            data: book, 
            msg:"your book has been deleted successfuly"
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


router.patch('/Editbook/:id', async(req,res)=>{
    const _id            = req.params.id
    const updates        = req.body

    try{
        const book = await Book.findByIdAndUpdate(_id, updates,{
            new:true,
            runValidators:true
        })
        if(!book){
            res.status(200).send({
                status:2,
                data:"",
                msg:"book not found"
            })
        }
        res.status(200).send({
            status:1,
            data: book, 
            msg:"book data retreived successfuly"
        })
    }
    catch(e){
        res.status(500).send({
            statue: 0,
            data:'',
            msg:"Error occurs while editing book"
        })
    }
})

router.get('/allBooks',async (req,res)=>{
    try{
        const books = await Book.find({})
        res.status(200).send({
            status:1,
            data: books,
            msg: 'All Books selected',
            me : req.data
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data: e,
            msg: 'error loading Books data'
        })
    }
})



module.exports=router
