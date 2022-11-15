const express = require('express');
const app = express();
const port = 3000;
const path = require('path');


const testRouter = require('./routes/test');
const busRouter = require('./routes/busdata');
const subwayRouter = require('./routes/subwaydata');

app.use(express.static(path.join(__dirname, './Frontend/creative/build')))

app.use('', testRouter);
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