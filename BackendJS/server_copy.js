"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3005;
const path = require('path');
const cors = require('cors');
//const db:any = require('./db');
//db.connect();
//const busRouter:any = require('./routes/busdata');
//const subwayRouter:any = require('./routes/subwaydata');
let corsOptions = {
    origin: ['http://localhost:3000/#/', 'http://localhost:3000', 'http://localhost:3005', 'http://34.168.80.42:3000', 'http://172.30.1.35:5000', 'http://localhost:5000'],
    credentials: true
};
app.use(cors(corsOptions));
app.use(express_1.default.static(path.join(__dirname, './Frontend/creative/build')));
//app.use('/bus', busRouter);
//app.use('/subway', subwayRouter);
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './Frontend/creative/build/index.html'));
});
app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});
app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});
/*
//1시간 주기로 MySQL Connection 유지용 쿼리 보내기
const mysql_Connect_Maintenance = setInterval(() => {
    const connection:any = db.return_connection();
    connection.query("SELECT 1");
}, 360000); //10분
*/ 
