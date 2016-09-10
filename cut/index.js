'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authentication = exports.responses = exports.HTTP = exports.RABBIT = exports.LRU = exports.router = exports.server = undefined;

var _cut = require('./middleware/cut.express');

var cut = _interopRequireWildcard(_cut);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var lru = require('./components/cache/lru/cut.components.cache.lru.js'); /**
                                                                          * Created by prashun on 6/10/16.
                                                                          */

var http = require('./components/http/cut.components.http.js');
var rabbit = require('./components/rabbit/cut.components.rabbitmq.js');
var response = require('./components/responses/cut.components.responses.js');
var authentications = require('./middleware/security/cut.security.utils.js');

var server = exports.server = cut.app;

// ROUTERS
var router = exports.router = cut.router;

// MODULES
var LRU = exports.LRU = lru;
var RABBIT = exports.RABBIT = rabbit;

// HTTP
var HTTP = exports.HTTP = http;

// UTILS
var responses = exports.responses = response;
var authentication = exports.authentication = authentications;