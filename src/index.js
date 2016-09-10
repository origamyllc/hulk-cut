/**
 * Created by prashun on 6/10/16.
 */

import * as cut from './middleware/cut.express';

const lru = require('./components/cache/lru/cut.components.cache.lru.js');
const http = require('./components/http/cut.components.http.js');
const rabbit = require('./components/rabbit/cut.components.rabbitmq.js');
const response = require('./components/responses/cut.components.responses.js');
const  authentications = require('./middleware/security/cut.security.utils.js');


export const server = cut.app;

// ROUTERS
export const router = cut.router;

// MODULES
export const LRU = lru;
export const RABBIT = rabbit;

// HTTP
export const HTTP = http;

// UTILS
export const responses = response;
export const authentication =  authentications ;

