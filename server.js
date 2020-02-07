const io = require('socket.io')(3000);
const { MongoClient } = require('mongodb');

const usersConnect = {};
io.on('connection', socket => {
    // listin on disconnect
    socket.on('disconnect', () => {
        socket.broadcast.emit('disconnected', usersConnect[socket.id])
        delete usersConnect[socket.id]
    })

    socket.on('position', loc => {
        MongoClient.connect( 'mongodb://localhost:27017/', async function(err, db) {
            if(err) throw err;
            let dbo = db.db('Lora_Position');
            let newData = {
                created_at : Math.floor((new Date).getTime()/1000),
                ...loc,
            }
            dbo.collection("postion").insertOne(newData, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
        socket.broadcast.emit('liveLocation', loc)
    })
});