'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.catalog_admin_role = catalog_admin_role;

var _cutComponenetsDbMongoModelsRolesModel = require('../models/cut.componenets.db.mongo.models.roles.model.js');

var _cutComponenetsDbMongoModelsRolesModel2 = _interopRequireDefault(_cutComponenetsDbMongoModelsRolesModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function catalog_admin_role(id) {
    var role = {
        name: 'catalog.admin',
        description: 'can administer the catalog',
        claims: id
    };
    save_role(role);
} /**
   * Created by prashun on 8/2/16.
   */


function save_role(role) {
    new Promise(function (resolve) {
        _cutComponenetsDbMongoModelsRolesModel2.default.create(role, function (err, role) {
            if (err) return handleError(err);
            console.log(role);
        });
    });
}