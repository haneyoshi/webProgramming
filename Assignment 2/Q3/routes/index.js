var colourList=['gray','AntiqueWhite','DarkGoldenRod','DarkSalmon','LightGoldenRodYellow','PaleTurquoise'];

exports.api = function(req,res){
  var requestColour = req.query.colour;
  if(requestColour ==''){
    requestColour = 'white';
    console.log("defult colour: "+requestColour);
    res.render('home',{colour: requestColour});
  }
  else if(requestColour=='random'){
    requestColour = colourList[Math.floor(Math.random() * colourList.length)];
    console.log("random colour: "+requestColour);
    res.render('home',{colour: requestColour});
  }
  else{
    console.log("specify a colour: "+requestColour);
    res.render('home',{colour: requestColour});
  }
}
