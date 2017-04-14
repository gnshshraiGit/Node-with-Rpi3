
var ledOnOff = require('./blinker').ledOnOff;

var ledObj = new ledOnOff(0);

var rgb = ledObj.RGBLed();
rgb.createRGB(26,19,13);
var rgb1 = ledObj.RGBLed();
rgb1.createRGB(21,20,16);

setInterval(function(){
   rgb.fillRGB(Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255));
   rgb1.fillRGB(Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255));
},100);