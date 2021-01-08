const express= require('express')

const cors = require('cors')

require('./db/moongse')

const userRoutes = require('./routes/user')

const adminRoutes = require('./routes/admin')

const writerRoutes = require('./routes/writer')

const bookRoutes = require('./routes/book')

const commentRoutes = require('./routes/comments')

const app = express()

const port = process.env.PORT || 3000

app.use(cors())

app.use(express.json())

app.use(userRoutes)

app.use(adminRoutes)

app.use(writerRoutes)

app.use(bookRoutes)

app.use(commentRoutes)

app.listen(port,()=>{
    console.log(`server up on localhost:${port}`);
})