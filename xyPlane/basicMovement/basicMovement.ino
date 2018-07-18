#define pinEnable   13 // Enable
#define pinStep      9 // Step
#define pinDir       8 // Direction
#define pinEnable_2  4 // Enable
#define pinStep_2    3 // Step
#define pinDir_2     2 // Direction

void setup(){
  Serial.begin(9600);
  Serial.println("Test DRV8825");

  pinMode( pinEnable,   OUTPUT );
  pinMode( pinDir   ,   OUTPUT );
  pinMode( pinStep  ,   OUTPUT );
  pinMode( pinEnable_2, OUTPUT );
  pinMode( pinDir_2   , OUTPUT );
  pinMode( pinStep_2  , OUTPUT );
}

void loop(){
  int i = 0;

  digitalWrite( pinDir   , HIGH); // Direction control
  digitalWrite( pinStep  , LOW);  // initialize it to be not moving
  digitalWrite( pinDir_2   , LOW); // Direction control of motor 2
  digitalWrite( pinStep  , LOW);  // initialize motor 2 to be not moving


  // Go a certain number of steps
  for( i=0; i<100; i++){
    Serial.println( i );
    digitalWrite( pinStep, HIGH );
    digitalWrite( pinStep_2, HIGH);
    delay( 5 );
    digitalWrite( pinStep, LOW );
    digitalWrite( pinStep_2, LOW);
    delay( 5 );
  }

  // Changing direction
  digitalWrite( pinDir   , LOW);  // Direction is changed
  digitalWrite( pinDir_2   , HIGH); // Direction of motor 2 is changed

  // 200 steps in other direction
  for( i=0; i<100; i++){
    Serial.println( i );
    digitalWrite( pinStep, HIGH );
    digitalWrite( pinStep_2, HIGH);
    delay( 10 );
    digitalWrite( pinStep, LOW );
    digitalWrite( pinStep_2, LOW);
    delay( 10 );
  }

// Add delay in between loops for translation

delay (100);


  /*
  digitalWrite( pinEnable, HIGH ); // logic inverse

  // finish the program and enter infinite while loop
  Serial.println("Program is finsihed");
  //while( true );
 */
}
