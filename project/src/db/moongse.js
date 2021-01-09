const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Books',{

    useCreateIndex: true,

    useUnifiedTopology: true,
    
    useNewUrlParser: true,
    
})
