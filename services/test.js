var mongo = require("mongoose");

var Schema = mongo.Schema;
var lecturedb = new Schema({
    lect_id: { type: String },
    lect_name: { type: String },
    lect_address: { type: String },
    lect_department: { type: String }
  }, { versionKey: false });


  var studentdb = new Schema({
    stud_id: { type: String },
    stud_name: { type: String },
    stud_address: { type: String },
    stud_department: { type: String },
    stud_coursefees: { type: String },
    date: { type: Date }
  }, { versionKey: false });

  var orders = new Schema({
    _id: { type: Number },
    item: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    }, { versionKey: false });

    var inventory = new Schema({
      _id: { type: Schema.Types.Decimal128 },
      sku: { type: String },
      description: { type: String },
      instock: { type: Number },
      }, { versionKey: false });


      var members = new Schema({
        _id: { type: Schema.Types.Decimal128 },
        name: { type: String },
        joined: { type: Date, default: Date.now },
        status: { type: String },
        }, { versionKey: false });

      
        var classes = new Schema({
          _id: { type: Number },
          title: { type: String },
          enrollmentlist: [String],
          days: { type: [String] },
          }, { versionKey: false });


    
var lecturemodel = mongo.model('lecturedb', lecturedb, 'lecturedb');
var studentmodel = mongo.model('studentdb', studentdb, 'studentdb');
var ordersmodel = mongo.model('orders', orders, 'orders');
var inventorymodel = mongo.model('inventory', inventory, 'inventory');


var membersmodel = mongo.model('members', members, 'members');
var classesmodel = mongo.model('classes', classes, 'classes');


module.exports = function (app, express) {
  console.log("welcome to empService");
  var api = express.Router();



  api.post("/SaveUser", function (req, res) {
    var mod = new lecturemodel(req.body);
    console.log('We are in server');
   

    mod.save(function (err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.send(JSON.stringify(req.body));
      }
    });
    })

api.get("/demo",function(req,res){
res.send("hello you tested good");
})



api.get("/aggreate1",function(req,res){
  
    lecturemodel.aggregate([
      {
      $lookup:
      {
         from: "studentdb",
         let: {lect_department : "$lect_department" },
         pipeline: [ { $match: { $expr: {$and: { $eq:["$stud_department","$$lect_department"] }}}},
         {
         $project: {
           _id:0
        }}
      ],        
      as: "Those_having_same_department"
      },
    
      },
  ]).exec(
    function(err,data){
      if (err)
      res.send(err);
      else
      res.send(data);
    }
  ) 
  
})


api.get("/aggreate2",function(req,res){
  
  lecturemodel.aggregate([
    {
    $lookup:
    {
       from: "studentdb",
       localField:"lect_department",
       foreignField:"stud_department",
       as: "Those_having_same_department"
    },
  },
    { $match: { lect_department: "IT" } },
   
]).exec(
  function(err,data){
    if (err)
    res.send(err);
    else
    res.send(data);
  }
) 

})


api.get("/aggreate3",function(req,res){
  
  ordersmodel.aggregate([
    {
    $lookup:
    {
         from: "inventory",
         localField: "item",
         foreignField: "sku",
         as: "inventory_docs"
    },
  },
   ]).exec(
  function(err,data){
    if (err)
    res.send(err);
    else
    res.send(data);
  }
) 

})



api.get("/aggreate4",function(req,res){
  
  classesmodel.aggregate([
    {
    $lookup:
    {
      from: "members",
      localField: "enrollmentlist",
      foreignField: "name",
      as: "enrollee_info"
    },
  },
   ]).exec(
  function(err,data){
    if (err)
    res.send(err);
    else
    res.send(data);
  }
) 

})








  api.post("/getUserById", function (req, res) {
    console.log(req.body);
    model.findOne({ _id: mongo.Types.ObjectId(req.body.id) },
        function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(data);
            }
        });
})


api.post("/editUserById",function(req,res){
  debugger;
 console.log('In server editUserById');
 console.log(req.body); 
 console.log(req.body.id);     
  model.update({ _id:req.body.id},
       {$set: 
          {
               "name" :req.body.name,
          }},  
 function(err,data) {  
 if (err) {  
 res.send(err);         
 }  
 else{     
        
        res.send(data);  
   }  
});   
})


  return api;
}

