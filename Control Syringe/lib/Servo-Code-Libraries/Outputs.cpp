#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include "Outputs.h"
#include <ArduinoSTL.h>


void Outputs::assign_open(int connection) {
  Open.pins = connection;
  };

void Outputs::assign_close(int connection){
  Close.pins = connection;
};

void Outputs::assign_coordinates(){
  // generating input vector for LOCATIONS - (can add a confirmation section)

       String input;
       char input_list[100];
       while(Serial.available() == 0){};

       input = Serial.readString();                        // read the input locations as a string
       input.toCharArray(input_list, 100);                 // take input string and store in a character array

  // parse through character array and
       char * token = strtok (input_list," ");
       while (token != NULL) {
         coordinates.push_back(atoi(token));
         token = strtok (NULL, " ");
       };

       std::sort(coordinates.begin(), coordinates.end(), comp);
       write_vector(coordinates); // for each output
};


void Outputs::write_vector(const std::vector<int> & V){
  Serial.println ("The well plate locations are: ");
 for(int i=0; i < V.size(); i++)
   Serial.print (V[i]);
   Serial.println (" ");
   Serial.println (V.size());
}

bool Outputs::comp(const int& num1, const int& num2) {
   return num1 < num2;
}

void Outputs::origin(){
  Open.neutral();
  Close.neutral();
}

void Outputs::open(){
    Open.on();
    Close.off();
};

void Outputs::close(){
    Close.on();
    Open.off();
};
