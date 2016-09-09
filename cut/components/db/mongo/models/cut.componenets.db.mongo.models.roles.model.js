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

var RolesSchema = new _mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    claims: {
        type: _mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

var schema = RolesSchema;

/**
 * Plugins
 */
schema.plugin(uniqueValidator, { message: 'Value is not unique.' });

exports.default = mongoose.model('Roles', RolesSchema);