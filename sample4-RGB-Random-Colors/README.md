STEP 1 :- Getting the hardware ready <br/>
                1. You need a RPI3 board <br/>
                2. Jumper wires to connect RPI3 board with breadboard .<br/>
                3. Two RGB LEDs (common cathode type).<br/>
                4. Two resistors of about 550 ohms each.<br/>
                5. Connections<br/>
                        A. Connect the shorter leg (Cathode) of both the LEDs to a common ground taken from physical pin 5 through the resistor used for each connection .<br/>
                        B. Connect the longer RGB legs (3 anodes) of first LED to GPIO pin 26,19,13 and second pin to 21,20,16 in Red green blue order.<br/>

STEP 2 :- Getting the software ready<br/>
                1. I am using Raspbian 4.4 for this sample , you may use any OS as long as it supports Nodejs .<br/>
                2. You need compatible Nodejs installed i am using Nodejs version 4.8.1 .<br/>
                3. You also need a compatible version of NPM installed, I am using NPM version 2.15.11 .<br/>
		4. Install 'wiring-pi' this is a C library to communicate with GPIO efficiently and allows many more type of operations   
                5. Now you can choose to run this sample as sudo which is not a good idea or you may install "gpio-admin" to run it without su privileges .<br/> 
		ref:- http://www.robert-drummond.com/2013/06/06/raspberry-pi-gpio-inputoutput-in-javascript/<br/> 

STEP 3 :- Running this sample <br/>
                1. Clone this sample at your local drive <br/>
                2. Go inside sample4-RGB-Random-Colors folder <br/>
                3. Run "npm install"<br/>
                4. Then execute "node app.js".

Result:- This is a bit different than previous examples as for the fact that we are using RGB LEDs and we want to switch random colors on certain interval 100ms in this case
So , as we know that GPIOs doesn't acept analog values means it will not accept fractional values between 0 and 1 , it will be either 0 or 1 no intermediate state is supported
but we would need to have 255 intermediate state between 0 and 1 in order to get 255 shades of a particular color , this can be tricked by using PWM (pulse width modulation) 
PWM allows us to switch LED on and off very rapidly with a range of values , in our case we have set the max PWM range to 255 for red, green and blue pins with a tone of 3000Hz ,  
this means our LEDs will change state 3000 times / second depending on the PWM value , if it is 0 that means its competely off or if it is 255 it is fully on ,thus giving us a
simulation of 0-255 shades for eg if you give PWM values as 51 then that comes to 51/255 20% times on , which means the signal of 3000Hz will be mixed such that it will 
keep the LED on for 20% of the times and off for 80% (not conitnuous but a proportionate mix of cycle) of the time that will give our eyes an experience of having a lighter shade
of a particular color.
 
Feel free to change your local copy and play as you like . Enjoy Blinking!!. <br/>
