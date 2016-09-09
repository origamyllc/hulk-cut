/**
 * Created by prashun on 6/11/16.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');

var ClaimsSchema = new _mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    devices: [{
        type: String
    }],
    applications: [{
        type: String
    }],
    api_white_list: {
        type: _mongoose.Schema.Types.Mixed,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

var schema = ClaimsSchema;

/**
 * Plugins
 */
schema.plugin(uniqueValidator, { message: 'Value is not unique.' });

exports.default = mongoose.model('Claims', ClaimsSchema);