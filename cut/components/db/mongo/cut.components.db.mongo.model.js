'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cutComponenetsDbMongoModelsUserModel = require('./models/cut.componenets.db.mongo.models.user.model.js');

var _cutComponenetsDbMongoModelsUserModel2 = _interopRequireDefault(_cutComponenetsDbMongoModelsUserModel);

var _cutComponenetsDbMongoModelsToken = require('./models/cut.componenets.db.mongo.models.token.model');

var _cutComponenetsDbMongoModelsToken2 = _interopRequireDefault(_cutComponenetsDbMongoModelsToken);

var _cutComponenetsDbMongoModelsRoles = require('./models/cut.componenets.db.mongo.models.roles.model');

var _cutComponenetsDbMongoModelsRoles2 = _interopRequireDefault(_cutComponenetsDbMongoModelsRoles);

var _cutComponenetsDbMongoModelsClaims = require('./models/cut.componenets.db.mongo.models.claims.model');

var _cutComponenetsDbMongoModelsClaims2 = _interopRequireDefault(_cutComponenetsDbMongoModelsClaims);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by prashun on 6/11/16.
 */

var Collections = {};

Collections['Users'] = _cutComponenetsDbMongoModelsUserModel2.default;
Collections['Tokens'] = _cutComponenetsDbMongoModelsToken2.default;
Collections['Roles'] = _cutComponenetsDbMongoModelsRoles2.default;
Collections['Claims'] = _cutComponenetsDbMongoModelsClaims2.default;

exports.default = Collections;