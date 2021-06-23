# Exercie Node MQTT

- npm install mqtt
- npm install readline
- brew install mosquitto
- MQTTDash (Android), EasyMQTT (IOS)

Utilisation de MQTT 

- Host : mqtt.u-picardie.fr
- Port : 8883

- mosquitto_sub -h mqtt.u-picardie.fr -p 8883 -t topic/capteur/1/statut
- mosquitto_sub -h mqtt.u-picardie.fr -p 8883 -t topic/capteur/1/data
- mosquitto_pub -h mqtt.u-picardie.fr -p 8883 -t topic/capteur/1/statut -m message --retain
- mosquitto_pub -h mqtt.u-picardie.fr -p 8883 -t topic/capteur/1/data -m message 