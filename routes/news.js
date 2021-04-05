const route = require('express').Router()
const fetch = require("node-fetch");

const key =""
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(key);

route.get('/get_news', (req,res)=>{
    // fetch("https://newsapi.org/v2/everything&apiKey="+key)
    // .then(response => response.json())
    // .then(data => console.log(data))
    newsapi.v2.topHeadlines({
        //q: 'trump',
        //category: 'politics',
        language: 'en',
        //country: 'india'
      }).then(response => {
        //console.log(response['articles'][0]);
        //res.send(response['articles'])
        //html = response['articles'].map(obj=>{
            obj = response['articles'][0]
            source_name = obj.source.name
            author = obj.author
            title = obj.title
            desc = obj.description
            url = obj.url
            img_url = obj.urlToImage
            timestamp = obj.publishedAt
            content = obj.content
            html_obj = `<h2>${title}</h2>
                        <h3>${desc}</h3>
                        <p>${content}</p>
                        <br>
                        ${author}, ${source_name}
                        <br>
                        <a href =${url}> Click here to view full article</a>
                        `
            res.send(html_obj)
        //})
      });
})

route.post('/get_news', (req,res)=>{
    console.log(req.body.params.length())
})

module.exports = route