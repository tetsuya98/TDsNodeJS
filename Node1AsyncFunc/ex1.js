function sayTimeout() {
    console.log('timeout');
}

function sayInterval() {
    console.log('interval');
}

function sayImmediate() {
    console.log('immediate');
}

var stdin = process.openStdin(); 
stdin.on('data', function(chunk) { console.log("STDIN :" + chunk); });


setTimeout(sayTimeout, 300);
setInterval(sayInterval, 2000);
setImmediate(sayImmediate);