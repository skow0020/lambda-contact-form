// var http = require('http');
// var fs = require('fs');

// const PORT=8080; 

// fs.readFile('./contact-form-lambda.html', function (err, html) {

//     if (err) throw err;    

//     http.createServer(function(request, response) {  
//         response.writeHeader(200, {"Content-Type": "text/html"});  
//         response.write(html);  
//         response.end();  
//     }).listen(PORT);
// });

var express = require('express')
var app = express()

app.use(express.static('www'));

var server = app.listen(process.env.PORT || 5000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Express app listening at http://%s:%s', host, port)

})