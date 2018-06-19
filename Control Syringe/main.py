import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

class SyringeGroup:
    'Class to characterize syringe groups'
    def __init__(self, syringes):
        self.syringes = syringes

#Ask user to identify channels being used and convert elements of channel list to integers
channel_list = input('Enter which channels on the Raspberry Pi are going to be used for servo motors:  \n**Seperate channels with spaces**')
channel_list = [int(s) for s in channel_list.split(' ')]
servo_number = len(channel_list)

#Ask user to identify syringe groups that will work identically
syringe_groups = input('Enter syringe channel groups by placing a \'_\' between syringes within a group and a space between groups \n**Syringe groups can have one or more syringes in them** \nExample: 14_4 15_18 shows group 1 has channels 14 and 4 while the second group has channels 15 and 18')
syringe_groups = syringe_groups.split(' ')
group_num = len(syringe_groups)
print(syringe_groups)


#print(channel_list)
#print(servo_number)

#Setup GPIO pins used for the servo motors as GPIO OUTPUTS
#Start motors at 50 Hz
GPIO.setup(channel_list, GPIO.OUT)
servo_instances = []
for i in channel_list:
    servo_instances.append(GPIO.PWM(i,50))
print(servo_instances)
for i in range(servo_number):
    servo_instances[i].start(50)


#Code to control servos for control syringes
try:
    while True:
        servo_instances[0].ChangeDutyCycle(2.5)  # turn towards 90 degree
        time.sleep(1) # sleep 1 second
        print('hello1')
        servo_instances[0].ChangeDutyCycle(7.5)  # turn towards 0 degree
        time.sleep(1) # sleep 1 second
        print('hello2')
        servo_instances[0].ChangeDutyCycle(12.5) # turn towards 180 degree
        time.sleep(1) # sleep 1 second
        print('hello3')

        #servo_instances[1].ChangeDutyCycle(2.5)  # turn towards 90 degree
        #time.sleep(1) # sleep 1 second
        #print('hello4')
        #servo_instances[1].ChangeDutyCycle(7.5)  # turn towards 0 degree
        #time.sleep(1) # sleep 1 second
        #print('hello5')
        #servo_instances[1].ChangeDutyCycle(12.5) # turn towards 180 degree
        #time.sleep(1) # sleep 1 second
        #print('hello6')
except KeyboardInterrupt:
    servo_instances[0].stop()
    GPIO.cleanup()
