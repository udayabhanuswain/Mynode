var mongo = require("mongoose");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'demo@gmail.com',
    pass: 'demopassword'
  }
});

var mailOptions = {
  from: 'demo@gmail.com',
  to: 'udayswain296@gmail.com',
  subject: 'You are success fully login',
  text: 'Test Mail form node with angular!'
};
var Schema = mongo.Schema;
var UsersSchema = new Schema({
  enrollno: { type: String },
  name: { type: String },
  address: { type: String },
}, { versionKey: false });

var user = {
  name: "John",
  age: 30
};

var model = mongo.model('operate', UsersSchema, 'operate');

module.exports = function (app, express) {
  console.log("welcome to empService");
  var api = express.Router();



  api.post("/SaveUser", function (req, res) {
    // console.log('reqBody:::' + JSON.stringify(req.body));
    // res.send(JSON.stringify(req.body));
    var mod = new model(req.body);
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


    api.post("/SaveUser1", function (req, res) {
      // console.log('reqBody:::' + JSON.stringify(req.body));
      // res.send(JSON.stringify(req.body));
      var mod = new model(req.body);
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



api.get("/take", function (req, res) {
// console.log("Yes Udaya its works now");
res.send(user);
})
  // api.post("/chklogin", function (req, res) {
  //   console.log(':::Login service:::');
  //   console.log(req.body.take);
  //   model.findOne({ Email: req.body.take }, function (err, data) {
  //     if (err) {
  //       res.send({"ok":"okk"});
  //     }
  //     if (!err && data.Email === req.body.take) {
  //       console.log("You have done Kalu");
  //       transporter.sendMail(mailOptions, function (error, info) {
  //         if (error) {
  //           console.log(error);
  //         } else {
  //           console.log('Email sent: ' + info.response);
  //         }
  //       });
  //       res.send({ data, status: 'success' });
  //     }
  //     else {

  //       res.send({ status: 'failed' });
  //     }

  //   });
  // })

  // api.post("/chklogin", function (req, res) {
  //   console.log(':::Login service:::');
  //   console.log(req.body.take);
  //   var query = model.findOne({ Email: req.body.take })
  //   query.exec(function (err, data) {
  //     if (err) {
  //       // handle error
  //       return false;
  //     }
  //     if (!err && data.Email === req.body.take) {
  //       console.log("You have done Kalu");
  //       transporter.sendMail(mailOptions, function (error, info) {
  //         if (error) {
  //           console.log(error);
  //         } else {
  //           console.log('Email sent: ' + info.response);
  //         }
  //       });
  //       res.send({ data, status: 'success' });
  //     }
  //     else {

  //       res.send({ status: 'failed' });
  //     }
  //   });


  // })




  api.post("/chklogin", function (req, res) {
    console.log(':::Login service:::');
    console.log(req.body.take);

    var query = model.findOne({ Email: req.body.take })
    query.exec().then(function (data) {
      if (data) {
        console.log(JSON.stringify(data));
        res.send({ "User": "Right User Udaya" });
      }
      else {
        console.log("Wrong User");
        res.send({ "User": "WrongUser Udaya" });
      }
    }).catch(function (err) {
      console.log("Catch Error");
    });
  })

  // api.post("/getuser", function (req, res) {
  //   model.find({}, function (err, data) {
  //     if (err) {
  //       res.send(err);
  //     }
  //     else {
  //       console.log('Here is ' + data);
  //       res.send(data);
  //     }
  //   });
  // });


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

