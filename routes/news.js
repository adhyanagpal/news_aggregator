const route = require('express').Router()
const fetch = require("node-fetch");

const key =""
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(key);

route.get('/get_news', (req,res)=>{
  newsapi.v2.topHeadlines({
    language: 'en',
    country: 'in'
  }).then(response => {
    let arr = response['articles']
    res.render('general',{arr})
    //console.log(response['articles']);
  });
})

route.post('/get_news', (req,res)=>{
  newsapi.v2.topHeadlines({
    language: 'en',
    country: 'in',
    q: req.body.query
  }).then(response => {
    let arr = response['articles']
    res.render('general',{arr})
    //console.log(response['articles']);
  });
  //console.log(req.body.query)
})

module.exports = route