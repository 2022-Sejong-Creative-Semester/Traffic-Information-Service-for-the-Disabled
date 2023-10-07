const express = require('express');
const app = express();
const port = 3005;
const path = require('path');
const cors = require('cors')

const db = require('./db');
db.connect();

const busRouter = require('./routes/busdata');
const subwayRouter = require('./routes/subwaydata');

let corsOptions = {
    origin: ['http://localhost:3000/#/', 'http://localhost:3000', 'http://localhost:3005', 'http://34.168.80.42:3000', 'http://172.30.1.35:5000', 'http://localhost:5000'],
    credentials: true
}



app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, './Frontend/creative/build')))

app.use('/bus', busRouter);
app.use('/subway', subwayRouter);

/*
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './Frontend/creative/build/index.html'));
})
*/

app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
})

//1시간 주기로 MySQL Connection 유지용 쿼리 보내기
const mysql_Connect_Maintenance = setInterval(() => {
    const connection = db.return_connection();
    connection.query("SELECT 1");
}, 360000); //10분