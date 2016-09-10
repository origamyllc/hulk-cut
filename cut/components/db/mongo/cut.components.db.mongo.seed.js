'use strict';

var _cutComponentsDbMongoSeedUser = require('./seeds/cut.components.db.mongo.seed.user.js');

var Users = _interopRequireWildcard(_cutComponentsDbMongoSeedUser);

var _cutComponentsDbMongoSeedToken = require('./seeds/cut.components.db.mongo.seed.token.js');

var Tokens = _interopRequireWildcard(_cutComponentsDbMongoSeedToken);

var _cutComponentsDbMongoSeedRoles = require('./seeds/cut.components.db.mongo.seed.roles.js');

var Roles = _interopRequireWildcard(_cutComponentsDbMongoSeedRoles);

var _cutComponentsDbMongoSeedClaims = require('./seeds/cut.components.db.mongo.seed.claims.js');

var Claims = _interopRequireWildcard(_cutComponentsDbMongoSeedClaims);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Created by prashun on 8/2/16.
 */
/**
 * Created by prashun on 6/11/16.
 */

var uuid = require('node-uuid');

var seed_user_and_tokens = new Promise(function (resolve, reject) {
    Users.seedUsers().then(function (user_array) {
        var token_array = [];
        var index = null;
        for (index in user_array) {
            var id = user_array[index]._id;
            var token = {
                userId: id,
                accessToken: uuid.v4()
            };
            token_array.push(token);
        }
        Tokens.seedTokens(token_array);
    });
});

var seed_claim_and_roles = Claims.seedClaims().then(function (claims_array) {
    var index = null;
    for (index in claims_array) {
        var id = claims_array[index]._id;
        var name = claims_array[index].name;
        if (name === 'catalog.admin.claims') {
            Roles.catalog_admin_role(id);
        }
    }
});

Promise.all([seed_user_and_tokens, seed_claim_and_roles]).then(function (value) {
    console.log("Finished seeding models ...");
}, function (reason) {
    console.log(reason);
});