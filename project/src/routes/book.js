const express = require('express')
const Book  = require('../models/book')
const {authAdmin , auth} = require('../middleware/author')
const multer = require('multer')
const router  = new express.Router()

//Book Router
router.post('/Addbook',auth,authAdmin(1), async(req, res) => {
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

router.delete('/Deletebook/:id',auth,authAdmin(1), async(req,res)=>{
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


router.patch('/Editbook/:id',auth, async(req,res)=>{
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


router.get('/singleBook/:id', async(req,res)=>{
    const _id  = req.params.id
    
    try{
        const singleBook =await Book.findById(_id)
        if(!singleBook){
            res.status(500).send({
                status:2,
                data:"",
                msg:"There is no Books"
            })
        }
        res.status(200).send({
            status:1,
            data:singleBook,
            msg: 'Book retrieved succesfully',
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data:e,
            msg:'No books found',
        })
    }
})


let uniqueSuffix
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'bookimage')
    },
    filename: function (req, file, cb) {
        // console.log(Date.now() + file.originalname.match(/\.(jpg|png)$/)[0]);
        uniqueSuffix = Date.now() + file.originalname.match(/\.(jpg)$/)[0]
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  var upload = multer({ storage: storage })
//   console.log(upload);
router.post('/book/uploadImg',auth , upload.single('upload'), async(req,res)=>{
    
    console.log(uniqueSuffix);
    req.user.bookimg = `bookimage/${uniqueSuffix}`
    await req.user.save()
    res.send(req.user)
})


module.exports=router