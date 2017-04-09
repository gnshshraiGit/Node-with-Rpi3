var ledOnOff = require('./blinker').ledOnOff;
var http = require('http');
var url = require('url');
var fs = require('fs');

var ledColors = {
red : new ledOnOff(2,'RED'),
blue : new ledOnOff(3,'BLUE'),
green : new ledOnOff(4, 'GREEN'),
yellow : new ledOnOff(14,'YELLOW'),
white : new ledOnOff(15,'WHITE'),
reset: function(){
    this.red.off();
    this.blue.off();
    this.green.off();
    this.yellow.off();
    this.white.off();
},
allOn: function(){
    this.red.on();
    this.blue.on();
    this.green.on();
    this.yellow.on();
    this.white.on();
}
};

var currentColour = 0;
var currentVariation;
var colorArray = ['red','blue','green','yellow','white'];

// variations
var variations = [
//1 - one by one
function(){
    ledColors.reset();
    return setInterval(function(){
    ledColors.reset();
    ledColors[colorArray[currentColour]].on();
    currentColour = currentColour === 4 ? 0 : ++currentColour;
},100);
},

//2 - round robin
function()
{
    ledColors.reset();
    return  setInterval(function(){
    currentColour === 0 ? ledColors.reset():null;
    ledColors[colorArray[currentColour]].on();
    currentColour = currentColour === 4 ? 0 : ++currentColour;
},500);
},

//3 - glow one, glow all
function(){
    ledColors.reset();
    return setInterval(function(){
    ledColors[colorArray[currentColour]].state ? ledColors[colorArray[currentColour]].off():ledColors[colorArray[currentColour]].on();
    currentColour = currentColour === 4 ? 0 : ++currentColour;
},200);
},

//4 - blink and glow
function()
{
    ledColors.reset();
    return setInterval(function(){
    currentColour === 0 ? ledColors.reset():null;
    ledColors[colorArray[currentColour]].blink(2,.1);
    currentColour = currentColour === 4 ? 0 : ++currentColour;
},2000);
}
];



http.createServer(function (request, response) {
   var requestUrl = url.parse(request.url);
   if(currentVariation) {clearTimeout(currentVariation);}
   ledColors.reset();
   switch(requestUrl.path.toLowerCase())
   {
    case '/red/on': 
       ledColors.red.on();
       response.writeHead(200);
       break;
    case '/white/on': 
       ledColors.white.on();
       break;
    case '/blue/on': 
       ledColors.blue.on();
       break;
    case '/green/on': 
       ledColors.green.on();
       break;
    case '/yellow/on': 
       ledColors.yellow.on();
       break;
    case '/variation/1': 
       currentVariation = variations[0]();
       break;
    case '/variation/2': 
       currentVariation =  variations[1]();
       break; 
    case '/variation/3': 
       currentVariation =  variations[2]();
       break;
    case '/variation/4': 
       currentVariation = variations[3]();
       break;
    case '/variation/4': 
       ledColors.allOn();
       break;
     case '/allon': 
       ledColors.allOn();
       break;      
    default :
        fs.readFile('./index.htm', function(error, content) {
		if (error) {
			response.writeHead(500);
			response.end();
		}
		else {
            response.writeHead(200,{"Content-Type":"text/html"});
            response.end(content, 'utf-8');
		}
	});
   
   } 
}).listen(9615)  


