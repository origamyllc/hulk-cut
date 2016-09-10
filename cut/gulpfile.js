'use strict';

var _dev = require('./config/env/dev');

var _integration = require('./config/env/integration');

var _prod = require('./config/env/prod');

var _qa = require('./config/env/qa');

var _stress = require('./config/env/stress');

/**
 * Created by prashun on 5/8/16.
 */
var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var args = require('./server-config.js');
var mongoose = require('mongoose');
var mongodev = undefined;
var redis = require("redis");
var relational = require('orm');
var amqp = require('amqp');
var path = require('path');
var pm2 = require('pm2');
var appRootDir = require('app-root-dir').get();

require('babel-register')({
    "presets": ["es2015"]
});

gulp.task('default', ['set:enviornment'], function () {
    gulp.start('server:start');
});

// get enviornment
gulp.task('set:enviornment', function () {
    if (args.enviornment.NODE_ENV === 'development') {
        process.env.NODE_ENV = 'development';
    }
    if (args.enviornment.NODE_ENV === 'integration') {
        process.env.NODE_ENV = 'integration';
    }
    if (args.enviornment.NODE_ENV === 'production') {
        process.env.NODE_ENV = 'production';
    }
    if (args.enviornment.NODE_ENV === 'qa') {
        process.env.NODE_ENV = 'qa';
    }
    if (args.enviornment.NODE_ENV === 'stress') {
        process.env.NODE_ENV = 'stress';
    }
});

// start our server and listen for changes
gulp.task('server:start', function (cb) {
    gulp.start('server:build', cb);
});

// run the server
gulp.task('server:build', function () {
    // configure nodemon
    nodemon({
        // the script to run the app
        script: appRootDir + '/build/server.js',
        // this listens to changes in any of these files/routes and restarts the commons
        // watch: ["server.js", "app.js", "routes/", 'public/*', 'public/*/**'],
        ext: 'js',
        // set the enviornment for the build
        env: config.NODE_ENV
    });
});

var config = function getConfiguration() {
    // Application Config
    var conf = null;

    if (process.env.NODE_ENV === 'development') {
        conf = _dev.devConfig;
    }
    if (process.env.NODE_ENV === 'integration') {
        conf = _integration.integrationConfig;
    }

    if (process.env.NODE_ENV === 'production') {
        conf = _prod.productionConfig;
    }

    if (process.env.NODE_ENV === 'qa') {
        conf = _qa.qaConfig;
    }

    if (process.env.NODE_ENV === 'stress') {
        conf = _stress.stressConfig;
    }

    return conf;
};