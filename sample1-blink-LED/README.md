STEP 1 :- Getting the hardware ready <br/>
		1. You need a RPI3 board <br/>
		2. Jumper wires to connect RPI3 board with breadboard _.<br/>
		3. 3 LEDs Red Green and Blue color _.<br/>
		4. 3 Resistors of about 550 ohms _.<br/>
		5. Connections<br/>
			A. Connect the shorter leg (Cathode) of all the LEDs to a common ground taken from GPIO pin 5 through the resistor used for each connection .
			B. Connect the longer leg (anode) of Red LED with GPIO pin 2 , Blue LED with GPIO pin 3 and Green LED with GPIO pin 4 .

STEP 2 :- Getting the software ready
		1. I am using Raspbian 4.4 for this sample , you may use any OS as long as it supports Nodejs .
		2. You need Node js installed .
		3. You also need a compatible version of NPM installed .
		4. Now you can choose to run this sample as sudo which is not a good idea or you may install "wiringpi" using apt-get to run it without su privileges . 

STEP 3 :- Running this sample 
		1. Clone this sample at your local drive
		2. Go inside sample1-blink-LED
		3. Run "npm install"
		4. Run this sample "node app.js" 

Result:- You will see all three LEDs will blink every .5 seconds for one hour , you can interrupt the execution using  "ctrl + C" .

Feel free to change your local copy and play as you like . Enjoy Blinking!!.
