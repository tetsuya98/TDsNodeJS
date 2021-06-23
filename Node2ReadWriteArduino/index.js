console.log("Intitialisation Arduino 1")
var Serial = require('serialport')
var sp = new Serial("/dev/cu.usbmodem141101")
const Readline = Serial.parsers.Readline
const parser = new Readline('\n')
sp.pipe(parser)

sp.on("open", function () {
    console.log('open /dev/cu...')

    parser.on('data', function(data) {
        console.log(' data : ' + data);
        //sp.write("data vers arduino\n")

        
    })

    var stdin = process.openStdin(); 
    stdin.on('data', function(chunk) { sp.write(chunk) });
})
