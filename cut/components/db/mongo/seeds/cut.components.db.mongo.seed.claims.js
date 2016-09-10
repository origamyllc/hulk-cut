'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.seedClaims = seedClaims;

var _cutComponenetsDbMongoModelsClaimsModel = require('../models/cut.componenets.db.mongo.models.claims.model.js');

var _cutComponenetsDbMongoModelsClaimsModel2 = _interopRequireDefault(_cutComponenetsDbMongoModelsClaimsModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var claims_array = []; /**
                        * Created by prashun on 8/2/16.
                        */

var catalog_admin_claim = {
    name: 'catalog.admin.claims',
    description: 'Has full admin rights for the catalog',
    applications: [],
    devices: [],
    api_white_list: [{ "/catalog/devices": "Y" }, { "/catalog/application": "Y" }, { "/catalog/api": "Y" }]
};

claims_array.push(catalog_admin_claim);

function seedClaims() {
    return new Promise(function (resolve) {
        _cutComponenetsDbMongoModelsClaimsModel2.default.createAsync(claims_array).then(function (claims_array) {
            resolve(claims_array);
        }).catch(function (err) {
            console.log("Failed to seed Claims::Error::" + err);
            resolve(err);
        });
    });
}