#include <iostream>
using namespace std;

int main () {

int wellPlate [8][12];
int n,m,order = 0;

  for (n=0; n < 8; n++) {
    for (m=0; m < 12; m++){
      wellPlate[n][m] = order;
      order++;
    }
  }

cout <<"this is the array: " << wellPlate << endl;

return 0;
}
