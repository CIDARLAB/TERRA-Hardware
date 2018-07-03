#ifndef Outputs_H
#define Outputs_H

#include "SyringeGroups.h"

//Characterize output class to describe which control syringes are required for each output on a microfluidic chip

/* A SyringeGroups object Open includes all control syringes required to be open and Close object includes all control syringes
needed to control for various outputs*/

class Outputs{
  public:
    int duration;

    SyringeGroups Open;
    SyringeGroups Close;

    void assign_open();
    void assign_close();

    void open();
    void close();


};

#endif