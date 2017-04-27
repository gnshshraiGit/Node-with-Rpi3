var https = require('https');
var http = require('http');
var request = require('request');
var express = require('express');
var fs = require('fs');
var camSock = require('./modules/coresocketcontroller');

var port = process.env.port || 1337;
var app = express();
var IPMaps = {};

var rDnsServer = 'http://rpirdns.azurewebsites.net/update'; 
var internetListeningPort = 25000;
var appName = 'trixie';
var formatedRDnsUrl = rDnsServer + '?app=' + appName + '&port=' + internetListeningPort;

setInterval(function () {
    request(formatedRDnsUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('Success: Data = ' + body);
        }
        else {
            console.log('Failure: Error = ' + error);
        }
    });
}, 1000 * 60 * 2);

app.use(express.static(__dirname + '/public'));



app.get('/', function (req, res) {
    file = "/public/html/reciever.html";
    file = __dirname + file;
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(camStreamer.sendFile(file, res), 'utf-8');
});

app.get('/update', function (req, res) {
    var appName = req.query["app"];
    var port = req.query["port"];
    IPMaps[appName] = {};
    IPMaps[appName].IP = getClientAddress(req);
    IPMaps[appName].port = port;
    camStreamer.LEDControllers = IPMaps;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(IPMaps[appName]));
});

app.get('/captureCam', function (req, res) {
    file = "/public/html/sender.html";
    file = __dirname + file;
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(camStreamer.sendFile(file, res), 'utf-8');
});

var options = {
    key: fs.readFileSync(__dirname + "/cert/server.key"),
    cert: fs.readFileSync(__dirname + "/cert/server.crt")
}

var httpServer = http.createServer(app).listen(port);
console.log("Listen to " + port);

var httpsServer = https.createServer(options, app).listen(1338);;
console.log("Listen to " + 1338);

var camStreamer = new camSock(app, httpsServer, options);
camStreamer.attach(httpServer);

var getClientAddress = function (req) {
    var ip = (req.headers['x-forwarded-for'] || '').split(',')[0]
        || req.connection.remoteAddress;
    if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7);
    }
    return ip;
};

