// Arduino Sketch

#include <Arduino.h>
#include <Stepper.h>

const int stepsPerRevolution = 2048;
Stepper myStepper = Stepper(stepsPerRevolution, 10, 11, 12, 13);

void spin()
{
  myStepper.setSpeed(8);
  myStepper.step(stepsPerRevolution);
}

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  // Inform the bot we're ready for another spin
  // this is spammed until we receive a spin command
  Serial.write('1');

  // read serial and spin if necessary
  if (Serial.available() > 0)
  {
    char nextByte = Serial.read();
    if (nextByte == '1')
    {
      spin();
    }
  }
}