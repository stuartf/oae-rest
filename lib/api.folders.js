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

/**
 * Get a folder by its id
 *
 * @param  {RestContext}    restCtx             The context of the current request
 * @param  {String}         folderId            The id of the folder to retrieve
 * @param  {Function}       callback            Standard callback function
 * @param  {Object}         callback.err        An error object, if any
 * @param  {Folder}         callback.folder     The retrieved folder
 */
var getFolder = module.exports.getFolder = function(restCtx, folderId, callback) {
    RestUtil.RestRequest(restCtx, '/api/folder/' + RestUtil.encodeURIComponent(folderId), 'GET', null, callback);
};

/**
 * Create a folder
 *
 * @param  {RestContext}    restCtx             The context of the current request
 * @param  {String}         displayName         The name for the new folder
 * @param  {String}         description         The description for the new folder
 * @param  {String}         visibility          The visibliity for the new visibility
 * @param  {String[]}       managers            The ids of the users and/or groups who can manage the new folder
 * @param  {String[]}       viewers             The ids of the users and/or groups who can view the new folder
 * @param  {Function}       callback            Standard callback function
 * @param  {Object}         callback.err        An error object, if any
 * @param  {Folder}         callback.folder     The created folder
 */
var createFolder = module.exports.createFolder = function(restCtx, displayName, description, visibility, managers, viewers, callback) {
    var params = {
        'displayName': displayName,
        'description': description,
        'visibility': visibility,
        'managers': managers,
        'viewers': viewers
    };
    RestUtil.RestRequest(restCtx, '/api/folder', 'POST', params, callback);
};

/**
 * Update a folder
 *
 * @param  {RestContext}    restCtx                         The context of the current request
 * @param  {String}         folderId                        The id of the folder that should be updated
 * @param  {Object}         updates                         The updates that should be made
 * @param  {String}         [updates.displayName]           The new display name for the folder
 * @param  {String}         [updates.description]           The new description for the folder
 * @param  {String}         [updates.visibility]            The new visibility for the folder
 * @param  {String}         [updates.applyVisibilityOn]     Expresses whether the visibility should be applied on the content items in the folder. One of `folder` or `folderAndContent`
 * @param  {Function}       callback                        Standard callback function
 * @param  {Object}         callback.err                    An error object, if any
 */
var updateFolder = module.exports.updateFolder = function(restCtx, folderId, updates, callback) {
    RestUtil.RestRequest(restCtx, '/api/folder/' + RestUtil.encodeURIComponent(folderId), 'POST', updates, callback);
};

/**
 * Delete a folder
 *
 * @param  {RestContext}    restCtx                         The context of the current request
 * @param  {String}         folderId                        The id of the folder that should be removed
 * @param  {Function}       callback                        Standard callback function
 * @param  {Object}         callback.err                    An error object, if any
 */
var deleteFolder = module.exports.deleteFolder = function(restCtx, folderId, callback) {
    RestUtil.RestRequest(restCtx, '/api/folder/' + RestUtil.encodeURIComponent(folderId), 'DELETE', null, callback);
};

/**
 * Share a folder with one or more users and groups
 *
 * @param  {RestContext}    restCtx             The context of the current request
 * @param  {String}         folderId            The id of the folder that should be shared
 * @param  {String[]}       principalIds        The ids of the users and/or groups with whom the folder should be shared
 * @param  {Function}       callback            Standard callback function
 * @param  {Object}         callback.err        An error object, if any
 */
var shareFolder = module.exports.shareFolder = function(restCtx, folderId, principalIds, callback) {
    RestUtil.RestRequest(restCtx, '/api/folder/' + RestUtil.encodeURIComponent(folderId) + '/share', 'POST', {'viewers': principalIds}, callback);
};

/**
 * Update a folder's members
 *
 * @param  {RestContext}    restCtx             The context of the current request
 * @param  {String}         folderId            The id of the folder for which the members should be updated
 * @param  {Object}         memberUpdates       An object where the keys hold the user and/or group ids and the values hold the new role for the principal. Setting a value to `false` will remove the user/group
 * @param  {Function}       callback            Standard callback function
 * @param  {Object}         callback.err        An error object, if any
 */
var updateFolderMembers = module.exports.updateFolderMembers = function(restCtx, folderId, memberUpdates, callback) {
    RestUtil.RestRequest(restCtx, '/api/folder/' + RestUtil.encodeURIComponent(folderId) + '/members', 'POST', memberUpdates, callback);
};

/**
 * Get the members for a folder
 *
 * @param  {RestContext}    restCtx                         The context of the current request
 * @param  {String}         folderId                        The id of the folder for which the members should be updated
 * @param  {String}         [start]                         The id of the principal from which to begin the page of results (exclusively). By default, begins from the first in the list.
 * @param  {Number}         [limit]                         The maximum number of results to return. Default: 10
 * @param  {Function}       callback                        Standard callback function
 * @param  {Object}         callback.err                    An error object, if any
 * @param  {Object[]}       callback.members                Array that contains an object for each member
 * @param  {String}         callback.members[i].role        The role of the member at index `i`
 * @param  {User|Group}     callback.members[i].profile     The principal profile of the member at index `i`
 */
