const mongoose = require('mongoose')


const roleSchema = new mongoose.Schema({
    0:"User",
    1:"Admin",
    2:"Writer" 
    
})

const Role = mongoose.model('Role', roleSchema)

roleSchema.virtual('User',{
    ref:'Role', localField:'_id', foreignField:'role'
})

module.exports = Role