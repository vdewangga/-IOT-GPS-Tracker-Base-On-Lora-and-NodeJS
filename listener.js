const io = require('socket.io-client');
var socket = io.connect('http://localhost:3000');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));

function doStuff(){
    // Read the port data
    port.on("open", () => {
        console.log('serial port open');
    });
    parser.on('data', data =>{
        let obj = {}
        let newData = data.split(",")
        for(n of newData){
            let dataMentah = n.split(":");
            obj[dataMentah[0]] = dataMentah[1]
        }
        socket.emit("position", obj);
    });
}

doStuff();