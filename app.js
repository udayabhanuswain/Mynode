var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var db = require('./models/db');
var app = express();
var http = require('http').Server(app);
var nodemailer = require('nodemailer');
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
require('./controller/route')(app,express);



http.listen(8080,function(){
  console.log("server listing on 8080 port");
});




  
 