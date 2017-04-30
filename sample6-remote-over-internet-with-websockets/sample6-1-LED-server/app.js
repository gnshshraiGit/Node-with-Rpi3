var ledOnOff = require('./blinker').ledOnOff;
var http = require('http');
var url = require('url');
var request = require('request');

var ledColors = {
red : new ledOnOff(2,'RED'),
blue : new ledOnOff(3,'BLUE'),
green : new ledOnOff(4, 'GREEN'),
yellow : new ledOnOff(14,'YELLOW'),
white : new ledOnOff(15,'WHITE'),
rgb1: function(){ 
    var _rgb = new ledOnOff.RGB();
    _rgb.createRGB(26,19,13); 
    return _rgb;
}(),
rgb2: function(){ 
    var _rgb = new ledOnOff.RGB();  
    _rgb.createRGB(21,20,16); 
    return _rgb;
}(),
rgbCode:[0,0,0],
reset: function(){
    this.red.off();
    this.blue.off();
    this.green.off();
    this.yellow.off();
    this.white.off();
    this.rgb1.off();
    this.rgb2.off();
    this.rgbCode=[0,0,0];
},
allOn: function(){
    this.red.on();
    this.blue.on();
    this.green.on();
    this.yellow.on();
    this.white.on();
    this.rgb1.on();
    this.rgb2.on();
    this.rgbCode=[255,255,255];
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
},

//5 - Random RGB
function(){
   return setInterval(function(){
   ledColors.rgb1.fillRGB(Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255));
   ledColors.rgb2.fillRGB(Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255));
},1000);
}
];


//To refresh IP 
var cordinateUpdateService = 'http://192.168.1.100:1337/update'
var ListeningPort = 9615;
var appName = 'trixie';
var formatedRDnsUrl = cordinateUpdateService + '?app=' + appName + '&port=' + ListeningPort;

setInterval(function () {
    request(formatedRDnsUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('IP update success' + body);
        }
        else {
            console.log('Failure: Error = ' + error);
        }
    });
}, 1000 * 30);


http.createServer(function (request, response) {
   var requestUrl = url.parse(request.url);
   if(currentVariation) {clearTimeout(currentVariation);}
   ledColors.reset();
   switch(requestUrl.pathname.toLowerCase())
   {
    case '/red/on': 
       ledColors.red.on();
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
       case '/red/off': 
       ledColors.red.off();
       break;
    case '/white/off': 
       ledColors.white.off();
       break;
    case '/blue/off': 
       ledColors.blue.off();
       break;
    case '/green/off': 
       ledColors.green.off();
       break;
    case '/yellow/off': 
       ledColors.yellow.off();
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
    case '/variation/5': 
       currentVariation = variations[4]();
       break;
    case '/setrgb':
       var rgbCode = requestUrl.query.split('=')[1].split(',');
       rgbCode.forEach(function(val,indx){
            rgbCode[indx] = parseInt(val);
       });
       ledColors.rgb1.fillRGB(rgbCode[0],rgbCode[1],rgbCode[2]);
       ledColors.rgb2.fillRGB(rgbCode[0],rgbCode[1],rgbCode[2]);
       ledColors.rgbCode = rgbCode;
       break;
     case '/allon': 
       ledColors.allOn();
       break;      
     case '/reset': 
       ledColors.reset();
       break; 
    default :
        response.writeHead(200,{"Content-Type":"application/json"});
        response.end(JSON.stringify({error:true}), 'utf-8');   
   }
    response.writeHead(200,{"Content-Type":"application/json"});
    response.end(JSON.stringify(ledColors), 'utf-8');
}).listen(9615)  


