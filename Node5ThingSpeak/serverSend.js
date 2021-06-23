//Thingspeak
var ThingSpeakClient = require('thingspeakclient');
var clientTS = new ThingSpeakClient();

var yourWriteKey = '508LXAUZC2J0E28A';
var yourMqttKey = 'F67GOYSK57X0VXVP';
var channelID = 1417609;

clientTS.attachChannel(channelID, { writeKey:yourWriteKey}, callBackThingspeak);

function callBackThingspeak(err, resp)
{
    if (!err && resp > 0) {
        console.log('Successfully. response was: ' + resp);
    }
    else {
        console.log("Erreur callBack : " + err);
    }
}

//Arduino
var Serial = require('serialport/lib')
var sp = new Serial("/dev/cu.usbmodem141301")
const Readline = Serial.parsers.Readline
const parser = new Readline('\n')
sp.pipe(parser)

//MQTT
var mqtt = require('mqtt');
var options = {
    port: 1883,
    username: "user",
    password: yourMqttKey,
    clean: true
};
var clientMQTT = mqtt.connect('mqtt://mqtt.thingspeak.com', options);

//Publish
var count = 0;
var sound = "0"; var light = "0"; var temp = "0";
var flag = false;

sp.on("open", function () {
    parser.on('data', function(data) {
        publishData = update(data);
        if (count >= 3) { 
            //publishTS();
            count = 3;
        }
        if (flag) {
            publishMQTT();
        }
        
    })
})

clientMQTT.on('connect', function() { 
    console.log('connected');
    flag = true;
});

//Update values
function update(data) {
    splitData = data.split(':');
    if (splitData[0] == 'sound') {
        sound = splitData[1];
        count = count + 1;
    }
    if (splitData[0] == 'light') {
        light = splitData[1];
        count = count + 1;
    }
    if (splitData[0] == 'temp') {
        temp = splitData[1];
        count = count + 1;
    }
}

//Publish MQTT
function publishMQTT() {
    console.log([light, temp, sound]);
    clientMQTT.publish('channels/'+channelID+'/fields/field1/'+yourWriteKey, {qos:0}, String(light), function() {
        console.log("Pushed: " + light);
    });
    clientMQTT.publish('channels/'+channelID+'/fields/field2/'+yourWriteKey, {qos:0}, String(temp), function() {
        console.log("Pushed: " + temp);
    });
    clientMQTT.publish('channels/'+channelID+'/fields/field3/'+yourWriteKey, {qos:0}, String(sound), function() {
        console.log("Pushed: " + sound);
    });
}

//Publish Thingspeak Client
function publishTS() {
    console.log([light, temp, sound]);
    clientTS.updateChannel(channelID, {field1: light, field2: temp, field3: sound}, function(err, resp) {
        if (!err && resp > 0) {
            console.log('update successfully. Entry number was: ' + resp);
        }
        else {
            console.log("Erreur Update : " + err);
        }
    });
}




