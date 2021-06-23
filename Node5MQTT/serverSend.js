var mqtt = require('mqtt');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.sdout
});

var options = {
    port: 8883,
};
var client = mqtt.connect('mqtts://mqtt.u-picardie.fr', options);

client.on('connect', function() { 
    console.log('connected');
    function ask() {
        rl.question('Message :', (line) => {
            client.publish('m2miage/capteur/1/data', String(line), function() {
                console.log("Pushed: " + line);
            });
            ask();
        });
    }
    ask();

  });