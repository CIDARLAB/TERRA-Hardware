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

    SyringeGroups Open;
    SyringeGroups Close;

    void assign_open();
    void assign_close();
    void assign_coordinates();

    void write_vector(const std::vector<int>& V);
    static bool comp(const int& num1, const int& num2);

    void origin();
    void open();
    void close();


};

#endif
