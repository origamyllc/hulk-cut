'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.get = get;
exports.set = set;
exports.update = update;
exports.del = del;
exports.clear = clear;
exports.hasKey = hasKey;
exports.keys = keys;
var LRUCache = require('lru-cache');
var cache = LRUCache(1000);

function get(key, cb) {
    cb(cache.get(key));
}

function set(key, value) {
    cache.set(key, value);
}

function update(key, value) {
    var result = cache.get(key);
    if (result && result.indexOf(value) === -1) {
        cache.set(key, value);
    }
}

function del(key) {
    cache.del(key);
}

function clear() {
    cache.reset();
}

function hasKey(key) {
    return cache.has(key);
}

function keys() {
    return cache.keys();
}