var ledOnOff = require('./blinker').ledOnOff;

var ledColors = {
red : new ledOnOff(2,'RED'),
blue : new ledOnOff(3,'BLUE'),
green : new ledOnOff(4, 'GREEN'),
yellow : new ledOnOff(14,'YELLOW'),
white : new ledOnOff(15,'WHITE')
};

ledColors.green.blink(3600,.5);
ledColors.red.blink(3600,.5);
ledColors.blue.blink(3600,.5);
ledColors.yellow.blink(3600,.5);
ledColors.white.blink(3600,.5);