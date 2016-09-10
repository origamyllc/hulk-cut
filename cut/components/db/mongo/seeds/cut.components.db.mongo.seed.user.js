'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.seedUsers = seedUsers;

var _cutComponenetsDbMongoModelsUserModel = require('../models/cut.componenets.db.mongo.models.user.model.js');

var _cutComponenetsDbMongoModelsUserModel2 = _interopRequireDefault(_cutComponenetsDbMongoModelsUserModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usersArray = []; /**
                      * Created by prashun on 8/2/16.
                      */


var homer = {
    username: 'homer',
    password: 'homerisTheDaddy',
    email: 'homer@cut.com',
    roles: ['catalog.admin']
};

usersArray.push(homer);

var marge = {
    username: 'marge',
    password: 'margeisTheMommy',
    email: 'marge@cut.com',
    roles: ['catalog.admin']
};

usersArray.push(marge);

var bart = {
    username: 'bart',
    password: 'bartmargeisTheSon',
    email: 'bart@cut.com',
    roles: ['catalog.admin']
};

usersArray.push(bart);

var lisa = {
    username: 'lisa',
    password: 'lisaisTheDaughter',
    email: 'lisa@cut.com',
    roles: ['catalog.admin']
};

usersArray.push(lisa);

var maggie = {
    username: 'maggie',
    password: 'maggieisTheBaby',
    email: 'maggie@cut.com',
    roles: ['catalog.admin']
};

usersArray.push(maggie);

function seedUsers() {
    return new Promise(function (resolve) {
        _cutComponenetsDbMongoModelsUserModel2.default.createAsync(usersArray).then(function (usersArray) {
            resolve(usersArray);
        }).catch(function (err) {
            console.log("Failed to seed Users::Error::" + err);
            resolve(err);
        });
    });
}