'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _plasmaSerialize = require('plasma-serialize');

var _plasmaSerialize2 = _interopRequireDefault(_plasmaSerialize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Reviews API JS client.
 *
 * In order to use Reviews API you should create an instance of this class.
 * ~~~~
 * import Reviews from "tm-reviews-api-client-js";
 * const reviews = new Reviews ('http://api.templatemonster.com/reviews/v1', 'en');
 * const list = reviews.getReviews ([12345, 55555]);
 * ~~~~
 * @constructor Reviews
 */

var Review = function () {
  function Review(url) {
    _classCallCheck(this, Review);

    this.url = null;

    this.url = url;
  }

  /**
   * Return review information for given identifiers.
   * @param params {Object} Reviews parameters
   * @returns {Object} <pre>{
   * "currentPageIndex":1,
   * "totalCount":11,
   * "lastPageIndex":6,
   * "items": [
   *  {
   *    "id":23,
   *    "status":4,
   *    "user_id":21543,
   *    "user_name":"mice mice",
   *    "title":"review title",
   *    "content":"review content",
   *    "score":5,
   *    "template_id":58444,
   *    "vote_up":0,
   *    "vote_down":0,
   *    "_links":{"self":{"href":"http://service-reviews.dev/api/v1/reviews/23"}}
   *   }, ...]
   *  }</pre>
   * @method Reviews#getReviews
   */


  _createClass(Review, [{
    key: 'getReviews',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var response, paginationData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _extends({}, params);
                _context.next = 3;
                return this._fetchRequest(this.url + 'reviews?' + (0, _plasmaSerialize2.default)(params));

              case 3:
                response = _context.sent;
                paginationData = {
                  currentPageIndex: parseInt(response.headers.get('x-pagination-current-page')),
                  totalCount: parseInt(response.headers.get('x-pagination-total-count')),
                  lastPageIndex: parseInt(response.headers.get('x-pagination-page-count')),
                  canModerate: parseInt(response.headers.get('x-can-moderate'))
                };
                _context.t0 = _extends;
                _context.t1 = {};
                _context.t2 = paginationData;
                _context.next = 10;
                return response.json();

              case 10:
                _context.t3 = _context.sent;
                _context.t4 = {
                  items: _context.t3
                };
                return _context.abrupt('return', (0, _context.t0)(_context.t1, _context.t2, _context.t4));

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getReviews() {
        return _ref.apply(this, arguments);
      }

      return getReviews;
    }()
  }, {
    key: 'getReviewsUser',


    /**
     * Return review information for given identifiers. (user mode)
     * @param token {String} Access token
     * @param params {Object} Reviews parameters
     * @returns {Object} <pre>{
     * "currentPageIndex":1,
     * "totalCount":11,
     * "lastPageIndex":6,
     * "items": [
     *  {
     *    "id":23,
     *    "status":4,
     *    "user_id":21543,
     *    "user_name":"mice mice",
     *    "title":"review title",
     *    "content":"review content",
     *    "score":5,
     *    "template_id":58444,
     *    "vote_up":0,
     *    "vote_down":0,
     *    "_links":{"self":{"href":"http://service-reviews.dev/api/v1/reviews/23"}}
     *   }, ...]
     *  }</pre>
     * @method Reviews#getReviewsUser
     */
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var response, paginationData;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._fetchRequest(this.url + 'reviews/users?' + (0, _plasmaSerialize2.default)(params));

              case 2:
                response = _context2.sent;
                paginationData = {
                  currentPageIndex: parseInt(response.headers.get('x-pagination-current-page')),
                  totalCount: parseInt(response.headers.get('x-pagination-total-count')),
                  lastPageIndex: parseInt(response.headers.get('x-pagination-page-count')),
                  canModerate: parseInt(response.headers.get('x-can-moderate')),
                  poweredBy: response.headers.get('X-Powered-By')
                };
                _context2.t0 = _extends;
                _context2.t1 = {};
                _context2.t2 = paginationData;
                _context2.next = 9;
                return response.json();

              case 9:
                _context2.t3 = _context2.sent;
                _context2.t4 = {
                  items: _context2.t3
                };
                return _context2.abrupt('return', (0, _context2.t0)(_context2.t1, _context2.t2, _context2.t4));

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getReviewsUser() {
        return _ref2.apply(this, arguments);
      }

      return getReviewsUser;
    }()
  }, {
    key: 'approveReview',


    /**
     * Return approve review information for given identifiers.
     * @param token {String} Access token
     * @param id {Number} Review id
     * @returns {Object} <pre>{
     * "canModerate": 1,
     * "items":
     *  {
     *     "id": 1,
     *     "title": "Really good. Html is better than cms",
     *     "content": "I had font problem with flash cms. Now I have no problem with html",
     *     "score": 5,
     *     "created_at": 1469607948519,
     *     "user_id": 123,
     *     "template_id": 12345,
     *     "status": "initial",
     *     "vote_up": 1,
     *     "vote_down": 0,
     *     "_links": {"self":{"href":"http://service-reviews.dev/api/v1/reviews/1"}}
     *   }
     *  }</pre>
     * @method Reviews#approveReview
     */
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(token, id) {
        var response, headersData;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (token.length) {
                  _context3.next = 2;
                  break;
                }

                throw new Error('Token not found');

              case 2:
                if (this._isValidId(id)) {
                  _context3.next = 4;
                  break;
                }

                throw new Error('Id is not correct');

              case 4:
                _context3.next = 6;
                return this._fetchRequest(this.url + 'reviews/approve/' + id, token, 'POST');

              case 6:
                response = _context3.sent;
                headersData = {
                  canModerate: parseInt(response.headers.get('X-Can-Moderate'))
                };
                _context3.t0 = _extends;
                _context3.t1 = {};
                _context3.t2 = headersData;
                _context3.next = 13;
                return response.json();

              case 13:
                _context3.t3 = _context3.sent;
                _context3.t4 = {
                  items: _context3.t3
                };
                return _context3.abrupt('return', (0, _context3.t0)(_context3.t1, _context3.t2, _context3.t4));

              case 16:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function approveReview(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return approveReview;
    }()

    /**
     * Return complete review information for given identifiers.
     * @param token {String} Access token
     * @param id {Number} Review id
     * @param params {Object} Reviews parameters
     * @returns {Object} <pre>{
     * "canModerate": 1,
     * "items":
     *  {
     *     "id": 1,
     *     "title": "Really good. Html is better than cms",
     *     "content": "I had font problem with flash cms. Now I have no problem with html",
     *     "score": 5,
     *     "created_at": 1469607948519,
     *     "user_id": 123,
     *     "template_id": 12345,
     *     "status": "initial",
     *     "vote_up": 1,
     *     "vote_down": 0,
     *     "_links": {"self":{"href":"http://service-reviews.dev/api/v1/reviews/1"}}
     *   }
     *  }</pre>
     * @method Reviews#completeReview
     */

  }, {
    key: 'completeReview',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(token, id) {
        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var response, headersData;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (token.length) {
                  _context4.next = 2;
                  break;
                }

                throw new Error('Token not found');

              case 2:
                if (this._isValidId(id)) {
                  _context4.next = 4;
                  break;
                }

                throw new Error('Id is not correct');

              case 4:
                _context4.next = 6;
                return this._fetchRequest(this.url + 'reviews/' + id, token, 'PUT', params);

              case 6:
                response = _context4.sent;
                headersData = {
                  canModerate: parseInt(response.headers.get('X-Can-Moderate'))
                };
                _context4.t0 = _extends;
                _context4.t1 = {};
                _context4.t2 = headersData;
                _context4.next = 13;
                return response.json();

              case 13:
                _context4.t3 = _context4.sent;
                _context4.t4 = {
                  items: _context4.t3
                };
                return _context4.abrupt('return', (0, _context4.t0)(_context4.t1, _context4.t2, _context4.t4));

              case 16:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function completeReview(_x5, _x6) {
        return _ref4.apply(this, arguments);
      }

      return completeReview;
    }()

    /**
     * Return decline review information for given identifiers.
     * @param token {String} Access token
     * @param id {Number} Review id
     * @returns {Object} <pre>{
     * "canModerate": 1,
     * "items":
     *  {
     *     "id": 1,
     *     "title": "Really good. Html is better than cms",
     *     "content": "I had font problem with flash cms. Now I have no problem with html",
     *     "score": 5,
     *     "created_at": 1469607948519,
     *     "user_id": 123,
     *     "template_id": 12345,
     *     "status": "initial",
     *     "vote_up": 1,
     *     "vote_down": 0,
     *     "_links": {"self":{"href":"http://service-reviews.dev/api/v1/reviews/1"}}
     *   }
     *  }</pre>
     * @method Reviews#declineReview
     */

  }, {
    key: 'declineReview',
    value: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(token, id) {
        var response, headersData;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (token.length) {
                  _context5.next = 2;
                  break;
                }

                throw new Error('Token not found');

              case 2:
                if (this._isValidId(id)) {
                  _context5.next = 4;
                  break;
                }

                throw new Error('Id is not correct');

              case 4:
                _context5.next = 6;
                return this._fetchRequest(this.url + 'reviews/decline/' + id, token, 'POST');

              case 6:
                response = _context5.sent;

                if (!(response.status >= 400)) {
                  _context5.next = 9;
                  break;
                }

                throw new Error('Bad server response');

              case 9:
                headersData = {
                  canModerate: parseInt(response.headers.get('X-Can-Moderate'))
                };
                _context5.t0 = _extends;
                _context5.t1 = {};
                _context5.t2 = headersData;
                _context5.next = 15;
                return response.json();

              case 15:
                _context5.t3 = _context5.sent;
                _context5.t4 = {
                  items: _context5.t3
                };
                return _context5.abrupt('return', (0, _context5.t0)(_context5.t1, _context5.t2, _context5.t4));

              case 18:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function declineReview(_x8, _x9) {
        return _ref5.apply(this, arguments);
      }

      return declineReview;
    }()

    /**
     * Return added votes for the review: increment vote_up or vote_down field.
     * @param token {String} Access token
     * @param id {Number} Review id
     * @param params {Object} Reviews votes parameters
     * @returns {Object} <pre>{
     * "canModerate": 1,
     * "items":
     *  {
     *     "id": 1,
     *     "title": "Really good. Html is better than cms",
     *     "content": "I had font problem with flash cms. Now I have no problem with html",
     *     "score": 5,
     *     "created_at": 1469607948519,
     *     "user_id": 123,
     *     "template_id": 12345,
     *     "status": "initial",
     *     "vote_up": 1,
     *     "vote_down": 0,
     *     "_links": {"self":{"href":"http://service-reviews.dev/api/v1/reviews/1"}}
     *   }
     *  }</pre>
     * @method Reviews#addReviewVote
     */

  }, {
    key: 'addReviewVote',
    value: function () {
      var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(token, id) {
        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var response, headersData;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (token.length) {
                  _context6.next = 2;
                  break;
                }

                throw new Error('Token not found');

              case 2:
                if (this._isValidId(id)) {
                  _context6.next = 4;
                  break;
                }

                throw new Error('Id is not correct');

              case 4:
                _context6.next = 6;
                return this._fetchRequest(this.url + 'reviews/' + id, token, 'PATCH', params);

              case 6:
                response = _context6.sent;
                headersData = {
                  canModerate: parseInt(response.headers.get('X-Can-Moderate'))
                };
                _context6.t0 = _extends;
                _context6.t1 = {};
                _context6.t2 = headersData;
                _context6.next = 13;
                return response.json();

              case 13:
                _context6.t3 = _context6.sent;
                _context6.t4 = {
                  items: _context6.t3
                };
                return _context6.abrupt('return', (0, _context6.t0)(_context6.t1, _context6.t2, _context6.t4));

              case 16:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function addReviewVote(_x10, _x11) {
        return _ref6.apply(this, arguments);
      }

      return addReviewVote;
    }()

    /**
     * Return reply of the review information for given identifiers.
     * @param token {String} Access token
     * @param review_id {Number} ID of the parent review
     * @param params {Object} Body parameters
     * @returns {Object} <pre>{
     * "canModerate": 1,
     * "items":
     *  {
     *   "id": 1,
     *   "review_id": 1,
     *   "content": "I had font problem with flash cms. Now I have no problem with html",
     *   "created_at": 1469607948519,
     *   "user_id": 123,
     *   "vote_up": 0,
     *   "vote_down": 0,
     *   "_links": {"self":{"href":"http://service-reviews.dev/api/v1/reviews/1/comment/1"}}
     *   }
     *  }</pre>
     * @method Reviews#replayTheReview
     */

  }, {
    key: 'replayTheReview',
    value: function () {
      var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(token, review_id) {
        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var response, headersData;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (token.length) {
                  _context7.next = 2;
                  break;
                }

                throw new Error('Token not found');

              case 2:
                if (this._isValidId(review_id)) {
                  _context7.next = 4;
                  break;
                }

                throw new Error('Review id is not correct');

              case 4:
                _context7.next = 6;
                return this._fetchRequest(this.url + 'reviews/' + review_id + '/comments', token, 'POST', params);

              case 6:
                response = _context7.sent;
                headersData = {
                  canModerate: parseInt(response.headers.get('X-Can-Moderate'))
                };
                _context7.t0 = _extends;
                _context7.t1 = {};
                _context7.t2 = headersData;
                _context7.next = 13;
                return response.json();

              case 13:
                _context7.t3 = _context7.sent;
                _context7.t4 = {
                  items: _context7.t3
                };
                return _context7.abrupt('return', (0, _context7.t0)(_context7.t1, _context7.t2, _context7.t4));

              case 16:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function replayTheReview(_x13, _x14) {
        return _ref7.apply(this, arguments);
      }

      return replayTheReview;
    }()

    /**
     * Return request review comments list.
     * @param review_id {Number} ID of the parent review
     * @returns {Object} <pre>{
     * "canModerate": 1,
     * "items":
     *  {
     *   "id": 1,
     *   "review_id": 1,
     *   "content": "I had font problem with flash cms. Now I have no problem with html",
     *   "created_at": 1469607948519,
     *   "user_id": 123,
     *   "vote_up": 0,
     *   "vote_down": 0,
     *   "_links": {"self":{"href":"http://service-reviews.dev/api/v1/reviews/1/comment/1"}}
     *   }
     *  }</pre>
     * @method Reviews#requestReviewComments
     */

  }, {
    key: 'requestReviewComments',
    value: function () {
      var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(review_id) {
        var response, headersData;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (this._isValidId(review_id)) {
                  _context8.next = 2;
                  break;
                }

                throw new Error('Review id is not correct');

              case 2:
                _context8.next = 4;
                return this._fetchRequest(this.url + 'reviews/' + review_id + '/comments');

              case 4:
                response = _context8.sent;
                headersData = {
                  canModerate: parseInt(response.headers.get('X-Can-Moderate'))
                };
                _context8.t0 = _extends;
                _context8.t1 = {};
                _context8.t2 = headersData;
                _context8.next = 11;
                return response.json();

              case 11:
                _context8.t3 = _context8.sent;
                _context8.t4 = {
                  items: _context8.t3
                };
                return _context8.abrupt('return', (0, _context8.t0)(_context8.t1, _context8.t2, _context8.t4));

              case 14:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function requestReviewComments(_x16) {
        return _ref8.apply(this, arguments);
      }

      return requestReviewComments;
    }()

    /**
     * Return votes of the review.
     * @param token {String} Access token
     * @param id {Number} ID of the comment
     * @param review_id {Number} ID of the parent review
     * @returns {Object} <pre>{
     * "canModerate": 1,
     * "items":
     *  {
     *
     *   "id": 1,
     *   "review_id": 1,
     *   "content": "I had font problem with flash cms. Now I have no problem with html",
     *   "created_at": 1469607948519,
     *   "user_id": 123,
     *   "vote_up": 0,
     *   "vote_down": 0,
     *   "_links": {"self":{"href":"http://service-reviews.dev/api/v1/reviews/1/comment/1"}}
     *   }
     *  }</pre>
     * @method Reviews#voteComments
     */

  }, {
    key: 'voteComments',
    value: function () {
      var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(token, id, review_id) {
        var response, headersData;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (token.length) {
                  _context9.next = 2;
                  break;
                }

                throw new Error('Token not found');

              case 2:
                if (this._isValidId(id)) {
                  _context9.next = 4;
                  break;
                }

                throw new Error('Id is not correct');

              case 4:
                if (this._isValidId(review_id)) {
                  _context9.next = 6;
                  break;
                }

                throw new Error('Review id is not correct');

              case 6:
                _context9.next = 8;
                return this._fetchRequest(this.url + 'reviews/' + review_id + '/comments/' + id, token, 'POST');

              case 8:
                response = _context9.sent;
                headersData = {
                  canModerate: parseInt(response.headers.get('X-Can-Moderate'))
                };
                _context9.t0 = _extends;
                _context9.t1 = {};
                _context9.t2 = headersData;
                _context9.next = 15;
                return response.json();

              case 15:
                _context9.t3 = _context9.sent;
                _context9.t4 = {
                  items: _context9.t3
                };
                return _context9.abrupt('return', (0, _context9.t0)(_context9.t1, _context9.t2, _context9.t4));

              case 18:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function voteComments(_x17, _x18, _x19) {
        return _ref9.apply(this, arguments);
      }

      return voteComments;
    }()

    /**
     * Return comments information for given identifiers.
     * @param params {Object} Comments parameters
     * @returns {Object} <pre>{
     * "currentPageIndex":1,
     * "totalCount":11,
     * "lastPageIndex":6,
     * "items": [
     *  {
     *    "id":23,
     *    "status":4,
     *    "user_id":21543,
     *    "user_name":"mice mice",
     *    "title":"comment title",
     *    "content":"comment content",
     *    "template_id":58444,
     *    "vote_up":0,
     *    "vote_down":0,
     *    "created_at": 1469607948519,
     *    "updated_at": 1469607948519,
     *    "author": "user",
     *    "_links":{"self":{"href":"http://service-reviews.dev/api/v1/reviews/23"}}
     *   }, ...]
     *  }</pre>
     *  @method Comments#getComments
     */

  }, {
    key: 'getComments',
    value: function () {
      var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var response, paginationData;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                params = _extends({}, params);
                _context10.next = 3;
                return this._fetchRequest(this.url + 'qas?' + (0, _plasmaSerialize2.default)(params));

              case 3:
                response = _context10.sent;
                paginationData = {
                  currentPageIndex: parseInt(response.headers.get('x-pagination-current-page')),
                  totalCount: parseInt(response.headers.get('x-pagination-total-count')),
                  lastPageIndex: parseInt(response.headers.get('x-pagination-page-count')),
                  canModerate: parseInt(response.headers.get('x-can-moderate'))
                };
                _context10.t0 = _extends;
                _context10.t1 = {};
                _context10.t2 = paginationData;
                _context10.next = 10;
                return response.json();

              case 10:
                _context10.t3 = _context10.sent;
                _context10.t4 = {
                  items: _context10.t3
                };
                return _context10.abrupt('return', (0, _context10.t0)(_context10.t1, _context10.t2, _context10.t4));

              case 13:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getComments() {
        return _ref10.apply(this, arguments);
      }

      return getComments;
    }()
  }, {
    key: 'addComment',


    /**
     * Add new QA
     * @param token {String} Access token
     * @param params {Object} Body parameters
     * @returns {Object} <pre>{
     * "canModerate": 1,
     * "items":
     *  {
     *     "id": 1,
     *     "status": "pending",
     *     "user_id": 12345,
     *     "user_name": "John Doe",
     *     "user_email": "jho***@gmail.com",
     *     "content": "I had font problem with flash cms. Now I have no problem with html",
     *     "template_id": 55555,
     *     "created_at": 1469607948519,
     *     "updated_at": 1469607948519,
     *     "vote_up": 0,
     *     "vote_down": 0,
     *     "locale": "en",
     *     "author": "moderator"
     *     "_links": {"self":{"href":"http://service-reviews.dev/api/v1/qas/1"}}
     *  }</pre>
     * @method Reviews#addComment
     */
    value: function () {
      var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(token) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var response, headersData;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (token.length) {
                  _context11.next = 2;
                  break;
                }

                throw new Error('Token not found');

              case 2:
                _context11.next = 4;
                return this._fetchRequest(this.url + 'qas', token, 'POST', params);

              case 4:
                response = _context11.sent;

                if (!(response.status >= 400)) {
                  _context11.next = 7;
                  break;
                }

                throw new Error('Bad server response');

              case 7:
                headersData = {
                  canModerate: parseInt(response.headers.get('X-Can-Moderate'))
                };
                _context11.t0 = _extends;
                _context11.t1 = {};
                _context11.t2 = headersData;
                _context11.next = 13;
                return response.json();

              case 13:
                _context11.t3 = _context11.sent;
                _context11.t4 = {
                  items: _context11.t3
                };
                return _context11.abrupt('return', (0, _context11.t0)(_context11.t1, _context11.t2, _context11.t4));

              case 16:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function addComment(_x21) {
        return _ref11.apply(this, arguments);
      }

      return addComment;
    }()

    /**
     * Check for correct id
     * @param id {Number}
     * @returns {boolean}
     * @private
     */

  }, {
    key: '_isValidId',
    value: function _isValidId(id) {
      return typeof id == 'number' && id > 0;
    }
  }, {
    key: '_fetchRequest',
    value: function () {
      var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee12(url) {
        var token = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
        var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var headers, responseData, response;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                headers = {};

                if (token) {
                  headers['Authorization'] = token;
                }
                if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
                  headers['content-type'] = 'application/x-www-form-urlencoded';
                }
                responseData = {
                  method: method,
                  headers: new Headers(headers)
                };

                if (Object.keys(params).length) {
                  responseData['body'] = (0, _plasmaSerialize2.default)(params);
                }
                _context12.next = 7;
                return (0, _isomorphicFetch2.default)(url, responseData);

              case 7:
                response = _context12.sent;

                if (!(response.status >= 400)) {
                  _context12.next = 10;
                  break;
                }

                throw new Error('Bad server response');

              case 10:
                return _context12.abrupt('return', response);

              case 11:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function _fetchRequest(_x23) {
        return _ref12.apply(this, arguments);
      }

      return _fetchRequest;
    }()
  }]);

  return Review;
}();

exports.default = Review;