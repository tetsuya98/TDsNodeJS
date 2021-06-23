# Exercie Node RED

- npm install mqtt
- npm install readline
- npm install serialport
- npm install -g --unsafe-perm node-red
- brew install mosquitto
- Televerser node6.ino
 
Mosquitto cmd :
- mosquitto_sub -h mqtt.u-picardie.fr -p 8883 -u josselin.abel@etud.picardie.fr -P a21601636 -t m2miage/jos/a21601636/statut
- mosquitto_pub -h mqtt.u-picardie.fr -p 8883 -u josselin.abel@etud.picardie.fr -P a21601636 -t m2miage/jos/a21601636/statut -m message