'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.send_bad_implementation_response = send_bad_implementation_response;
exports.send_unauthorized_user_error = send_unauthorized_user_error;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');


function send_not_found_error(obj) {
    var error = null;
    if (obj.error === 'Resource Not Found') {
        error = {};
        res.status(404).json(error);
    }
}

function send_bad_implementation_response(res, obj) {
    var error = {};
    res.status(500).json(error);
}

function send_unauthorized_user_error(req, res) {
    var error = {};
    res.status(401).json(error);
}