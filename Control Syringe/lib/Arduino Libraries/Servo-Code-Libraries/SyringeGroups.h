#ifndef SyringeGroups_H
#define SyringeGroups_H

//Class to characterize the syringe groups by identifying what channels are within a group and functions to set their states
class SyringeGroups{
public:
    int pins[16];
    int pin_num;
    //State used to store position of servo motor to properly change states
    //state of 0 = origin
    //state of 1 = open
    //state of -1 = close
    int state;

    void neutral();
    void off();
    void on();
    void setServoPulse(int n, double pulse);
};

#endif
