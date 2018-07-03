#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include "Outputs.h"

  void Outputs::open(){
    Open.on();
    Close.off();
  };

  void Outputs::close(){
    Open.off();
    Close.on();
  };

  void Outputs::assign(int open_pins[16], int close_pins[16]){
  };
