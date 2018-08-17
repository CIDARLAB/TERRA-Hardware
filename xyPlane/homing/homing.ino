//Homing the XY-plane
#include "Stepper.h"
// stepper 1
#define pinEnable   13 // Enable or pwm
#define pinStep      9 // Step
#define pinDir       8 // Direction
// stepper 2
#define pinEnable_2  4 // Enable or pwm 
#define pinStep_2    3 // Step
#define pinDir_2     2 // Direction
// microstep variables

const int stepsPerRevolution = 200;
const int microSteps = 16;
int revolutions = 2;
int stepsToSwing = microSteps * stepsPerRevolution * revolutions;
int motorRPM = 100;

Stepper myStepper(stepsPerRevolution, true, microSteps, pinDir,pinDir_2,pinEnable, pinEnable_2);

void setup () {
  Serial.begin(9600);
  Serial.println("Test DRV8825");


  pinMode( pinEnable,   OUTPUT );
  pinMode( pinDir   ,   OUTPUT );
  pinMode( pinStep  ,   OUTPUT );
  pinMode( pinEnable_2, OUTPUT );
  pinMode( pinDir_2   , OUTPUT );
  pinMode( pinStep_2  , OUTPUT );

  //initialize some stuff

  
  digitalWrite(pinEnable, HIGH);
  digitalWrite(pinEnable_2, HIGH);

  mystepper.setSpeed(motorRPM);
}

void loop(){



myStepper.step(stepsToSwing);
myStepper.off();
yield();
delay(500);
yield();


  

while (1) ;

}
