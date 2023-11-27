import express, { Request, Response } from 'express'
const app = express();
const port:number = 3005;
import path from 'path';
import cors from 'cors';
import mysql from 'mysql';

import * as db from './db';
db.connect();

import busRouter from './routes/busdata';
import subwayRouter from './routes/subwaydata';
import navigationRouter from './routes/navigation';

let corsOptions: cors.CorsOptions = {
    origin: ['http://localhost:3000/#/', 'http://localhost:3000', 'http://localhost:3005', 'http://34.168.80.42:3000', 'http://172.30.1.35:5000', 'http://localhost:5000'],
    credentials: true
}

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '../../Backend/Frontend/creative/build')))

app.use('/bus', busRouter);
app.use('/subway', subwayRouter);
app.use('/navigation',navigationRouter);

app.get('/', (req:Request, res:Response) => {
    res.sendFile(path.join(__dirname, '../../Backend/Frontend/creative/build/index.html'));
})

app.get('/', (req:Request, res:Response) => {
    res.json({
        success: true,
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
})

//10분 주기로 MySQL Connection 유지용 쿼리 보내기
const mysql_Connect_Maintenance = setInterval(() => {
    const connection:mysql.connection = db.return_connection();
    connection.query("SELECT 1");
}, 360000); //10분
