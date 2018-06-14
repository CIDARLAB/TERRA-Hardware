import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)

servo = 4

GPIO.setup(servo, GPIO.OUT)

p = GPIO.PWM(servo, 50)

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
