const express = require('express')
const app=express()
const path=require('path')

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json())

const newsRoute=require('./routes/news.js')

app.use(newsRoute)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+ "/public/index.html"))
})

app.listen(3000)