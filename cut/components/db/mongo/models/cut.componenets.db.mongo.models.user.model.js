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

var authTypes = ['github', 'twitter', 'facebook', 'google'];
var SALT_WORK_FACTOR = 10;

var UserSchema = new _mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        default: 'some.user@example.com'
    },
    roles: {
        type: [String],
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: false,
        default: 'saltAndPeppa'
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    github: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

var schema = UserSchema;
/**
 * Virtuals
 */
schema.virtual('password').set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
}).get(function () {
    return this._password;
});

// Basic info to identify the current authenticated user in the app
schema.virtual('userInfo').get(function () {
    return {
        'name': this.name,
        'role': this.role
    };
});

// Public profile information
schema.virtual('profile').get(function () {
    return {
        'name': this.name,
        'role': this.role
    };
});

/**
 * Validations
 */
var validatePresenceOf = function validatePresenceOf(value) {
    return value && value.length;
};

// Validate empty email
schema.path('email').validate(function (email) {
    // if you are authenticating by any of the oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
}, 'Email cannot be blank');

// Validate empty password
schema.path('hashedPassword').validate(function (hashedPassword) {
    // if you are authenticating by any of the oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return hashedPassword.length;
}, 'Password cannot be blank');

/**
 * Methods
 */
schema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function authenticate(plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function makeSalt() {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function encryptPassword(password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }
};

/**
 * Plugins
 */
schema.plugin(uniqueValidator, { message: 'Value is not unique.' });

/**
 * Pre-save hook
 */
schema.pre('save', function (next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1) next(new Error('Invalid password'));else next();
});

exports.default = mongoose.model('Users', UserSchema);