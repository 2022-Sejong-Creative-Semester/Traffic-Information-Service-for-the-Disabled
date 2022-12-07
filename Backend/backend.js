const express = require('express');
const app = express();
const port = 3005;
const path = require('path');
const cors = require('cors');

const busRouter = require('./routes/busdata');
const subwayRouter = require('./routes/subwaydata');


const conn = {
    host: SQL_info.host,
    port: SQL_info.port,
    user: SQL_info.user,
    password: SQL_info.password,
    database: SQL_info.database
};

let connection = mysql.createConnection(conn);  // DB 目池记 积己
connection.connect();   // DB 立加


/*
let sql = "DELETE FROM member where name = 'test';";

connection.query(sql, function (err, results, fields) {
    if (err) {
        console.log(err);
    }
    console.log(results);
});
*/

let corsOptions = {
    origin: ['http://localhost:3000', 'http://172.30.1.35:5000', 'http://game.jerrykang.com', 'http://admin.jerrykang.com', 'http://localhost:5000'],
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, './Frontend/creative/build')))

app.use('/bus', busRouter);
app.use('/subway', subwayRouter);


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './Frontend/creative/build/index.html'));
})


app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
})