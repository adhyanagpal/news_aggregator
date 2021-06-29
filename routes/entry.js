const route = require('express').Router()
const getUser = require('../database').getUser
const insertUser = require('../database').insertUser

route.post('/signup', (req,res)=>{
    insertUser({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    })
    .then(() =>{
        res.redirect('/login')
    })
})

route.post('/login', (req,res)=>{
    getUser(req.body.username)
    .then(user => {
        //console.log(user)
        if(user['password']===req.body.password) {
            res.redirect('/get_news')
        }
        else {
            res.redirect('/signup')
        }
    })
})

module.exports = route