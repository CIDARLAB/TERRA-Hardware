#ifndef SyringeGroups_H
#define SyringeGroups_H

//Class to characterize the syringe groups by identifying what channels are within a group and functions to set their states
class SyringeGroups{
public:
    int pins[16];
    int pin_num;
    void off();
    void oneeighty();
    void on();
    void setServoPulse(int n, double pulse);
};

#endif
