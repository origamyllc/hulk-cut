'use strict';

import express from 'express';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import * as favicon from 'serve-favicon';
import * as cookieSession from 'cookie-session';
import * as useragent from 'express-useragent';
import * as Promise from 'bluebird';
import * as http from 'http';
import  cookieParser  from 'cookie-parser';
import  cors  from 'cors';
import session from 'express-session';
import { Secure } from '../components/security/cut.security.passport.js';
import { cut_request } from 'cut-requests';
import { logger } from 'grunth';

const morgan = require('morgan');
const methodOverride = require('method-override');
export const app = express();
const port = process.env.PORT;
export const router = express.Router();
const fs = require('fs')
var colors = require('colors');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(useragent.express());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cut_request);
app.use(logger);

let server = http.createServer(app);
export const http_server = server;

if(port && typeof port !== 'undefined') {
    server.listen(port);
    console.log(colors.green('#############################################'));
    console.log(colors.green('##############   Hulk Cut   #################'));
    console.log(colors.green('#############################################'));
    console.log("*********************************************");
    console.log("**** Server is listening on  port  "+ port +" *****");
    console.log("*********************************************");
}else{
    console.log("*******************************************");
    console.log("   Server is not listening on any ports    ");
    console.log("   please set port to run on               ");
    console.log("*******************************************");
}

var config = null;

if(process.env.NODE_ENV && process.env.NODE_ENV === "development"){
       config = require(process.env.CONFIG_PATH).devConfig;
}

if(process.env.NODE_ENV && process.env.NODE_ENV === "test"){
    config = require(process.env.CONFIG_PATH).testConfig;
}

if(process.env.NODE_ENV && process.env.NODE_ENV === "stress"){
    config = require(process.env.CONFIG_PATH).stressConfig;
}

if(process.env.NODE_ENV && process.env.NODE_ENV === "integration"){
    config = require(process.env.CONFIG_PATH).integrationConfig;
}

if(process.env.NODE_ENV && process.env.NODE_ENV === "uat"){
    config = require(process.env.CONFIG_PATH).uatConfig;
}

if(process.env.NODE_ENV && process.env.NODE_ENV === "prod"){
    config = require(process.env.CONFIG_PATH).prodConfig;
}

 if(config ){
    // mongo
    process.env.MONGO_DB_URL = config.mongo || 'mongodb://localhost/dev';

    //redis
    process.env.REDIS_SERVER = config.redis.db.server || 'localhost' ;
    process.env.REDIS_SECRET = config.redis.db.secretKey || 'SeekQret-CutDev';
    process.env.REDIS_PORT = config.redis.db.port || 6379;
    process.env.REDIS_DB = config.redis.db.db || 0;

    // rabbit

    process.env.RABBIT_HOST || 'localhost';
    process.env.RABBIT_PORT || 5672;
    process.env.RABBIT_USER_NAME || 'guest';
    process.env.RABBIT_PASSWORD || 'guest';
    process.env.CONNECTION_TIMEOUT || 10000;
    process.env.AUTH_MECHANISM || 'AMQPLAIN';
    process.env.RABBIT_VHOST || '/';
    process.env.RABBIT_NO_DELAY || true;
    process.env.RABBIT_SSL_ENABLED || false;

// logger
     process.env.LOGGER_CONFIG = config.logger || {};

}

/**
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);

 **/
