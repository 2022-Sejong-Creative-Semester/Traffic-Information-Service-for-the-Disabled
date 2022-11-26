const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mysql = require('mysql');



app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
})