#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include "Outputs.h"


void Outputs::assign_open(){
  int j = 0;
  String channel_list;
  char pin_list[40];

  Serial.print("Enter which pins on the Adafruit Motor Shield are going to be used for the open group of this output");
  Serial.println("** Seperate channels using a space **");

  while(Serial.available() == 0) {};

  channel_list = Serial.readString();
  channel_list.toCharArray(pin_list,40);

  char *token = strtok(pin_list," ");
  while(token != NULL){
    if (token == '\n') break;
    if (token == -1) continue;
    Open.pins[j] = atoi(token);
    Serial.println(Open.pins[j]);
    token = strtok (NULL, " ");
    j++;
    };
    Open.pin_num = j;
  };

void Outputs::assign_close(){
  int j = 0;
  String channel_list;
  char pin_list[40];

  Serial.println("Enter which pins on the Adafruit Motor Shield are going to be used for the close group of this output");
  Serial.println("** Seperate channels using a space **");
  while(Serial.available() == 0) {};
  channel_list = Serial.readString();
  channel_list.toCharArray(pin_list,40);

  char *token = strtok(pin_list," ");
  while(token != NULL){
    if (token == '\n') break;
    if (token == -1) continue;
    Close.pins[j] = atoi(token);
    Serial.println(Close.pins[j]);
    token = strtok (NULL, " ");
    j++;
    };
  Close.pin_num = j;
}
void Outputs::origin(){
  Open.neutral();
  Close.neutral();
}

void Outputs::open(){
    Open.on();
    //delay(2000);
    Close.off();
};

void Outputs::close(){
    Close.on();
    //delay(2000);
    Open.off();
};
