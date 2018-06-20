import time
import sys
import RPi.GPIO as GPIO

#going through 8 steps steps
def step_8(p):
  if p==0:
  GPIO.output(5,0)
  GPIO.output(6,0)
  GPIO.output(12,0)
  GPIO.output(13,0)

  if p==1:
  GPIO.output(5,1)
  GPIO.output(6,0)
  GPIO.output(12,0)
  GPIO.output(13,0)

  if p==2:
  GPIO.output(5,1)
  GPIO.output(6,1)
  GPIO.output(12,0)
  GPIO.output(13,0)

  if p==3:
  GPIO.output(5,0)
  GPIO.output(6,1)
  GPIO.output(12,0)
  GPIO.output(13,0)
  if p==4:
  GPIO.output(5,0)
  GPIO.output(6,1)
  GPIO.output(12,1)
  GPIO.output(13,0)
  if p==5:
  GPIO.output(5,0)
  GPIO.output(6,0)
  GPIO.output(12,1)
  GPIO.output(13,0)
  if p==6:
  GPIO.output(5,0)
  GPIO.output(6,0)
  GPIO.output(12,1)
  GPIO.output(13,1)
 if p==7:
  GPIO.output(5,0)
  GPIO.output(6,0)
  GPIO.output(12,0)
  GPIO.output(13,1)
 if p==8:
  GPIO.output(5,1)
  GPIO.output(6,0)
  GPIO.output(12,0)
  GPIO.output(13,1)

# half step control
def steps_8(value):
 print value
 global pas
 if(value<0):
  for i in range (0,abs(value)):
    step_8(pas)
    time.sleep(0.005)
    pas+=1
    if(pas>=9):
      pas=1;
 else:
  for i in range (0,abs(value)):
    step_8(pas)
    time.sleep(0.005)
    if(pas==1):
      pas=9;
    pas-=1
 step_8(0)

# full step control

def steps_32(value):
    print value
    global pas
    if(value<0)
        for i in range (0, abs(value))
