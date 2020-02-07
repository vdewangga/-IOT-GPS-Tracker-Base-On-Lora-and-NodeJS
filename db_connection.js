require('dotenv').config()
const express = require('express')
const { MongoClient } = require('mongodb')
const cors = require('cors')

app = express()
app.use(express.json())
port = process.env.PORT
app.use(cors())

app.get('/pinpoint', (req, res) => {
    MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
        if(err)throw err;
        let dbo = db.db('Lora_Position');
        var mysort = { created_at : -1 };
        dbo.collection("postion").find().sort(mysort).limit(1).toArray(function(err, result) {
            if (err) throw err;
            res.status(200).json(result)
            db.close();
        });
    })
})

app.listen(port, () => {console.log(`app running on port ${process.env.PORT}`)})