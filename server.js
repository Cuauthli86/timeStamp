var express = require('express');
var strftime = require('strftime');
var app = express();

app.use(express.static(__dirname + '/public'));
app.get('/', function(req,res){
res.sendFile(__dirname + '/views/index.html');
});

app.get('/:timestring', function(req, res){
//:Time is the variable to accces the string
var timestring=req.params.timestring;
res.json(timeStamp(timestring));
});

function timeStamp(timestring){
var timeObject={
    unix:null,
    natural:null
}

var date;

if(!isNaN (parseInt(timestring))){
date=new Date(parseInt(timestring));

}else {
date= new Date(timestring);
}

if (!isNaN(date.getTime())){
    timeObject.unix=date.getTime();
    timeObject.natural=naturalDateConverter(date);
}

return timeObject;
}

function naturalDateConverter(date){

var natural= strftime('%B %d, %Y', date);
return natural;


}
app.listen(process.env.PORT || 5000, function (){
    console.log('Node is on');
});
