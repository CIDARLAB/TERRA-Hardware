#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include "SyringeGroups.h"

void SyringeGroups::setServoPulse(int n, double pulse){
    Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();
    double pulselength;
    pulselength = 1000000;   // 1,000,000 us per second
    pulselength /= 60;   // 60 Hz
    //Serial.print(pulselength); Serial.println(" us per period");
    pulselength /= 4096;  // 12 bits of resolution
    //Serial.print(pulselength); Serial.println(" us per bit");
    pulse *= 1000000;  // convert to us
    pulse /= pulselength;
    pwm.setPWM(n, 0, pulse);
  };

void SyringeGroups::neutral(){
  for(int i = 0; i < pin_num; i++){
    setServoPulse(pins[i],0.0008);
  };
}

void SyringeGroups::on(){
  for(int i = 0; i < pin_num; i++){
    setServoPulse(pins[i],0.0014);
  };
};

void SyringeGroups::off(){
  for(int i = 0; i < pin_num; i++){
    setServoPulse(pins[i],0.0006);
  };
};

void SyringeGroups::assign(){

};
