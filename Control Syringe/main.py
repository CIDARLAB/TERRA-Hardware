import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

channel_list = input('Enter which channels on the Raspberry Pi are going to be used for servo motors:  \n**Seperate channels with spaces**')
#servo_instances = ['p'+ s for s in channel_list]
channel_list = [int(s) for s in channel_list.split(' ')]
servo_number = len(channel_list)
print(channel_list)
print(servo_number)

GPIO.setup(channel_list, GPIO.OUT)

servo_instances = []
for i in channel_list:
    servo_instances.append(GPIO.PWM(i,50))
print(servo_instances)


for i in range(servo_number):
    servo_instances[i].start(50)



try:
    while True:
        servo_instances[0].ChangeDutyCycle(7.5)  # turn towards 90 degree
        time.sleep(1) # sleep 1 second
        servo_instances[0].ChangeDutyCycle(2.5)  # turn towards 0 degree
        time.sleep(1) # sleep 1 second
        servo_instances[0].ChangeDutyCycle(12.5) # turn towards 180 degree
        time.sleep(1) # sleep 1 second

        servo_instances[1].ChangeDutyCycle(7.5)  # turn towards 90 degree
        time.sleep(1) # sleep 1 second
        print(hello)
        servo_instances[1].ChangeDutyCycle(2.5)  # turn towards 0 degree
        time.sleep(1) # sleep 1 second
        print(hello)
        servo_instances[1].ChangeDutyCycle(12.5) # turn towards 180 degree
        time.sleep(1) # sleep 1 second
        print(hello)
except KeyboardInterrupt:
    servo_instances[0].stop()
    GPIO.cleanup()
