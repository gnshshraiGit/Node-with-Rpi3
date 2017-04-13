STEP 1 :- Getting the hardware ready <br/>
                1. You need a RPI3 board <br/>
                2. Jumper wires to connect RPI3 board with breadboard .<br/>
                3. Five LEDs Red, Green, Blue, Yellow and White color, you can choose any color and pin combination you like .<br/>
                4. Five Resistors of about 550 ohms each.<br/>
                5. Connections<br/>
                        A. Connect the shorter leg (Cathode) of all the LEDs to a common ground taken from physical pin 5 through the resistor used for each connection .<br/>
                        B. Connect the longer leg (anode) of Red LED with GPIO pin 2, Blue LED with GPIO pin 3, Green LED with GPIO pin 4, Yellow LED with GPIO pin 14 and White LED with GPIO pin 15 .<br/>

STEP 2 :- Getting the software ready<br/>
                1. I am using Raspbian 4.4 for this sample , you may use any OS as long as it supports Nodejs .<br/>
                2. You need compatible Nodejs installed i am using Nodejs version 4.8.1 .<br/>
                3. You also need a compatible version of NPM installed, I am using NPM version 2.15.11 .<br/>
                4. Now you can choose to run this sample as sudo which is not a good idea or you may install "gpio-admin" to run it without su privileges .<br/> 
		ref:- http://www.robert-drummond.com/2013/06/06/raspberry-pi-gpio-inputoutput-in-javascript/<br/> 

STEP 3 :- Running this sample <br/>
                1. Clone this sample at your local drive <br/>
                2. Go inside sample2-blink-variations folder <br/>
                3. Run "npm install"<br/>
                4. Run this sample "node app.js" <br/>

Result:- there are four different variations , reply to prompt with a choosen number between 1 to 4 , 

you can interrupt the execution using  "ctrl + C" twice . <br/>

Feel free to change your local copy and play as you like . Enjoy Blinking!!. <br/>
