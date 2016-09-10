'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isAuthenticated = isAuthenticated;
exports.authenticateJWT = authenticateJWT;

var _cutComponentsDbMongo = require('../../components/db/mongo/cut.components.db.mongo.model');

var _cutComponentsDbMongo2 = _interopRequireDefault(_cutComponentsDbMongo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isAuthenticated(req, res, next) {

    var accessToken = req.headers['authorization'];
    if (accessToken) {
        _cutComponentsDbMongo2.default['Tokens'].findOne({
            accessToken: accessToken
        }, function (err, token) {
            // don't ever give out the password or salt
            if (token) {
                return next();
            } else {
                var error = { "message": "unauthorized access" };
                res.status(401).json(error);
            }
        });
    }
}

function authenticateJWT(req, res, next) {

    var JWTToken = req.headers['authorization'];
}