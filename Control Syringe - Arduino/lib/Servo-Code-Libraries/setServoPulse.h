#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>



Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

//Use microseconds to set PWM pulses
void setServoPulse(uint8_t n, double pulse) {
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
