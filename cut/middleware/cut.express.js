'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.http_server = exports.router = exports.app = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
//import * as Primus from 'socketio';


var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var bodyParser = _interopRequireWildcard(_bodyParser);

var _errorhandler = require('errorhandler');

var errorHandler = _interopRequireWildcard(_errorhandler);

var _serveFavicon = require('serve-favicon');

var favicon = _interopRequireWildcard(_serveFavicon);

var _cookieSession = require('cookie-session');

var cookieSession = _interopRequireWildcard(_cookieSession);

var _expressUseragent = require('express-useragent');

var useragent = _interopRequireWildcard(_expressUseragent);

var _bluebird = require('bluebird');

var Promise = _interopRequireWildcard(_bluebird);

var _http = require('http');

var http = _interopRequireWildcard(_http);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _constants = require('../../constants/constants.js');

var _cutSecurityPassport = require('./security/cut.security.passport.js');

var _boom = require('boom');

var Boom = _interopRequireWildcard(_boom);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var morgan = require('morgan');
var methodOverride = require('method-override');
var app = exports.app = (0, _express2.default)();
var port = _constants.settings.orchestrator.port;
var router = exports.router = _express2.default.Router();
var grunth = require('grunth');

app.use((0, _cookieParser2.default)());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(_express2.default.static(__dirname + '/public'));
app.use(useragent.express());
app.use((0, _cors2.default)());
app.use(bodyParser.json());
app.use(bodyParser.text());

//set the method overwrite
app.use(methodOverride(function (req) {
    if (req.body && _typeof(req.body) === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// handling 404 errors
// Todo:fix this!
app.use(function (err, req, res, next) {
    if (err.status !== 404) {
        console.log("here");
        return next();
    }
    console.log("here");
    res.send(err.message || '** no unicorns here **');
});

(0, _cutSecurityPassport.Secure)(app);

app.use(function (req, res, next) {
    grunth.use(app);
    req.log = grunth.hook(req);
    next();
});

var server = http.createServer(app);
var http_server = exports.http_server = server;
server.listen(port);