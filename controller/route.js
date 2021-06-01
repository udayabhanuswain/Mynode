module.exports = function(app,express){
    console.log('welcome to route');
    
    var empService = require('../services/empService')(app,express);
    var testService = require('../services/test')(app,express);
    app.use('/emp_api',[empService,testService]);
}