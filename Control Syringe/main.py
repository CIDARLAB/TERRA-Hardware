import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

channel_list = input('Enter Which Channels are going to be used for servo motors:  \n**Seperate channels with spaces**')
channel_list = [int(s) for s in channel_list.split(' ')]


GPIO.setup(14, GPIO.OUT)
GPIO.setup(4, GPIO.OUT)

p1 = GPIO.PWM(14, 50)
p2 = GPIO.PWM(4, 50)

p1.start(7.5)
p2.start(7.5)


try:
    while True:
        p1.ChangeDutyCycle(7.5)  # turn towards 90 degree
        time.sleep(1) # sleep 1 second
        p1.ChangeDutyCycle(2.5)  # turn towards 0 degree
        time.sleep(1) # sleep 1 second
        p1.ChangeDutyCycle(12.5) # turn towards 180 degree
        time.sleep(1) # sleep 1 second

        p2.ChangeDutyCycle(7.5)  # turn towards 90 degree
        time.sleep(1) # sleep 1 second
        p2.ChangeDutyCycle(2.5)  # turn towards 0 degree
        time.sleep(1) # sleep 1 second
        p2.ChangeDutyCycle(12.5) # turn towards 180 degree
        time.sleep(1) # sleep 1 second
except KeyboardInterrupt:
    p1.stop()
    p2.stop()
    GPIO.cleanup()
