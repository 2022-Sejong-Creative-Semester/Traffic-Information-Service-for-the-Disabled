const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mysql = require('mysql');
const SQL_info = require('./Key/SQL_info.json')

const conn = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '11111111',
    database: 'interface_chatbot'
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


app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
})