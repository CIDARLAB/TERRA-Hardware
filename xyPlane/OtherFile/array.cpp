
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

const byte numChars = 32;
char recieveChars [numchars];

boolean newData = false;



template <typename T>
/*~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~*/
void write_vector(const vector<T>& V){
   cout << "The well plate locations are: " << endl;
  for(int i=0; i < V.size(); i++)
    cout << V[i] << " ";
    cout << endl;
}

bool comp(const int& num1, const int& num2) {
    return num1 > num2;
}

/*~~~~~~~~~~~~~~~~~~~Main~~~~~~~~~~~~~~~~~~~*/

int main()
{
    int input;
    vector<int> V;

    int wellPlate [8][12];
    int n,m = 0;
    int order = 1;

// generating array for well-plate location

  cout << "This is the array for a 96 well plate:" << endl;
  cout << "[" ;

    for (n=0; n < 8; n++) {
      for (m=0; m < 12; m++){
        wellPlate[n][m] = order;
        order++;
        cout << wellPlate[n][m] << " ";
      }
      if (n<7)
      cout << endl;
    }
    cout << "]" << endl;

// generating input vector - maybe add a confirmation section

      cout << "Enter numbers corresponding to well plate locations (enter 'end' to finish): " << endl;
      while ((cin >> input) && (input != 9999))
         V.push_back(input);

      sort(V.begin(), V.end(), comp);

      write_vector(V);
// check against the input vector

int Xbefore, Ybefore, Xnow, Ynow = 0;   // location saves
int i = 0;                              // movement iterator

    // assuming XY plane is at home, visit each location
    for (int size = 1; size < (V.size() + 1); size++){
      for (n = 0; n < 8; n++) {
        for (m = 0; m < 12: m++){
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




     int j = 0;
     String channel_list;
     char pin_list[40];

     while(Serial.available() == 0) {};
     channel_list = Serial.readString();
     channel_list.toCharArray(pin_list,40);

     char *token = strtok(pin_list,” “);
     while(token != NULL){
       Open.pins[j] = atoi(token);
       Serial.println(Open.pins[j]);
       token = strtok (NULL, ” “);
       j++;
       };
       Open.pin_num = j;








}
