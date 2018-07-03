#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include "SyringeGroups.h"

int group_num;
Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

void setup() {
  Serial.begin(9600); //set Baud Rate
  pwm.begin();
  pwm.setPWMFreq(60);  // Analog servos run at ~60 Hz updates
  delay(10);
}
void loop() {

  // Ask user for number of control syringes they are using
  Serial.print("Enter how many out you will be using for TERRA: \n **You can have groups with 1 or more syringes** \n");
  while(Serial.available() == 0){};
  group_num = Serial.read() - 48;
  Serial.println(group_num);

  int j;
  char pin_list[40];
  String channel_list;
  SyringeGroups groups[group_num];

  //Give each syringe group object the channel list that it will control
    for (int k = 0; k < group_num; k++){
      Serial.print("Enter which channels on the Adafruit Motor Shield are going to be used for Group");
      Serial.println(k + 1);
      Serial.println("** Seperate channels using a space **");
      while(Serial.available() == 0) {};
      channel_list = Serial.readString();
      channel_list.toCharArray(pin_list,40);

      char *token = strtok(pin_list," ");
      while(token != NULL){
        groups[k].pins[j] = atoi(token);
        Serial.println(groups[k].pins[j]);
        token = strtok (NULL, " ");
        j++;
        };
      groups[k].pin_num = j;
      j = 0;
    };

  Serial.println(groups[1].pins[1]);

  //Control the actuation of control syringe groups

  while(1){
}
}
