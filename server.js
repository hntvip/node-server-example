// server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').load()
const port = process.env.PORT || 3001;

console.log('RESTful API server started on:'+port);

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

let routes = require('./api/routes')
routes(app);

app.use(function(req, res){
	res.status(404).send({url: req.originalUrl + 'not found'})
})

app.listen(port);