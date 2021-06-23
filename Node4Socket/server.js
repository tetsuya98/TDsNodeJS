const server = require('http').createServer();
const io = require('socket.io')(server);
const five = require("johnny-five");
var board = new five.Board({repl: false});
var lcd = null;
board.on("ready",()=>{
    lcd = new five.LCD({
        controller: "JHD1313M1"
    });
    lcd.useChar("heart");
    lcd.cursor(0,0).clear().print("hello :heart:");
    //ask();
})

io.on('connection', client => {
    client.on('event', data => { /* … */ });
    client.on('order',data=>{
        //io.broadcast("exec",{data})
        lcd.cursor(0,0).clear().print(`display: ${data.data}`);

    })
    client.on('disconnect', () => { /* … */ });
   });
server.listen(3000);