const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
//const mysql = require('mysql');
//const SQL_info = require('./Key/SQL_info.json')

const busRouter = require('./routes/busdata');
const subwayRouter = require('./routes/subwaydata');

/*
const conn = {
    host: SQL_info.host,
    port: SQL_info.port,
    user: SQL_info.user,
    password: SQL_info.password,
    database: SQL_info.database
};

let connection = mysql.createConnection(conn); // DB 目池记 积己
connection.connect();   // DB 立加

let sql = "DELETE FROM member where name = 'test';";

connection.query(sql, function (err, results, fields) {
    if (err) {
        console.log(err);
    }
    console.log(results);
});


*/

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