var getFolderMembers = module.exports.getFolderMembers = function(restCtx, folderId, start, limit, callback) {
    var params = {
        'start': start,
        'limit': limit
    };
    RestUtil.RestRequest(restCtx, '/api/folder/' + RestUtil.encodeURIComponent(folderId) + '/members', 'GET', params, callback);
};

/**
 * Get the folders that a principal is a member or manager for
 *
 * @param  {RestContext}    restCtx                         The context of the current request
 * @param  {String}         principalId                     The id of the principal for whom to retrieve the folders
 * @param  {String}         [start]                         The id of the folder from which to begin the page of results (exclusively). By default, begins from the first in the list.
 * @param  {Number}         [limit]                         The maximum number of results to return. Default: 10
 * @param  {Function}       callback                        Standard callback function
 * @param  {Object}         callback.err                    An error object, if an
 * @param  {Object}         callback.result                 Holds the result set
 * @param  {Folder[]}       callback.result.results         Holds the returned folder
 * @param  {String}         callback.result.nextToken       Holds the folder id that should be used if the next page of folders needs to be retrieved
 */
var getFoldersLibrary = module.exports.getFoldersLibrary = function(restCtx, principalId, start, limit, callback) {
    var params = {
        'start': start,
        'limit': limit
    };
    RestUtil.RestRequest(restCtx, '/api/folder/library/' + RestUtil.encodeURIComponent(principalId), 'GET', params, callback);
};

/**
 * Get the folders the current user manages
 *
 * @param  {RestContext}    restCtx             The context of the current request
 * @param  {Function}       callback            Standard callback function
 * @param  {Object}         callback.err        An error object, if any
 * @param  {Folder[]}       callback.folders    The folders the current user manages
 */
var getManagedFolders = module.exports.getManagedFolders = function(restCtx, callback) {
    RestUtil.RestRequest(restCtx, '/api/folder/managed', 'GET', null, callback);
};

/**
 * Remove a folder from a principal library
 *
 * @param  {RestContext}    restCtx         The context of the current request
 * @param  {String}         principalId     The id of the principal from which to remove the folder
 * @param  {String}         folderId        The id of the folder that needs to be removed
 * @param  {String[]}       contentIds      One or more ids of content items that should be added to the folder
 * @param  {Function}       callback        Standard callback function
 * @param  {Object}         callback.err    An error object, if any
 */
var removeFolderFromLibrary = module.exports.removeFolderFromLibrary = function(restCtx, principalId, folderId, callback) {
    var url = '/api/folder/library';
    url += '/' + RestUtil.encodeURIComponent(principalId);
    url += '/' + RestUtil.encodeURIComponent(folderId);
    RestUtil.RestRequest(restCtx, url, 'DELETE', null, callback);
};

/**
 * Add one or more content items to a folder
 *
 * @param  {RestContext}    restCtx         The context of the current request
 * @param  {String}         folderId        The id of the folder that the content items need to be added to
 * @param  {String[]}       contentIds      One or more ids of content items that should be added to the folder
 * @param  {Function}       callback        Standard callback function
 * @param  {Object}         callback.err    An error object, if any
 */
var addContentItemsToFolder = module.exports.addContentItemsToFolder = function(restCtx, folderId, contentIds, callback) {
    RestUtil.RestRequest(restCtx, '/api/folder/' + RestUtil.encodeURIComponent(folderId) + '/library', 'POST', {'contentIds': contentIds}, callback);
};

/**
 * Remove one or more content items from a folder
 *
 * @param  {RestContext}    restCtx         The context of the current request
 * @param  {String}         folderId        The id of the folder that the content items need to be removed from
 * @param  {String[]}       contentIds      One or more ids of content items that should be removed from the folder
 * @param  {Function}       callback        Standard callback function
 * @param  {Object}         callback.err    An error object, if any
 */
var removeContentItemsFromFolder = module.exports.removeContentItemsFromFolder = function(restCtx, folderId, contentIds, callback) {
    RestUtil.RestRequest(restCtx, '/api/folder/' + RestUtil.encodeURIComponent(folderId) + '/library', 'DELETE', {'contentIds': contentIds}, callback);
};

/**
 * Get the content items in a folder
 *
 * @param  {RestContext}    restCtx                         The context of the current request
 * @param  {String}         folderId                        The id of the folder that should be listed
 * @param  {String}         [start]                         The id of the content item from which to begin the page of results (exclusively). By default, begins from the first in the list.
 * @param  {Number}         [limit]                         The maximum number of results to return. Default: 10
 * @param  {Function}       callback                        Standard callback function
 * @param  {Object}         callback.err                    An error object, if any
 * @param  {Object}         callback.result                 Holds the result set
 * @param  {Content[]}      callback.result.results         Holds the returned content items
 * @param  {String}         callback.result.nextToken       Holds the content id that should be used if the next page of content items needs to be retrieved
 */
var getFolderContentLibrary = module.exports.getFolderContentLibrary = function(restCtx, folderId, start, limit, callback) {
    var params = {
        'start': start,
        'limit': limit
    };
    RestUtil.RestRequest(restCtx, '/api/folder/' + RestUtil.encodeURIComponent(folderId) + '/library', 'GET', params, callback);
};
