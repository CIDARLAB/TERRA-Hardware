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
  state = 0;
}

void SyringeGroups::on(){
  for(int i = 0; i < pin_num; i++){
    setServoPulse(pins[i],0.0008);
    delay(125);
    setServoPulse(pins[i],0.0009);
    delay(125);
    setServoPulse(pins[i],0.0010);
    delay(125);
    setServoPulse(pins[i],0.0011);
    delay(125);
    setServoPulse(pins[i],0.0012);
    delay(125);
    setServoPulse(pins[i],0.0013);
    delay(125);
    setServoPulse(pins[i],0.0014);
  };
  state = 1;
};

void SyringeGroups::off(){
  if(state == 1){
    for(int i = 0; i < pin_num; i++){
      setServoPulse(pins[i],0.0014);
      delay(250);
      setServoPulse(pins[i],0.0013);
      delay(250);
      setServoPulse(pins[i],0.0012);
      delay(250);
      setServoPulse(pins[i],0.0011);
      delay(250);
      setServoPulse(pins[i],0.0010);
      delay(250);
      setServoPulse(pins[i],0.0009);
      delay(250);
      setServoPulse(pins[i],0.0008);
      delay(250);
      setServoPulse(pins[i],0.0007);
    };
  };
  if(state == 0)
    for(int i = 0; i < pin_num; i++){
      setServoPulse(pins[i],0.0007);
    };
  state = -1;
};
