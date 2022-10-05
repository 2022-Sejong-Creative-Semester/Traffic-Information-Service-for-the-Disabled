const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const cors = require('cors');

const testRouter = require('./routes/test');
const trafficRouter = require('./routes/trafficdata');

//app.use(express.static(path.join(__dirname, '../my-app/build')))

app.use('', testRouter);
app.use('', trafficRouter);

/*
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
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