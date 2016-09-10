'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.settings = exports.CONTENT_TYPE_XML = exports.CONTENT_TYPE_JSON = exports.PUT = exports.DELETE = exports.GET = exports.POST = exports.REDIS_PATH = exports.AUHTENTICATION_PATH = exports.LRU_OPTIONS = exports.CLAIM_PATH = exports.ROLE_PATH = exports.TOKEN_PATH = exports.USER_PATH = exports.OAUTH_PATH = exports.BACKEND_HOST = exports.MICROSERVICES_HOST = exports.ORCHESTRATOR_HOST = exports.BACKEND_PORT = exports.ORCHESTRATOR_PORT = exports.MICROSERVICES_PORT = exports.ACCESS_KEY = undefined;

var _dev = require('../config/env/dev.js');

var _integration = require('../config/env/integration.js');

var _prod = require('../config/env/prod.js');

var _qa = require('../config/env/qa.js');

var _stress = require('../config/env/stress.js');

var config = _dev.devConfig;

if (process.env.NODE_ENV === 'development') {
    config = _dev.devConfig;
}

if (process.env.NODE_ENV === 'integration') {
    config = _integration.integrationConfig;
}

if (process.env.NODE_ENV === 'production') {
    config = _prod.productionConfig;
}

if (process.env.NODE_ENV === 'qa') {
    config = _qa.qaConfig;
}

if (process.env.NODE_ENV === 'stress') {
    config = _stress.stressConfig;
}

var ACCESS_KEY = exports.ACCESS_KEY = config.microservices.accsesskey;

var MICROSERVICES_PORT = exports.MICROSERVICES_PORT = config.microservices.port;
var ORCHESTRATOR_PORT = exports.ORCHESTRATOR_PORT = config.orchestrator.port;
var BACKEND_PORT = exports.BACKEND_PORT = config.backend.port;

var ORCHESTRATOR_HOST = exports.ORCHESTRATOR_HOST = config.orchestrator.host;
var MICROSERVICES_HOST = exports.MICROSERVICES_HOST = config.microservices.host;
var BACKEND_HOST = exports.BACKEND_HOST = config.backend.host;

var OAUTH_PATH = exports.OAUTH_PATH = config.microservices.paths.oauth;
var USER_PATH = exports.USER_PATH = config.microservices.paths.user;
var TOKEN_PATH = exports.TOKEN_PATH = config.microservices.paths.token;
var ROLE_PATH = exports.ROLE_PATH = config.microservices.paths.role;
var CLAIM_PATH = exports.CLAIM_PATH = config.microservices.paths.claim;

var LRU_OPTIONS = exports.LRU_OPTIONS = config.lru.options;
var AUHTENTICATION_PATH = exports.AUHTENTICATION_PATH = config.orchestrator.paths.authenticate;
var REDIS_PATH = exports.REDIS_PATH = config.backend.paths.redis;

var POST = exports.POST = 'POST';
var GET = exports.GET = 'GET';
var DELETE = exports.DELETE = 'DELETE';
var PUT = exports.PUT = 'PUT';

var CONTENT_TYPE_JSON = exports.CONTENT_TYPE_JSON = 'application/json';
var CONTENT_TYPE_XML = exports.CONTENT_TYPE_XML = 'application/x-www-form-urlencoded';

var settings = exports.settings = config;