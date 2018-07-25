#define pinEnable   4 // Enable 4
#define pinStep      3 // Step 3
#define pinDir       2 // Direction 2
#define pinEnable_2  13 // Enable 13
#define pinStep_2    9 // Step 9 
#define pinDir_2     8 // Direction  8

void setup(){
  Serial.begin(9600);
  
  pinMode( pinEnable,   OUTPUT );
  pinMode( pinDir   ,   OUTPUT );
  pinMode( pinStep  ,   OUTPUT );
  pinMode( pinEnable_2, OUTPUT );
  pinMode( pinDir_2   , OUTPUT );
  pinMode( pinStep_2  , OUTPUT );
}

void loop(){
  int i = 0;
  int j = 0;
  
  digitalWrite( pinDir   , LOW); // Direction control 
  digitalWrite( pinStep  , LOW);  // initialize it to be not moving
  digitalWrite( pinDir_2   ,LOW); // Direction control of motor 2
  digitalWrite( pinStep  , LOW);  // initialize motor 2 to be not moving
  

 for (j = 0; j < 8 ; j++){
  // Go a certain number of steps
  for( i=0; i<100; i++){
    digitalWrite( pinStep, HIGH );
   // digitalWrite( pinStep_2, HIGH);
    delay( 25 );
    digitalWrite( pinStep, LOW );
   // digitalWrite( pinStep_2, LOW);
    delay( 25 );
  } 
  
  // Changing direction
  digitalWrite( pinDir   , HIGH);  // Direction is changed
  //digitalWrite( pinDir_2   , HIGH); // Direction of motor 2 is changed
  
  // 200 steps in other direction
  for( i=0; i<100; i++){
    digitalWrite( pinStep, HIGH );
    //digitalWrite( pinStep_2, HIGH);
    delay( 10 );
    digitalWrite( pinStep, LOW );
    //digitalWrite( pinStep_2, LOW);
    delay( 10 );
  } 


  // Shifting XY-plane down one row
  for (i=0; i<100; i++){
    digitalWrite(pinStep_2, HIGH);
    delay (5);
    digitalWrite(pinStep_2, LOW);
    delay (5);
  }
}

while (true);
  /*
 
  Serial.println("block movement + wait 5 seconds");
  delay(5);
  
  digitalWrite( pinEnable, HIGH ); // logic inverse
  
  // finish the program and enter infinite while loop
  Serial.println("Fin de programme");
  //while( true );
 */
}
