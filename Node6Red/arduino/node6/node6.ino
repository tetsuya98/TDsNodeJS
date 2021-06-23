#include <Wire.h>

const int LGT = A0; //Light Sensor
const int SND = A1; //Sound Sensor
const int TMP = A2; //Temperature Sensor

const int R0 = 100000;
const int B = 4275;

int count;
int valueLGT;
int valueTMP;
int valueSND;
float light;
float temp;
float sound;
String valueNode = "rien";

void setup() 
{
    pinMode(LGT, INPUT);
    pinMode(TMP, INPUT);
    pinMode(SND, INPUT);
    
    count = 0;

    Serial.begin(9600);
}

void loop() 
{
   if (count < 30) {
       valueLGT = analogRead(LGT);
       valueTMP = analogRead(TMP);
       valueSND = analogRead(SND);
       count++;
       delay(1);
   } else {
       light = valueLGT * 5.0 / 1023.0;
       //Send light
       Serial.print("light:");
       Serial.println(light);

       temp = (1023.0 / valueTMP - 1.0) * R0;
       temp = 1.0 / (log(temp / R0) / B + 1 / 298.15) - 273.15;
       //Send temp
       Serial.print("temp:");
       Serial.println(temp);

       sound = (valueSND + 83.2073) / 7.003;
       //Send sound
       Serial.print("sound:");
       Serial.println(sound);
       
       count = 0;
   }
   
}
