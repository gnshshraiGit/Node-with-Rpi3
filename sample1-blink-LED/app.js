var ledOnOff = require('./blinker').ledOnOff;

var ledColors = {
red : new ledOnOff(2,'RED'),
blue : new ledOnOff(3,'BLUE'),
green : new ledOnOff(4, 'GREEN')
};

ledColors.green.blink(3600,.5);
ledColors.red.blink(3600,.5);
ledColors.blue.blink(3600,.5);