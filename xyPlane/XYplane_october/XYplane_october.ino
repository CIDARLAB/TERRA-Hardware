#include <ArduinoSTL.h>
#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include "SyringeGroups.h"
#include "Outputs.h"


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Definitions for Pinouts ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
#define pinEnable    4  // PWM or Enable pins (4
#define pinStep      3  // Step 3
#define pinDir       2  // Direction 2
#define pinEnable_2  13 // PWM or enable pins 13
#define pinStep_2    9  // Step 9
#define pinDir_2     8  // Direction  8
#define limSwitch_1  7  // first Limit Switch
#define limSwitch_2  6  // second Limit Switch
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Microstepping Pins ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
#define microStep1  5   // mode select for microstepping
#define microStep2  10  // mode select for microstepping


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Syringe Variables ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();
char incomingData = 0;
char dimensionIn = 0;
int outputNum = 0;
int plate = 0;
int plate_x = 0;
int plate_y = 0;
int stepCount = 0;


void setup(){
  Serial.begin(9600); // set baud rate for communication
  pwm.begin();
  pwm.setPWMFreq(60);  // Analog servos run at ~60 Hz updates
  pinMode(LED_BUILTIN, OUTPUT);


  delay(10);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ OUTPUT Declarations for Steppers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  pinMode( pinEnable,   OUTPUT );
  pinMode( pinDir   ,   OUTPUT );
  pinMode( pinStep  ,   OUTPUT );

  pinMode( pinEnable_2, OUTPUT );
  pinMode( pinDir_2   , OUTPUT );
  pinMode( pinStep_2  , OUTPUT );

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ OUTPUT Declarations for Microstepping ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  pinMode (microStep1, OUTPUT);
  pinMode (microStep2, OUTPUT);
  digitalWrite (microStep1, HIGH);
  digitalWrite (microStep2, HIGH);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Initialize Limit Switches ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  digitalWrite (limSwitch_1, HIGH);
  digitalWrite (limSwitch_2, HIGH);

}

void loop(){
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Take User Inputs ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
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

//  Establish pins sequence of open and closed valves for each output
  for (int k = 0; k < outputNum; k++){
    outputs[k].assign_open();
    outputs[k].assign_close();
    outputs[k].assign_coordinates();
  };

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Code for XY Plane ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
Serial.print("Select a well-plate dimensions: Enter 1 for 96-well, 2 for 384, and 3 for 24 wells");
while(Serial.available() == 0){};
      if (Serial.available() > 0) {
      dimensionIn = 0;
        while(1) {
          dimensionIn = Serial.read();
          if (dimensionIn == '\n') break;
          if (dimensionIn == -1) continue;
          plate *= 10;
          plate = ((dimensionIn - 48) + plate);
      }
  }



if (plate == 1){
    plate_x = 8;
    plate_y = 12;
    stepCount = 45;
}
else if(plate == 2){
    plate_x = 16;
    plate_y = 24;
    stepCount = 22.5;
}
else {
    plate_x = 4;
    plate_y = 6;
    stepCount = 90;
}



    int wellPlate [plate_x][plate_y];
    int n,m = 0;
    int order = 1;

// generating array for well-plate location

  Serial.println ("This is the array for a 96 well plate:");
  Serial.print ("[") ;

    for (n=0; n < plate_x; n++) {
      for (m=0; m < plate_y; m++){
        wellPlate[n][m] = order;
        order++;
        Serial.print (wellPlate[n][m]);
        Serial.print (" ");
      }
      if (n<(plate_x - 1))
      Serial.println();
    }
    Serial.println("]");


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ XY Plane movement ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
for (int outputIterator = 0; outputIterator < outputNum; outputIterator++){


  // ~~~ HOMING SEQUENCE ~~~ //
  int ivy = 0;


  digitalWrite( pinDir_2   , LOW); // Direction control
  digitalWrite( pinStep_2  ,LOW);  // initialize it to be not moving
  digitalWrite( pinDir   , HIGH); // Direction control of motor 2
  digitalWrite( pinStep  , LOW);  // initialize motor 2 to be not moving

  for (ivy=0; ivy<(3300); ivy++){
      if ( (digitalRead(7) == LOW) && (digitalRead(6) == LOW)){
        break;
      }
          Serial.println(ivy);
          digitalWrite( pinStep, HIGH);
          digitalWrite( pinStep_2, HIGH);
          delay(1);
          digitalWrite(pinStep, LOW);
          digitalWrite(pinStep_2, LOW);
          delay(1);
  }


delay(5000);


int Xbefore = 0;
int Ybefore = 0;
int Xnow = 0;
int Ynow = 0;
int i = 0;  // movement iterator

    // assuming XY plane is at home, visit each location
for (int size = 1; size < (outputs[outputIterator].coordinates.size() + 1); size++){

      for (n = 0; n < plate_x; n++) { // n 
        for (m = 0; m < plate_y; m++){ // m 
 
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
              digitalWrite(pinDir,HIGH);
              Xnow = Xnow * (-1);
            }
            else {
              digitalWrite(pinDir,LOW);
            }

            if (Ynow < 0){
             digitalWrite(pinDir_2,LOW);
             Ynow = Ynow * (-1);
           }
           else {
             digitalWrite(pinDir_2,HIGH);
           }

            for (i = 0; i < ((stepCount*4)*Xnow); i++){
              digitalWrite (pinStep, HIGH);
              delay(10);
              digitalWrite (pinStep,LOW);
              delay(10);
            }

            for (i = 0; i < ((stepCount*4)*Ynow); i++){
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
