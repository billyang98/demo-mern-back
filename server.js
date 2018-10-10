const express = require('express');
const bodyParser = require('body-parser');

const localPort = 9200
const port = localPort

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
  res.send('Checking test')
})

var name = 'Bill'

app.get('/name', (req, res) => {
  res.send(name)
})

app.post('/setName', (req,res) => {
  name = req.body.name
  console.log(req.body)
  res.send('name set')
})

app.listen(port, () => console.log(`Listening on port ${port}!`))
