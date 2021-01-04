const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')

const roleSchema = new mongoose.Schema({
    0:"User",
    1:"Admin",
    2:"Writer"
    
    
})

const Role = mongoose.model('Role', roleSchema)

module.exports = Role