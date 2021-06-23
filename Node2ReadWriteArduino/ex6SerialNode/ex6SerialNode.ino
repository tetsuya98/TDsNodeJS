#include <Servo.h>
#include <rgb_lcd.h>
#include <Wire.h>

Servo myservo;
rgb_lcd lcd;

const int R0 = 100000;
const int B = 4275;

const int colorR = 255;
const int colorG = 255;
const int colorB = 0;

const byte DATA_MAX_SIZE = 32;
char data[DATA_MAX_SIZE];   // an array to store the received data

int count;

const int PTM = A0; //Rotary Angle Sensor (Potentiometre)

int valuePTM;
int valueSRV;
String valueNode = "rien";

void setup() {
  // put your setup code here, to run once:
  pinMode(PTM, INPUT);
  myservo.attach(3);

  lcd.begin(16, 2);
  lcd.setRGB(colorR, colorG, colorB);
    
  count = 0;

  Serial.begin(9600);
}

void loop() {
    // Valeur min du potentiometre
    if (valuePTM < 10)
    {
      valuePTM = 10;
    }
    // Valeur max du potentiometre
    if (valuePTM > 120)
    {
      valuePTM = 120;
    }
    
    // put your main code here, to run repeatedly:
    valueSRV = analogRead(PTM);
    valueSRV = map(valueSRV, 0, 1023, 10, 120);
    myservo.write(valueSRV);

    Serial.print("servo : ");
    Serial.println(valueSRV);

    //Serial.print("valueNode : ");
    //Serial.println(valueNode);
    
  if (Serial.available() > 0) {
    valueNode = Serial.readString();
    lcd.setCursor(0,0);
    lcd.print("Node : ");
    lcd.print(valueNode); 
  }
  
    
    //delay(1000);
}
