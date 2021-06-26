const express=require('express')
const app=express()
const hbs=require('hbs')
const path=require('path')

app.set('view engine','hbs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

hbs.registerPartials(path.join(__dirname,'/partials'))

app.use(express.static(__dirname+'/public'))

const newsRoute=require('./routes/news.js')

app.use(newsRoute)

app.get('/',(req,res)=>{
    // res.sendFile(path.join(__dirname+ "/public/index.html"))
    res.render('index')
})

app.listen(2000)