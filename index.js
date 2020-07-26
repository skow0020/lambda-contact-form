var express = require('express')
var app = express()

app.use(express.static('www'));

let PORT = process.env.PORT || 5000;

var server = app.listen(PORT, function () {
    console.log(`Express app listening on PORT ${PORT}`);
});

module.exports = server;