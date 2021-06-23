//API Read : TWKXKF47HJDVVHBL

//Thingspeak
var ThingSpeakClient = require('thingspeakclient');
var client = new ThingSpeakClient();

var yourReadKey = 'TWKXKF47HJDVVHBL';
var yourMqttKey = 'F67GOYSK57X0VXVP';
var channelID = 1417609;

//FS
var fs = require('fs');

//Mqtt
var mqtt = require('mqtt');

var options = {
    port: 1883,
    username: "user",
    password: yourMqttKey,
    clean: true
};
var client = mqtt.connect('mqtt://mqtt.thingspeak.com', options);

client.on('connect', function() { 
    console.log('connected');
    client.subscribe('channels/'+channelID+'/subscribe/json/'+yourReadKey, {qos:0}, function() {
        client.on('message', function(topic, message, packet) {
            console.log("Received '" + message + "' on '" + topic + "'");
            /*fs.writeFile("thingspeakMqtt.json", message, err => {
                if (err) {
                  console.error(err)
                  return
                }
              });*/
        });
    });
});

/*client.attachChannel(channelID, {readKey:yourReadKey}, callBackThingspeak);

client.getChannelFeeds(channelID);

function callBackThingspeak(err, resp)
{
    if (!err && resp > 0) {
        console.log('Successfully. response was: ' + resp);
    }
    else {
      console.log(err);
    }
}*/