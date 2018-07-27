#include <ArduinoSTL.h>
#define pinEnable    4 // Enable 4
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
  digitalWrite( pinDir   , LOW); // Direction control 
  digitalWrite( pinStep  , LOW);  // initialize it to be not moving
  digitalWrite( pinDir_2   ,LOW); // Direction control of motor 2
  digitalWrite( pinStep  , LOW);  // initialize motor 2 to be not moving

    int input;
    vector<int> V;

    int wellPlate [8][12];
    int n,m = 0;
    int order = 1;

// generating array for well-plate location

  Serial.println ("This is the array for a 96 well plate:");
  Serial.print ("[") ;

    for (n=0; n < 8; n++) {
      for (m=0; m < 12; m++){
        wellPlate[n][m] = order;
        order++;
        Serial.print (wellPlate[n][m]);
        Serial.print (" ");
      }
      if (n<7)
      Serial.println();
    }
    Serial.println("]");

// generating input vector - maybe add a confirmation section

      Serial.println("Enter numbers corresponding to well plate locations (enter 'end' to finish): ");
      while ((Serial.available() == 0) && (input != 9999)) // FIX THIS AREA
         V.push_back(input);

      sort(V.begin(), V.end(), comp);

      write_vector(V);
// check against the input vector

int Xbefore, Ybefore, Xnow, Ynow = 0;   // location saves
int i = 0;                              // movement iterator

    // assuming XY plane is at home, visit each location
    for (int size = 1; size < (V.size() + 1); size++){
      for (n = 0; n < 8; n++) {
        for (m = 0; m < 12; m++){
           if  (V[size - 1] == wellPlate[n][m] ){
             Ynow = n - Ybefore; // calculating how much needed to move in Y
             Xnow = m - Xbefore; // calculating how much needed to move in X

             if (Xnow < 0){
              digitalWrite(pinDir,LOW);
            }
            else {
              digitalWrite(pinDir,HIGH);
            }

            if (Ynow < 0){
             digitalWrite(pinDir,HIGH);
           }
           else {
             digitalWrite(pinDir,LOW);
           }

            for (i = 0; i < (51*Xnow); i++){
              digitalWrite (pinStep, HIGH);
              delay(10);
              digitalWrite (pinStep,LOW);
              delay(10);
            }

            for (i = 0; i < (51*Ynow); i++){
              digitalWrite (pinStep_2, HIGH);
              delay(10);
              digitalWrite (pinStep_2,LOW);
              delay(10);
            }

            delay(1000); // dispense time (can be dictated by flowrate)

            // add feature for syrine pump actuatuon here to stop output

            // setting the locations to current location
            Ybefore = n;
            Xbefore = m;

           }
        }
      }
    }
  

while (true);

}

void write_vector(const vector<T>& V){
   Serial.println ("The well plate locations are: ");
  for(int i=0; i < V.size(); i++)
    Serial.print (V[i];
    Serial.println (" ");
}

bool comp(const int& num1, const int& num2) {
    return num1 > num2;
}
