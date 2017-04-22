
var Gpio = require('onoff').Gpio;    
  

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






