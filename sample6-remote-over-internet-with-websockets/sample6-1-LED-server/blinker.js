
var Gpio = require('onoff').Gpio;    
var wpi = require('wiringpi-node');
  

exports.ledOnOff = function (gpioPinNum,LedColor){
   var thisObject = 
   {
    __pinObject : new Gpio(gpioPinNum,'out'),

    on : function(){
        this.__pinObject.writeSync(1);
    },

    off : function(){
       this. __pinObject.writeSync(0);
        //_pinObject.unexport();
    },
    blink: function(duration,interval){
        var startBlinking = setInterval(function(){
            thisObject.state ? thisObject.off():thisObject.on();
        },interval*1000);
        setTimeout(function(){
            clearTimeout(startBlinking);
        },duration*1000);
    },
    get color(){return LedColor},
    get gpioPinNumber(){return gpioPinNum},
    get state(){
        if(typeof this.__pinObject !== 'undefined' && this.__pinObject !== null) 
                    return this.__pinObject.readSync()===1; 
                else 
                    return false;
    }
   };
    return thisObject;
};

exports.ledOnOff.RGB = function(){
        var thisRGB= {
        redPin:0,
        greenPin:0,
        bluePin:0,   
        createRGB : function(redPin, greenPin, bluePin){
            if((typeof redPin === 'undefined') || (typeof greenPin === 'undefined') || (typeof bluePin === 'undefined')) {throw 'wrong arguments'; return false;}
                wpi.setup('gpio');
                wpi.softToneCreate(redPin);
                wpi.softToneCreate(greenPin);
                wpi.softToneCreate(bluePin);
                // setting default values , these can be changed to produce various effects as desired 
                wpi.softToneWrite(redPin,3000);
                wpi.softToneWrite(greenPin,3000);
                wpi.softToneWrite(bluePin,3000);
                wpi.softPwmCreate(redPin, 0, 255);
                wpi.softPwmCreate(greenPin, 0, 255);
                wpi.softPwmCreate(bluePin, 0, 255);
                thisRGB.redPin = redPin;
                thisRGB.bluePin = bluePin;
                thisRGB.greenPin =  greenPin;
            },
          fillRGB: function(redFill,greenFill,blueFill){
              wpi.softPwmWrite(thisRGB.redPin,redFill);
              wpi.softPwmWrite(thisRGB.bluePin,blueFill);
              wpi.softPwmWrite(thisRGB.greenPin,greenFill);
          },
          off: function(){
              wpi.softPwmWrite(thisRGB.redPin,0);
              wpi.softPwmWrite(thisRGB.bluePin,0);
              wpi.softPwmWrite(thisRGB.greenPin,0);
          },
          on: function(){
              wpi.softPwmWrite(thisRGB.redPin,255);
              wpi.softPwmWrite(thisRGB.bluePin,255);
              wpi.softPwmWrite(thisRGB.greenPin,255);
          }  
        }
        return thisRGB;
    };






