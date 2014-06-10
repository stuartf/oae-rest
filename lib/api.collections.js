/*!
 * Copyright 2014 Apereo Foundation (AF) Licensed under the
 * Educational Community License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may
 * obtain a copy of the License at
 *
 *     http://opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS"
 * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var _ = require('underscore');

var RestUtil = require('./util');

var getCollection = module.exports.getCollection = function(restCtx, collectionId, callback) {
    RestUtil.RestRequest(restCtx, '/api/collection/' + RestUtil.encodeURIComponent(collectionId), 'GET', null, callback);
};

var createCollection = module.exports.createCollection = function(restCtx, displayName, description, visibility, managers, viewers, callback) {
    var params = {
        'displayName': displayName,
        'description': description,
        'visibility': visibility,
        'managers': managers,
        'viewers': viewers
    };
    RestUtil.RestRequest(restCtx, '/api/collection', 'POST', params, callback);
};

var shareCollection = module.exports.shareCollection = function(restCtx, collectionId, principalIds, callback) {
    RestUtil.RestRequest(restCtx, '/api/collection/' + RestUtil.encodeURIComponent(collectionId) + '/share', 'POST', {'viewers': principalIds}, callback);
};

var updateCollectionMembers = module.exports.updateCollectionMembers = function(restCtx, collectionId, memberUpdates, callback) {
    RestUtil.RestRequest(restCtx, '/api/collection/' + RestUtil.encodeURIComponent(collectionId) + '/members', 'POST', memberUpdates, callback);
};

var getCollectionMembers = module.exports.getCollectionMembers = function(restCtx, collectionId, start, limit, callback) {
    var params = {
        'start': start,
        'limit': limit
    };
    RestUtil.RestRequest(restCtx, '/api/collection/' + RestUtil.encodeURIComponent(collectionId) + '/members', 'GET', params, callback);
};

var getCollectionsLibrary = module.exports.getCollectionsLibrary = function(restCtx, principalId, start, limit, callback) {
    var params = {
        'start': start,
        'limit': limit
    };
    RestUtil.RestRequest(restCtx, '/api/collection/library/' + RestUtil.encodeURIComponent(principalId), 'GET', params, callback);
};

var addContentItemsToCollection = module.exports.addContentItemsToCollection = function(restCtx, collectionId, contentIds, callback) {
    RestUtil.RestRequest(restCtx, '/api/collection/' + RestUtil.encodeURIComponent(collectionId) + '/library', 'POST', {'contentIds': contentIds}, callback);
};

var getCollectionContentLibrary = module.exports.getCollectionContentLibrary = function(restCtx, collectionId, start, limit, callback) {
    var params = {
        'start': start,
        'limit': limit
    };
    RestUtil.RestRequest(restCtx, '/api/collection/' + RestUtil.encodeURIComponent(collectionId) + '/library', 'GET', params, callback);
};
