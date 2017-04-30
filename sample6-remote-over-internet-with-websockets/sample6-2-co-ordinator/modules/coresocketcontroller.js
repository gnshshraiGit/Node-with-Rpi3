"use strict";

var fs = require("fs");
var request = require('request');

//***

function coresocketcontroller(app, webserver, certObj) {
    var connectedPeers = {};
    this.LEDControllers;
    this.io = require('socket.io').listen(webserver,certObj);
    var that = this;
    this.attach = function (anotherServer) { 
        that.io.attach(anotherServer);
    };
    this.io.on('connection', function (socket) {

        socket.on("register", function (data) {
            socket.join(data.roomname);
            var newPeer = {};
            newPeer.socketID = socket.id;
            newPeer.peerData = data;
            connectedPeers[socket.id] = newPeer;
            console.log('Registered ' + socket.id + ' room: ' + data.roomname + ' role: ' + data.peerRole);
        });

        socket.on('picdata', function (data) {
            var clientCnts = that.io.sockets.adapter.rooms[data.roomname] ? that.io.sockets.adapter.rooms[data.roomname].length : 0;
            if (clientCnts > 1) {
                that.io.to(data.roomname).emit('broadcast', data);
            }
        });

        socket.on('disconnect', function () {
            if (connectedPeers[socket.id]) {
                var peerData = connectedPeers[socket.id].peerData;
                socket.leave(peerData.roomName);
                console.log('Disconnected ' + socket.id + ' room: ' + peerData.roomname + ' role: ' + peerData.peerRole);
                connectedPeers[socket.id] = undefined;
            }

        });

        socket.on('changeLedState', function (data) {
            var formatedTargetUrl = 'http://' + that.LEDControllers[data.appName].IP + ':' + that.LEDControllers[data.appName].port + '/' + data.LED + '/' + data.state;
            request(formatedTargetUrl, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    that.io.to(data.appName).emit('updateLedStatus', body);
                }
                else {
                    console.log('Failure: Error = ' + error);
                }
            });
        });
        socket.on('changeLedVariation', function (data) {
            var formatedTargetUrl = 'http://' + that.LEDControllers[data.appName].IP + ':' + that.LEDControllers[data.appName].port + '/variation/' + data.variation;
            request(formatedTargetUrl, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    that.io.to(data.appName).emit('updateLedStatus', body);
                }
                else {
                    console.log('Failure: Error = ' + error);
                }
            });
        });
        socket.on('setRGB', function (data) {
            var formatedTargetUrl = 'http://' + that.LEDControllers[data.appName].IP + ':' + that.LEDControllers[data.appName].port + '/setRGB?RGB=' + data.R+','+data.G+','+data.B;
            request(formatedTargetUrl, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    that.io.to(data.appName).emit('updateLedStatus', body);
                }
                else {
                    console.log('Failure: Error = ' + error);
                }
            });
        });
    });

    this.sendFile = function (path){
        var toinsert = fs.readFileSync(__dirname + "/toInstall.html", "utf8");
        var html = fs.readFileSync(path, "utf8");
        var index = html.indexOf("<head>") + 7;
        html = html.slice(0, index) + toinsert + html.slice(index)
        return html;
    }
}

module.exports = coresocketcontroller;