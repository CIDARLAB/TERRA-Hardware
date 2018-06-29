#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include "setServoPulse.h"



//Class to characterize the syringe groups by identifying what channels are within a group and functions to set their states
class SyringeGroups{
  public:
    int pins[16];
    int pin_num;
    
    void off(){
      for(int i = 0; i < pin_num; i++){
      setServoPulse(pins[i],0.0008);
      };
    };
    void oneeighty(){
      setServoPulse(pins[0],0.0022);
    };
    void on(){
      for(int i = 0; i < pin_num; i++){
        setServoPulse(pins[i],0.0014);
      };
    };

    void prnt(){
      for(int i; i < 16; i++){
        Serial.println(pins[i]);
        };
      };
};
