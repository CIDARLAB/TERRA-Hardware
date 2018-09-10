#ifndef Outputs_H
#define Outputs_H

#include "SyringeGroups.h"
#include <ArduinoSTL.h>

//Characterize output class to describe which control syringes are required for each output on a microfluidic chip

/* A SyringeGroups object Open includes all control syringes required to be open and Close object includes all control syringes
needed to control for various outputs*/

class Outputs{
  public:
    std::vector<int> coordinates;
    int coordinate_num;
    int counter_open = 0;
    int counter_close = 0;

    SyringeGroups Open;
    SyringeGroups Close;

    void assign_open(int connection);
    void assign_close(int connection);
    void assign_coordinates();

    void write_vector(const std::vector<int>& V);
    static bool comp(const int& num1, const int& num2);

    void origin();
    void open();
    void close();


};

#endif
