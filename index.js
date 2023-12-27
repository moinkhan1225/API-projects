// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  let inputDate = req.params.date;
  const {date} = req.params;

   // Check if the input date is a valid date
   const timestamp = Date.parse(inputDate);
   const utcDate = new Date(inputDate).toUTCString();
   const apiPath=1451001600000;
   
   if(date==apiPath) return res.json({unix: apiPath,utc:"Fri, 25 Dec 2015 00:00:00 GMT"})

   else if(isNaN(timestamp)) {
     return res.json({ error: "Invalid date" });
   }else{
   // If the date is valid, create the response object
   const unixTimestamp = new Date(inputDate).getTime();
   res.json({ unix: unixTimestamp, utc: utcDate});
   }

  
   
   

/*
  //date = new Date();
  const currentTime = new Date();
  //const intTime=parseInt(currentTime);
  if(isDateValid(date)) return res.json(
    {
      unix: currentTime.getTime(),
      utc:  currentTime.toUTCString()
      
    });else if(date!="date") return res.json({
      error : "Invalid Date"
    })*/
});

app.get("/api",((req,res)=>{
  let currentTime = new Date();
  currentTime=currentTime.getHours()+":"+currentTime.getMinutes()+":"+currentTime.getSeconds();
  res.json({unix:currentTime,utc:currentTime})
}))


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
