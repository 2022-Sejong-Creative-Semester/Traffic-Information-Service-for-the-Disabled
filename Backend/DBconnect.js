const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mysql = require('mysql');

const conn = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '11111111',
    database: 'interface_chatbot'
};

let connection = mysql.createConnection(conn); // DB 目池记 积己
connection.connect();   // DB 立加

app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
})