/**
 * Created by prashun on 6/10/16.
 */

import * as cut from './cut/server.js';
import * as response  from 'cut-responses';

const authentications = require('./components/security/cut.security.utils.js');

// express app 
export const $app = cut.app;
export const $router = cut.router;

// cache
export const $cache = require('cache-cow');

// transport
export const $pubsub  = require('caeleb');

//mongo
export const $mongo = require('rikki');

//responses
export const $res = response;

// authentication
export const $auth =  authentications ;

