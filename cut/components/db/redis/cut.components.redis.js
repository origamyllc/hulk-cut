'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.get = get;
exports.set = set;
exports.hset = hset;
exports.hget = hget;
exports.del = del;
exports.clear = clear;
exports.size = size;
exports.publish = publish;
exports.subscribe = subscribe;

var _constants = require('../../../../constants/constants');

var CONSTANTS = _interopRequireWildcard(_constants);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var redis = require("redis");

var client = redis.createClient(CONSTANTS.REDIS_SERVER_CONF);

function get(key) {
    return new _bluebird2.default(function (resolve) {
        client.get(key, function (err, reply) {
            resolve(reply);
        });
    });
}

function set(key, value) {
    return new _bluebird2.default(function (resolve) {
        client.set(key, value);
        resolve("ok");
    });
}

/*
 * client.hset([ 'tests', 'slurpee', 'orange' ]);
 *
 */

function hset(string) {
    return new _bluebird2.default(function (resolve) {
        var set = string.split(",");
        client.hset(set, redis.print);
        resolve(set);
    });
}

function hget(key) {
    return new _bluebird2.default(function (resolve) {
        client.hkeys(key, function (err, reply) {
            resolve(reply);
        });
    });
}

function del(key) {
    return new _bluebird2.default(function (resolve) {
        client.del(key);
        resolve(key);
    });
}

function clear() {
    return new _bluebird2.default(function (resolve) {
        client.flushdb();
        resolve(true);
    });
}

function size() {
    return new _bluebird2.default(function (resolve) {
        resolve(client.dbsize());
    });
}

function publish(channel, message) {
    return new _bluebird2.default(function (resolve) {
        client.on("message", function (channel, message) {
            resolve({ channel: channel, message: message });
        });
    });
}
function subscribe() {
    return new _bluebird2.default(function (resolve) {
        client.publish(channel, message, function () {
            resolve({ channel: channel, message: message });
        });
    });
}