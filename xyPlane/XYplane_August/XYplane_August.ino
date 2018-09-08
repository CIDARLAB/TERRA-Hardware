#include <ArduinoSTL.h>
#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include "SyringeGroups.h"
#include "Outputs.h"


// Important Definitions
#define pinEnable    4  // PWM or Enable pins
#define pinStep      3  // Step 3
#define pinDir       2  // Direction 2
#define pinEnable_2  13 // PWM or enable pins
#define pinStep_2    9  // Step 92
#define pinDir_2     8  // Direction  8

//~~~~~~~~~~ Microstepping Features ~~~~~~~~~~//
#define microStep1  5   // mode select for microstepping
#define microStep2  10  // mode select for microstepping


//Syringe Variables
Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();
char incomingData = 0;
int outputNum = 0;


void setup(){
  Serial.begin(9600); // set baud rate for communication
  //Ezira code
  pwm.begin();
  pwm.setPWMFreq(60);  // Analog servos run at ~60 Hz updates
  pinMode(LED_BUILTIN, OUTPUT);
  //Ezira code

  delay(10);

  // OUTPUT declarations for Stepper 1
  pinMode( pinEnable,   OUTPUT );
  pinMode( pinDir   ,   OUTPUT );
  pinMode( pinStep  ,   OUTPUT );

  // OUTPUT declarations for Stepper 2
  pinMode( pinEnable_2, OUTPUT );
  pinMode( pinDir_2   , OUTPUT );
  pinMode( pinStep_2  , OUTPUT );

  //Microstepping Output

  pinMode (microStep1, OUTPUT);
  pinMode (microStep2, OUTPUT);
  digitalWrite (microStep1, HIGH);
  digitalWrite (microStep2, HIGH);


}

void loop(){
  //  Ezira code
  //  Ask user for number of outputs their microfluidic chip has
  Serial.print("Enter how many outputs your microfluidic chip contains:");
  while(Serial.available() == 0){};

  if (Serial.available() > 0) {
    incomingData = 0;
    while(1) {
      incomingData = Serial.read();
      if (incomingData == '\n') break;
      if (incomingData == -1) continue;
      outputNum *= 10;
      outputNum = ((incomingData - 48) + outputNum);
    }
  }
  Serial.println(outputNum);

  Outputs outputs[outputNum];

  openPins = ['0','2','4','6','8','10','12','14'];
  closePins = ['1','3','5','7','9','11','13','15'];
//  Establish pins sequence of open and closed valves for each output
  for (int k = 0; k < outputNum; k++){
    outputs[k].assign_open(openPins[k]);
    outputs[k].assign_close(closePins[k]);
    outputs[k].assign_coordinates();
  };


  //Control the actuation of control syringe groups

 /* while(1){
    outputs[0].origin();
  }*/
  //Ezira code



 // ~~~ VARIABLES FOR XY-PLANE ~~~ //

   // std::vector<int> V;
    int wellPlate [8][12];
    int n,m = 0;
    int order = 1;

// generating array for well-plate location

  Serial.println ("This is the array for a 96 well plate:");
  Serial.print ("[") ;

    for (n=0; n < 8; n++) {
      for (m=0; m < 12; m++){
        wellPlate[n][m] = order;
        order++;
        Serial.print (wellPlate[n][m]);
        Serial.print (" ");
      }
      if (n<7)
      Serial.println();
    }
    Serial.println("]");


// TRANSLATION loop starts here //


// for loop that goes through how many outputs you have
for (int outputIterator = 0; outputIterator < outputNum; outputIterator++){


  // ~~~ HOMING SEQUENCE ~~~ //
  int ivy = 0;


  digitalWrite( pinDir_2   ,HIGH); // Direction control
  digitalWrite( pinStep_2  ,LOW);  // initialize it to be not moving
  digitalWrite( pinDir   , LOW); // Direction control of motor 2
  digitalWrite( pinStep  , LOW);  // initialize motor 2 to be not moving

  for (ivy=0; ivy<(800*4); ivy++){
  Serial.println(ivy);
  digitalWrite( pinStep, HIGH);
  digitalWrite( pinStep_2, HIGH);
  delay(1);
  digitalWrite(pinStep, LOW);
  digitalWrite(pinStep_2, LOW);
  delay(1);
  }



int Xbefore = 0;
int Ybefore = 0;
int Xnow = 0;
int Ynow = 0;
int i = 0;  // movement iterator

    // assuming XY plane is at home, visit each location
for (int size = 1; size < (outputs[outputIterator].coordinates.size() + 1); size++){

      for (n = 0; n < 8; n++) { // n
        for (m = 0; m < 12; m++){ // m

           if  (outputs[outputIterator].coordinates[size - 1] == wellPlate[n][m] ){


            digitalWrite (microStep1, HIGH);
            digitalWrite (microStep2, HIGH);

            Serial.print ("The m and n values are ");
            Serial.print (m);
            Serial.print (" ");
            Serial.print (n);
            Serial.print (".");
            Serial.println ();


            Serial.print ("The Xbefore and Ybefore values are ");
            Serial.print (Xbefore);
            Serial.print (" ");
            Serial.print (Ybefore);
            Serial.print (".");
            Serial.println ();

             Ynow = n - Ybefore; // calculating how much needed to move in Y
             Xnow = m - Xbefore; // calculating how much needed to move in X

             if (Xnow < 0){
              digitalWrite(pinDir,LOW);
              Xnow = Xnow * (-1);
            }
            else {
              digitalWrite(pinDir,HIGH);
            }

            if (Ynow < 0){
             digitalWrite(pinDir_2,HIGH);
             Ynow = Ynow * (-1);
           }
           else {
             digitalWrite(pinDir_2,LOW);
           }

            for (i = 0; i < ((45*4)*Xnow); i++){
              digitalWrite (pinStep, HIGH);
              delay(10);
              digitalWrite (pinStep,LOW);
              delay(10);
            }

            for (i = 0; i < ((45*4)*Ynow); i++){
              digitalWrite (pinStep_2, HIGH);
              delay(10);
              digitalWrite (pinStep_2,LOW);
              delay(10);
            }

            Serial.print ("The plane has moved ");
            Serial.print (Xnow);
            Serial.print (" ");
            Serial.print (Ynow);
            Serial.print (".");
            Serial.println ();

            delay (2500);

            // open syringes - output is released
            outputs[outputIterator].open();

            delay(10000); // dispense time (can be dictated by flowrate)

            // close valves, all fluids go to waste
            outputs[outputIterator].close();
            delay (2500);

            // setting the locations to current location
            Ybefore = n;
            Xbefore = m;

           }
        }
      }
    }
  }


while (true);

}
/*
void write_vector(const std::vector<int>& V){
   Serial.println ("The well plate locations are: ");
  for(int i=0; i < V.size(); i++)
    Serial.print (V[i]);
    Serial.println (" ");
    Serial.println (V.size());
}

bool comp(const int& num1, const int& num2) {
    return num1 < num2;
}
*/
