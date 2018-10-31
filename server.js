const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const localPort = 9200
const port = localPort

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
  res.send('Checking test')
})

var name = 'Bill'

app.get('/name', (req, res) => {
  res.send({"name": name})
})

app.post('/setName', (req,res) => {
  name = req.body.name
  console.log(req.body)
  res.send('name set')
})

app.listen(port, () => console.log(`Listening on port ${port}!`))


// ***************** MongoDB stuff ***************** //
const MongoClient = require('mongodb').MongoClient
const mongoUrl = 'mongodb://mern-demo:mern-demo1@ds127843.mlab.com:27843/msm-general'

app.get('/dbGetNames', (req, res) => {
    MongoClient.connect(mongoUrl, function(err, client) { 
        var db = client.db('msm-general')
        var collection = db.collection("demo");
        // Insert a single document
        collection.find().toArray((err, result) => {
          if(err) throw err;
          res.send(result);
        });
    });  
})

app.post('/dbInsertName', (req, res) => {
    MongoClient.connect(mongoUrl, function(err, client) { 
        var db = client.db('msm-general')
        var collection = db.collection("demo");
        // Insert a single document
        collection.insertOne(req.body);
        res.send('done writing');
    });  
})
