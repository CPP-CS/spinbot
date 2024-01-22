// Arduino Sketch

#include <Arduino.h>

const int stepPin = 5;
const int dirPin = 6;
const int enPin = 7;
const int stepPin1 = 8;
const int dirPin2 = 9;
const int enPin3 = 10;

void setup()
{
  Serial.begin(9600); // Set the baud rate to match the Python script

  pinMode(stepPin, OUTPUT);
  pinMode(dirPin, OUTPUT);
  pinMode(enPin, OUTPUT);
  digitalWrite(enPin, LOW);

  pinMode(stepPin1, OUTPUT);
  pinMode(dirPin2, OUTPUT);
  pinMode(enPin3, OUTPUT);
  digitalWrite(enPin3, LOW);
}

void loop()
{
  char responseChar = 'Y'; // Response, available
  Serial.println(responseChar);

  if (Serial.available() > 0)
  {
    // Read a character from the serial port
    char receivedChar = Serial.read();

    if (receivedChar == 'a')
    {
      char responseChar = 'N'; // Response, not available, since the motors are in action
      Serial.println(responseChar);

      // Motor Operation for the first motor
      digitalWrite(dirPin, HIGH); // Set direction for the first motor
      for (int x = 0; x < 800; x++)
      {
        digitalWrite(stepPin, HIGH);
        delayMicroseconds(1050);
        digitalWrite(stepPin, LOW);
        delayMicroseconds(1800);
      }

      // Motor Operation for the second motor
      digitalWrite(dirPin2, HIGH); // Set direction for the second motor
      for (int x = 0; x < 800; x++)
      {
        digitalWrite(stepPin1, HIGH);
        delayMicroseconds(1050);
        digitalWrite(stepPin1, LOW);
        delayMicroseconds(1800);
      }

      // Wait for a short delay
      delay(1000);
    }
  }
}