const express= require('express')

const cors = require('cors')

require('./db/moongse')

const userRoutes = require('./routes/user')

const adminRoutes = require('./routes/admin')

const writerRoutes = require('./routes/writer')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.use(userRoutes)

app.use(adminRoutes)

app.use(writerRoutes)

app.listen(port,()=>{
    console.log(`server up on localhost:${port}`);
})