//Arduino
var Serial = require('serialport/lib')
var sp = new Serial("/dev/cu.usbmodem141101") //Arduino connect port
const Readline = Serial.parsers.Readline
const parser = new Readline('\n')
sp.pipe(parser)

//MQTT
var mqtt = require('mqtt');
var options = {
    port: 8883,
    username: "josselin.abel@etud.u-picardie.fr",
    password: "a21601636",
    clean: true
};
var client = mqtt.connect('mqtts://mqtt.u-picardie.fr', options);

//Variables
var sound = "0"; var light = "0"; var temp = "0"; 
var flag = false;

//Publish options mqtt
var pubOptions = {
    retain: true,
    qos: 1
};

//Connect to mqtt client
client.on('connect', function() { 
    flag = true;
    console.log('connected : '+flag);
    client.publish('m2miage/jos/a21601636/statut', "online", pubOptions, function() {
        console.log('Pushed : online');
    });
});

//Disconnect from mqtt client
client.on('close', function(){
    flag = false;
    console.log("connection closed")
    client.publish('m2miage/jos/a21601636/statut', "offline", pubOptions, function() {
        console.log('Pushed : offline');
    });
});

//Read arduino series port
sp.on("open", function () {
    parser.on('data', function(data) {
        update(data);
    })
})

//Publish Arduino Values
setInterval(
    function publish() {
        console.log([light, sound, temp])
        client.publish('m2miage/jos/a21601636/lum', String(light), function() {
            console.log("Pushed: " + light);
        });
        client.publish('m2miage/jos/a21601636/sound', String(sound), function() {
           console.log("Pushed: " + sound);
        });
        client.publish('m2miage/jos/a21601636/temp', String(temp), function() {
            console.log("Pushed: " + temp);
        });
    },
    3000
)

//Update Arduino Values
function update(data) {
    splitData = data.split(':');
    if (splitData[0] == 'sound') {
        sound = splitData[1];
    }
    if (splitData[0] == 'light') {
        light = splitData[1];
    }
    if (splitData[0] == 'temp') {
        temp = splitData[1];
    }
}
