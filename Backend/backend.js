const express = require('express');
const app = express();
const port = 3005;
const path = require('path');
const cors = require('cors');

const testRouter = require('./routes/test');
const busRouter = require('./routes/busdata');
const subwayRouter = require('./routes/subwaydata');

let corsOptions = {
    origin: ['http://172.30.1.35:5000', 'http://game.jerrykang.com', 'http://admin.jerrykang.com', 'http://localhost:5000'],
    credentials: true
}

app.use(cors(corsOptions));

//app.use(express.static(path.join(__dirname, './Frontend/creative/build')))

app.use('', testRouter);
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