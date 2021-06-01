var mongo = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
var express = require('express'); 
var bodyParser = require('body-parser'); 



var db = mongo.connect("mongodb://localhost:27017/udayademoDB", function(err, response){  
   if(err){
     console.log( 'Hi This is Udaya bhanu....');
    console.log( err); }  
   else{ console.log('Connected to ' + db, ' + ', response); }  
}); 
  






// var mongo = require("mongoose");  
// var db = mongo.connect("mongodb://localhost:27017/MyDemoPro", function(err, response){  
//    if(err){
//      console.log( 'Hi This is Udaya How are you bro....');
//     console.log(err); }  
//    else{

//   }  localhost:27017/MyDemoPro/api/take
// });

// var mongo = require("mongoose");  
// var db = mongo.connect("mongodb://localhost/MyDemoPro", function(err, response){  
//    if(err){
//      console.log( 'Hi This is Udaya How are you bro....');
//     console.log( err); }  
//    else{

//   }  
// });