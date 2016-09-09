"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.seedTokens = seedTokens;

var _cutComponenetsDbMongoModelsTokenModel = require("../models/cut.componenets.db.mongo.models.token.model.js");

var _cutComponenetsDbMongoModelsTokenModel2 = _interopRequireDefault(_cutComponenetsDbMongoModelsTokenModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function seedTokens(tokenArray) {
    return new Promise(function (resolve) {
        _cutComponenetsDbMongoModelsTokenModel2.default.createAsync(tokenArray).then(function (tokenArray) {
            resolve(tokenArray);
        }).catch(function (err) {
            console.log("Failed to seed Users::Error::" + err);
            resolve(err);
        });
    });
} /**
   * Created by prashun on 8/2/16.
   */