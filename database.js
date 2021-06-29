const { MongoClient } = require('mongodb')

const client = new MongoClient('mongodb://localhost:27017')

const getDb = () => client.connect().then(() => {
  const db = client.db('news_aggregator_db')
  return db
})

const getUser = (username) => 
  getDb()
  .then(db => db.collection('Users'))
  .then(collection => collection.findOne(
    {username: username}
  ))
  .then(user => {return user})

const insertUser = (user) =>
  getDb()
  .then(db => db.collection('Users'))
  .then(collection => collection.insertOne(user))

module.exports = {insertUser, getUser}
