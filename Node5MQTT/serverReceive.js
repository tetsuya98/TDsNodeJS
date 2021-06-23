var mqtt = require('mqtt');

var options = {
    port: 8883,
};
var client = mqtt.connect('mqtts://mqtt.u-picardie.fr', options);

client.on('connect', function() { 
    console.log('connected');
    client.subscribe('m2miage/jos/a21601636/data', function() {
        client.on('message', function(topic, message, packet) {
            console.log("Received '" + message + "' on '" + topic + "'");
        });
    });
});