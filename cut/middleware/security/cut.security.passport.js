'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Secure = Secure;

var _cutComponentsDbMongo = require('../../components/db/mongo/cut.components.db.mongo.model');

var _cutComponentsDbMongo2 = _interopRequireDefault(_cutComponentsDbMongo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passport = require('passport'); /**
                                     * Created by prashun on 6/16/16.
                                     */

var Promise = require("bluebird");
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var crypto = require('crypto');

function Secure(app) {

    // Configure Passport authenticated session persistence.
    //
    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session.  The
    // typical implementation of this is as simple as supplying the user ID when
    // serializing, and querying the user record by ID from the database when
    // deserializing.

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        _cutComponentsDbMongo2.default['Users'].findOne({
            _id: id
        }, function (err, user) {
            // don't ever give out the password or salt
            done(err, user);
        });
    });

    // Configure the local strategy for use by Passport.
    //
    // The local strategy require a `verify` function which receives the credentials
    // (`username` and `password`) submitted by the user.  The function must verify
    // that the password is correct and then invoke `cb` with a user object, which
    // will be set at `req.user` in route handlers after authentication.

    passport.use(new LocalStrategy({ // or whatever you want to use
        usernameField: 'username', // define the parameter in req.body that passport can use as username and password
        passwordField: 'password'
    }, function (username, password, done) {
        _cutComponentsDbMongo2.default['Users'].findOne({
            username: username
        }, function (err, user) {

            if (err) return done(err);

            if (!user) {
                return done(null, false, {
                    message: 'This user is not registered.'
                });
            }

            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'This password is not correct.'
                });
            }
            return done(null, user);
        });
    }));

    //use passport session
    app.use(passport.initialize());
    app.use(passport.session());
}