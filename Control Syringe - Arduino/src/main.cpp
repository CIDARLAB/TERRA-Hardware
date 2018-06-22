#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>



Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

#define SERVOMIN  150 // this is the 'minimum' pulse length count (out of 4096)
#define SERVOMAX  600 // this is the 'maximum' pulse length count (out of 4096)
int group_num;

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
    int pins[16];
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
}
void loop() {

  // Ask user for number of control syringes they are using
  Serial.print("Enter how many syringe groups you will be using for TERRA: \n **You can have groups with 1 or more syringes** \n");
  while(Serial.available() == 0){};
  group_num = Serial.read() - 48;
  Serial.print(group_num);
  Serial.print("\n");

  int k;
  int j;
  char pin_list[40];
  char *pin_pointer[40];
  String channel_list;
  SyringeGroups groups[group_num];

  //Give each syringe group object the channel list that it will control
  if(k == 0){
    for (k = 0; k < group_num; k++){
      Serial.print("Enter which channels on the Adafruit Motor Shield are going to be used for Group");
      Serial.print(k + 1);
      Serial.print("\n");
      Serial.print("** Seperate channels using a space **\n");
      while(Serial.available() == 0) {};
      channel_list = Serial.readString();
      channel_list.toCharArray(pin_list,40);

      char *token = strtok(pin_list," ");
      while(token != NULL){
        groups[k].pins[j] = int(token);
        Serial.print(pin_pointer[j]);
        token = strtok (NULL, " ");
        j++;
        };
      Serial.print("\n");
    };
  };

  Serial.print(groups[1].pins);

  //Create SyringeGroups objects for each channel group










  SyringeGroups Group1;
  Group1.zero();
  delay(500);
  Group1.ninety();
  delay(500);
  Group1.oneeighty();
  delay(500);
}
