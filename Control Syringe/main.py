import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

channel_number = input('Enter Number of Control Channels: ')
channel_number = int(channel_number)

channel_list = [0]*channel_number

channel_pins = input('Enter Which Channels are going to be used for servo motors:  \n**Seperate channels with spaces**')
channel_pins = channel_pins.split(' ')
for s in channel_pin
    int(s)
print(channel_pins)
print(type(channel_pins[2]))




GPIO.setup(14, GPIO.OUT)

p = GPIO.PWM(14, 50)

p.start(7.5)


try:
    while True:
        p.ChangeDutyCycle(7.5)  # turn towards 90 degree
        time.sleep(1) # sleep 1 second
        p.ChangeDutyCycle(2.5)  # turn towards 0 degree
        time.sleep(1) # sleep 1 second
        p.ChangeDutyCycle(12.5) # turn towards 180 degree
        time.sleep(1) # sleep 1 second
except KeyboardInterrupt:
    p.stop()
    GPIO.cleanup()
