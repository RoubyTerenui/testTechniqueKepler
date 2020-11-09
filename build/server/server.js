"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var Server = /** @class */ (function () {
    function Server(port) {
        this.port = port;
    }
    Server.prototype.start = function () {
        var _this = this;
        var app = express();
        app.get('/', function (req, res) {
            res.send('Bienvenue sur le serveur');
        });
        app.listen(this.port, function () {
            console.log("serveur démarré sur le port:" + _this.port);
        });
    };
    return Server;
}());
exports.default = Server;
