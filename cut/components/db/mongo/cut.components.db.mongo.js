'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connect = connect;
exports.bulkInsert = bulkInsert;
exports.find = find;
exports.show = show;
exports.getById = getById;
exports.updateById = updateById;
exports.updateByField = updateByField;
exports.delById = delById;
exports.delByField = delByField;
exports.count = count;
exports.countFiltered = countFiltered;
exports.filteredPagination = filteredPagination;
exports.sortedPagination = sortedPagination;

var _constants = require('../../../../constants/constants');

var CONSTANTS = _interopRequireWildcard(_constants);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _cutComponentsDbMongo = require('./cut.components.db.mongo.model');

var _cutComponentsDbMongo2 = _interopRequireDefault(_cutComponentsDbMongo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var objectID = require('mongodb').ObjectID;
var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var db = mongoose.connection;


var url = CONSTANTS.MONGO_DB_URL;
connect(url);

function connect(url) {
    mongoose.connect(url);
    db.on('error', console.error);
    db.once('open', function () {
        console.log('connected to :' + url);
    });
}

function bulkInsert(model, docArray) {
    return new _bluebird2.default(function (resolve) {
        _cutComponentsDbMongo2.default[model].createAsync(docArray).then(function (docArray) {
            resolve(docArray);
        }).catch(function (err) {
            resolve(err);
        });
    });
}

function find(model, query) {
    return new _bluebird2.default(function (resolve) {
        _cutComponentsDbMongo2.default[model].findAsync(JSON.parse(query)).then(function (docArray) {
            resolve(docArray);
        }).catch(function (err) {
            console.log(err);
            resolve(err);
        });;
    });
}

function show(model) {
    return new _bluebird2.default(function (resolve) {
        _cutComponentsDbMongo2.default[model].findAsync({}).then(function (docArray) {
            resolve(docArray);
        }).catch(function (err) {
            console.log(err);
            resolve(err);
        });;
    });
}

function getById(model, id) {
    return new _bluebird2.default(function (resolve) {
        _cutComponentsDbMongo2.default[model].find({ _id: id }, function (err, document) {
            resolve(document);
        });
    });
}

function updateById(model, id, data) {
    return new _bluebird2.default(function (resolve) {
        _cutComponentsDbMongo2.default[model].findByIdAndUpdate(id, { $set: data }, function (error, doc) {
            resolve(doc);
        });
    });
}

function updateByField(model, key, value, data) {
    return new _bluebird2.default(function (resolve) {
        // TODO: refactor this to use  string templates
        var query = JSON.parse('{"' + key + '":"' + value + '"}');
        _cutComponentsDbMongo2.default[model].update(query, data, null, function (error, docs) {
            resolve(docs);
        });
    });
}

function delById(model, id) {
    return new _bluebird2.default(function (resolve) {
        _cutComponentsDbMongo2.default[model].findByIdAndRemove(id, function (error, docs) {
            resolve(docs);
        });
    });
}

function delByField(model, key, value) {
    return new _bluebird2.default(function (resolve) {
        // TODO: refactor this to use  string templates
        var query = JSON.parse('{"' + key + '":"' + value + '"}');
        _cutComponentsDbMongo2.default[model].remove(query, function (error) {
            resolve(error);
        });
    });
}

function count(model) {
    return new _bluebird2.default(function (resolve) {
        _cutComponentsDbMongo2.default[model].count({}, function (err, count) {
            resolve(count);
        });
    });
}

function countFiltered(model, key, value) {
    return new _bluebird2.default(function (resolve) {
        // TODO: refactor this to use  string templates
        var query = JSON.parse('{"' + key + '":"' + value + '"}');
        _cutComponentsDbMongo2.default[model].count(query, function (err, count) {
            resolve(count);
        });
    });
}

function filteredPagination(model, key, value, numberOfItemsPerPage, currentPage) {
    // TODO: refactor this to use  string templates
    var condition = JSON.parse('{"' + key + '":"' + value + '"}');
    var itemsPerPage = parseInt(numberOfItemsPerPage.toString());
    var itemsToSkip = parseInt(itemsPerPage) * parseInt(currentPage.toString());
    return new _bluebird2.default(function (resolve) {
        var query = _cutComponentsDbMongo2.default[model].find(condition);
        query.skip(itemsToSkip).limit(parseInt("'" + itemsPerPage + "'")) // TODO: refactor this to use  string templates
        .exec(function (err, results) {
            resolve(results);
        });
    });
}

function sortedPagination(model, itemsPerPage, currentPage, sortByField, Criteria) {
    return new _bluebird2.default(function (resolve) {
        var itemsToSkip = parseInt(itemsPerPage) * parseInt(currentPage.toString());
        // TODO: refactor this to use  string templates

        var sortCriteria = JSON.parse('{"' + sortByField + '":"' + Criteria + '"}');
        _cutComponentsDbMongo2.default[model].find({}).limit(parseInt("'" + itemsPerPage + "'")).skip(itemsToSkip).sort(sortCriteria).exec(function (err, docs) {
            resolve(docs);
        });
    });
}

/**
export function sortAndFilterAndPaginate(model,key,value,itemsPerPage,currentPage,sortByField,sortCriteria){
    return new Promise((resolve) => {
        // TODO: refactor this to use  string templates
        const query = JSON.parse('{"'+key+'":"'+value+'"}');
        return new Promise((resolve) => {
            const itemsPerPage = itemsPerPage;
            const currentPage = currentPage;
            const sortCriteria = JSON.parse('{"'+sortByField+'":"'+sortCriteria+'"}');
            Collections[model].find(query).limit(itemsPerPage)
                .skip( itemsPerPage * currentPage )
                .sort(sortCriteria)
                .exec(function(err, docs) {
                    resolve(docs);
                });
        });
    });
}
 */