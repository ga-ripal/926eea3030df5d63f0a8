const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require('./926eea3030df5d63f0a8/models/user.model')
const {PORT,DB_URI} = require('./926eea3030df5d63f0a8/configs/env.config')
mongoose.connect(DB_URI,()=>{
    console.log('Connected to database')
})
app.use(require('./926eea3030df5d63f0a8/routes/index.route'))

app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}  http://localhost:${PORT}/api/v1`)
})