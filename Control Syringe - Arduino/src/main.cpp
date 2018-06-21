#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>


Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

#define SERVOMIN  150 // this is the 'minimum' pulse length count (out of 4096)
#define SERVOMAX  600 // this is the 'maximum' pulse length count (out of 4096)
int pin_list;\
int pin_num;
int spaces;

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
  //Serial.println(pulse);
  pwm.setPWM(n, 0, pulse);
};

//Class to characterize the syringe groups by identifying what channels are within a group and functions to set their states
class SyringeGroups{
  public:
    int pins[1] = {0};
    void zero(){
        setServoPulse(pins[0],0.0006);
      };
    void ninety(){
        setServoPulse(pins[0],0.002);
      };
    void oneeighty(){
        setServoPulse(pins[0],0.0015);
      };
      };

void setup() {
  Serial.begin(9600); //set Baud Rate
  pwm.begin();

  pwm.setPWMFreq(60);  // Analog servos run at ~60 Hz updates

  delay(10);

  //Get user input regarding number of control syringes which channels will be used
  Serial.print("Enter how many control syringes you will be using for TERRA: \n");
  //Serial.print("Enter which channels on the Adafruit Motor Shield are going to be used for servo motors:  \n**Seperate channels with spaces**\n");
}

void loop() {

  if(Serial.available() > 0){
    pin_num = Serial.read() - 48;
    spaces = pin_num - 1;
    Serial.print(pin_num);
  };

  while(Serial.available() > pin

  SyringeGroups Group1;
  Group1.zero();
  delay(500);
  Group1.ninety();
  delay(500);
  Group1.oneeighty();
  delay(500);
}
