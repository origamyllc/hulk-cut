'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.get = get;
exports.del = del;
exports.post = post;
exports.put = put;
// TODO: convert to https
var http = require('http');

function get(options, callback) {

    var x = http.request(options, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });

        response.on('end', function () {
            var parsed = JSON.parse(body);
            return callback(parsed);
        });

        response.on('error', function (err) {
            return callback(err);
        });
    });

    x.end();
}

function del(options, callback) {

    var x = http.request(options, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });

        response.on('end', function () {
            var parsed = JSON.parse(body);
            return callback(parsed);
        });

        response.on('error', function (err) {
            return callback(err);
        });
    });

    x.end();
}

function post(options, body, callback) {

    var postData = JSON.stringify(body);
    var dataChunk = "";

    var req = http.request(options, function (res) {

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            dataChunk = chunk;
            console.log(dataChunk);
        });
        res.on('end', function () {

            if (dataChunk === '{"message":"authorized"}') {
                return callback(res.headers["authorization"]);
            }

            if (dataChunk === "OK") {
                return callback(JSON.stringify(body));
            }

            if (JSON.parse(dataChunk).status === 500) {
                return callback(JSON.stringify({ "message": JSON.parse(dataChunk) }));
            }

            if (res.statusCode === 401) {
                return callback(JSON.stringify({ "message": "Unauthorized Access" }));
            }

            return callback(postData);
        });
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    req.write(postData);
    req.end();
}

function put(options, body, callback) {

    var postData = JSON.stringify(body);

    var req = http.request(options, function (res) {

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
        res.on('end', function () {
            console.log('No more data in response.');
            return callback(postData);
        });
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    // write data to request body
    req.write(postData);
    req.end();
}