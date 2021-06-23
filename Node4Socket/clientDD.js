var socket = require('socket.io-client')('http://daviddurand.info:32768');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.sdout
})

socket.on('info', function (data) { console.log(data) });

function EmitInit(nom) {
    socket.emit("init", { name: nom });
    console.log('Name :' + nom);
}

function EmitMsg(msg) {
    socket.emit("message", { data: msg });
    console.log('data :' + msg);
}

EmitInit("Josselin");
function ask() {
    rl.question('Message :', (line) => {
        EmitMsg(line);
        ask();
    });
}
ask();


