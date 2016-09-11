/**
 * Created by prashun on 5/8/16.
 */
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const args = require('./server-config.js');
const appRootDir = require('app-root-dir').get();

import { devConfig } from  './config/env/dev';
import { integrationConfig } from  './config/env/integration'
import { productionConfig } from  './config/env/prod'
import { qaConfig } from  './config/env/qa'
import { stressConfig } from  './config/env/stress'

require('babel-register')({
    "presets": ["es2015"]
});

gulp.task('default', ['set:enviornment'],  () => {
    gulp.start('server:start');
});

// get enviornment
gulp.task('set:enviornment', () => {
    if(args.enviornment.NODE_ENV === 'development') {
        process.env.NODE_ENV = 'development';
    }
    if(args.enviornment.NODE_ENV === 'integration') {
        process.env.NODE_ENV = 'integration';
    }
    if(args.enviornment.NODE_ENV === 'production') {
        process.env.NODE_ENV = 'production';
    }
    if(args.enviornment.NODE_ENV === 'qa') {
        process.env.NODE_ENV = 'qa';
    }
    if(args.enviornment.NODE_ENV === 'stress') {
        process.env.NODE_ENV = 'stress';
    }
});

// start our server and listen for changes
gulp.task('server:start', (cb) => {
        gulp.start('server:build', cb);
});



// run the server
gulp.task('server:build',  () => {
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

const config = function getConfiguration () {
    // Application Config
    let conf = null;

    if (process.env.NODE_ENV === 'development') {
        conf =  devConfig;
    }
    if ( process.env.NODE_ENV === 'integration' ){
        conf = integrationConfig;
    }

    if ( process.env.NODE_ENV === 'production' ){
        conf = productionConfig;
    }

    if ( process.env.NODE_ENV === 'qa' ){
        conf = qaConfig ;
    }

    if ( process.env.NODE_ENV === 'stress' ){
        conf = stressConfig;
    }


    return conf;
}