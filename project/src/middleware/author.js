const jwt = require('jsonwebtoken')

const User = require('../models/user')

const auth = async (req,res,next)=>{
   
    try{
        const token = req.header('Authorization').replace('Bearer ','')

        const decodedToken = jwt.verify(token, 'AaAaBbBb')

        const user = await User.findOne({_id: decodedToken._id, 'tokens.token': token})

        if(!user) throw new Error('You need log in first')

        req.token = token

        req.user = user
        next()
    }

catch(e){
    res.status(500).send({
       status:0,
       msg:"You need to login first",
       data:e
    })
}

}


function authAdmin(role){
        return(req,res,next)=>{
        
        if (role !== 1){return res.status(500).send("Not allowed")}        
        next()   
            
        } 
     
  }


module.exports ={auth,authAdmin} 
