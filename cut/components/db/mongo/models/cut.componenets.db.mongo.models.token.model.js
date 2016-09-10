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

var TokenSchema = new _mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: true
    }

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

var schema = TokenSchema;

// add mixin for get by user Id?

/**
 * Plugins
 */
schema.plugin(uniqueValidator, { message: 'Value is not unique.' });

exports.default = mongoose.model('Tokens', TokenSchema);