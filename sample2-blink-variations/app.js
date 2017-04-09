var ledOnOff = require('./blinker').ledOnOff;
var prompt = require('prompt');

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
]




var properties = [
    {
      name: 'Variations', 
      validator: /^[1-4]+$/,
      type: 'integer',
      warning: 'Variation must be only numbers between 1 to 4'
    }];

function startVariation(){    
    prompt.get(properties, function (err, result) {
        if (err) { return onErr(err); }
        else { 
        if(currentVariation){clearTimeout(currentVariation);}  
        currentVariation = variations[result.Variations - 1](); 
        }
        startVariation();
    });
}

function onErr(err) {
    console.log(err);
    return 1;
}
prompt.start();
startVariation();

