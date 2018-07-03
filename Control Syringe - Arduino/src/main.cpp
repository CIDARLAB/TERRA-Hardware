#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include "SyringeGroups.h"
#include "Outputs.h"

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();
int output_num;

void setup() {
  Serial.begin(9600); //set Baud Rate
  pwm.begin();
  pwm.setPWMFreq(60);  // Analog servos run at ~60 Hz updates
  delay(10);
}
void loop() {

  // Ask user for number of outputs their microfluidic chip has
  Serial.print("Enter how many outputs your microfluidic chip contains:");
  while(Serial.available() == 0){};
  output_num = Serial.read() - 48;
  Serial.println(output_num);

  Outputs outputs[output_num];

//Establish pins sequence of open and closed valves for each output
  for (int k = 0; k < output_num; k++){
    outputs[k].assign_open();
    outputs[k].assign_close();
  };


  //Control the actuation of control syringe groups

  while(1){
    outputs[0].open();
}
}
