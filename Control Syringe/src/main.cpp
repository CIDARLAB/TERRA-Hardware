#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include "SyringeGroups.h"
#include "Outputs.h"

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();
char incomingData = 0;
int outputNum = 0;

void setup() {
  Serial.begin(9600); //set Baud Rate
  pwm.begin();
  pwm.setPWMFreq(60);  // Analog servos run at ~60 Hz updates
  pinMode(LED_BUILTIN, OUTPUT);

  delay(10);
}
void loop() {

  // Ask user for number of outputs their microfluidic chip has
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
  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);

  Outputs outputs[outputNum];

//Establish pins sequence of open and closed valves for each output
  for (int k = 0; k < outputNum; k++){
    outputs[k].assign_open();
    outputs[k].assign_close();
  };

  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  delay(1000);
  //Control the actuation of control syringe groups

  while(1){
    outputs[0].close();
  }
}
