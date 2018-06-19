import time
import sys
import RPi.GPIO as GPIO

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
