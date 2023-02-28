var fs = require('fs');

var fetchData = function(id,callbackFunc){
  if(!id)id = "The-Birth";
  fs.readFile("data.json", function(err,data){
    //readind data is successful, then parse. If not, error
    var objectList = JSON.parse(data);
    console.log(objectList[id]);
    callbackFunc(objectList[id]);//call back
  })
}

exports.api = function(req,res){
  //parameter is the id
  fetchData(req.query.parameter, function(objectMatchedID){// receive: objectList[id]
    res.render('home',objectMatchedID);
  })
}