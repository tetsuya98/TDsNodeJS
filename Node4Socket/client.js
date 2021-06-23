var socket = require('socket.io-client')('http://localhost:3000');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.sdout
})

socket.on('connect', function () {/* connecté */ });
socket.on('event', function (data) { /* reception d’un message*/ });
socket.on('disconnect', function () { /* déconnecté*/ });

function EmitOrdre(ordre) {
    socket.emit("order", { data: ordre });
}
function ask() {
    rl.question('input', (line) => {
        EmitOrdre(line);
        ask();
    });
}
ask();