
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createExchange = createExchange;
exports.publishToExchange = publishToExchange;
exports.createQueue = createQueue;
exports.bindToExchange = bindToExchange;
exports.subscribeToQueue = subscribeToQueue;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _constants = require('../../constants/constants');

var CONSTANTS = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var amqp = require('amqp');
var exchange = null;
var queue = null;
var queues = {};


var connection = amqp.createConnection(CONSTANTS.RABBIT_SERVER_CONF);

function createExchange(name, options) {
    return new _bluebird2.default(function (resolve) {
        connection.on('ready', function () {
            exchange = connection.exchange(name, options, function (exchange) {
                resolve(exchange.name);
            });
        });
    });
}

function publishToExchange(routingKey, message) {
    return new _bluebird2.default(function (resolve) {
        exchange.publish(routingKey, message);
        resolve({ routingKey: routingKey, message: message });
    });
}

function createQueue(name) {
    return new _bluebird2.default(function (resolve) {
        connection.on('ready', function () {
            queue = connection.queue(name, function (q) {});
            queues[name] = queue;
            resolve(true);
        });
    });
}

function bindToExchange(exchange, routingKey) {
    return new _bluebird2.default(function (resolve) {
        connection.on('ready', function () {
            queue.bind(exchange, routingKey);
            resolve(true);
        });
    });
}

function subscribeToQueue(name) {
    return new _bluebird2.default(function (resolve) {
        queues[name].subscribe(function (message) {
            resolve(message);
        });
    });
}