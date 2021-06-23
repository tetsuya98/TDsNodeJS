var five = require("johnny-five");
const { Board, Sensor } = require("johnny-five");
const board = new Board();
board.repl = false;

var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

board.on("ready", function() {
  const PTM = new Sensor("A0"); //Potentiometre
  var lcd = new five.LCD({ //LCD Screen
    controller: "JHD1313M1"
  });
  lcd.bgColor('#3483eb');

  PTM.on("change", () => {
    const {value, raw} = PTM;
    lcd.cursor(0, 0).print(value);
  });
  

  function ask () {
    rl.question('Afficher dans LCD? \n', (str) => {
      rl.question('Emoji ? - heart - smile - \n', (emo) => {
        lcd.clear()
        lcd.useChar(emo);
        lcd.cursor(1, 0).print(str +":"+ emo + ":");
        ask();
      })
    });
  }
  ask();

});



