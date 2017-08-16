import fetch from 'isomorphic-fetch';
import serialize from 'plasma-serialize';

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

export default class Review {
  url = null;

  constructor (url) {
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
  async getReviews(params = {}) {
    params = {...params};
    const response = await this._fetchRequest(`${this.url}reviews?${serialize(params)}`);
    const paginationData   = {
      currentPageIndex: parseInt(response.headers.get('x-pagination-current-page')),
      totalCount: parseInt(response.headers.get('x-pagination-total-count')),
      lastPageIndex: parseInt(response.headers.get('x-pagination-page-count')),
      canModerate: parseInt(response.headers.get('x-can-moderate'))
    };
    return {
      ...paginationData,
      items: await response.json()
    };
  };

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
  async getReviewsUser(params = {}) {
    const response = await this._fetchRequest(`${this.url}reviews/users?${serialize(params)}`);
    const paginationData   = {
      currentPageIndex: parseInt(response.headers.get('x-pagination-current-page')),
      totalCount: parseInt(response.headers.get('x-pagination-total-count')),
      lastPageIndex: parseInt(response.headers.get('x-pagination-page-count')),
      canModerate: parseInt(response.headers.get('x-can-moderate')),
      poweredBy: response.headers.get('X-Powered-By')
    };
    return {
      ...paginationData,
      items: await response.json()
    };
  };

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
  async approveReview (token, id) {
    if (!token.length) {
      throw new Error('Token not found');
    }
    if (!this._isValidId(id)) {
      throw new Error('Id is not correct');
    }
    const response = await this._fetchRequest(`${this.url}reviews/approve/${id}`, token, 'POST');
    const headersData   = {
      canModerate: parseInt(response.headers.get('X-Can-Moderate'))
    };
    return {
      ...headersData,
      items: await response.json()
    };
  }

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
  async completeReview (token, id, params={}) {
    if (!token.length) {
      throw new Error('Token not found');
    }
    if (!this._isValidId(id)) {
      throw new Error('Id is not correct');
    }
    const response = await this._fetchRequest(`${this.url}reviews/${id}`, token, 'PUT', params);
    const headersData   = {
      canModerate: parseInt(response.headers.get('X-Can-Moderate'))
    };
    return {
      ...headersData,
      items: await response.json()
    };
  }

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
  async declineReview (token, id) {
    if (!token.length) {
      throw new Error('Token not found');
    }
    if (!this._isValidId(id)) {
      throw new Error('Id is not correct');
    }
    const response = await this._fetchRequest(`${this.url}reviews/decline/${id}`, token, 'POST');
    if (response.status >= 400) {
      throw new Error('Bad server response');
    }
    const headersData   = {
      canModerate: parseInt(response.headers.get('X-Can-Moderate'))
    };
    return {
      ...headersData,
      items: await response.json()
    };
  }

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
  async addReviewVote (token, id, params={}) {
    if (!token.length) {
      throw new Error('Token not found');
    }
    if (!this._isValidId(id)) {
      throw new Error('Id is not correct');
    }
    const response = await this._fetchRequest(`${this.url}reviews/${id}`, token, 'PATCH', params);
    const headersData   = {
      canModerate: parseInt(response.headers.get('X-Can-Moderate'))
    };
    return {
      ...headersData,
      items: await response.json()
    };
  }

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
  async replayTheReview (token, review_id, params={}) {
    if (!token.length) {
      throw new Error('Token not found');
    }
    if (!this._isValidId(review_id)) {
      throw new Error('Review id is not correct');
    }
    const response = await this._fetchRequest(`${this.url}reviews/${review_id}/comments`, token, 'POST', params);
    const headersData   = {
      canModerate: parseInt(response.headers.get('X-Can-Moderate'))
    };
    return {
      ...headersData,
      items: await response.json()
    };
  }

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
  async requestReviewComments(review_id) {
    if (!this._isValidId(review_id)) {
      throw new Error('Review id is not correct');
    }
    const response = await this._fetchRequest(`${this.url}reviews/${review_id}/comments`);
    const headersData   = {
      canModerate: parseInt(response.headers.get('X-Can-Moderate'))
    };
    return {
      ...headersData,
      items: await response.json()
    };
  }

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
  async voteComments(token, id, review_id) {
    if (!token.length) {
      throw new Error('Token not found');
    }
    if (!this._isValidId(id)) {
      throw new Error('Id is not correct');
    }
    if (!this._isValidId(review_id)) {
      throw new Error('Review id is not correct');
    }
    const response = await this._fetchRequest(`${this.url}reviews/${review_id}/comments/${id}`, token, 'POST');
    const headersData   = {
      canModerate: parseInt(response.headers.get('X-Can-Moderate'))
    };
    return {
      ...headersData,
      items: await response.json()
    };
  }

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
  async getComments(params = {}) {
    params = {...params};
    const response = await this._fetchRequest(`${this.url}qas?${serialize(params)}`);
    const paginationData   = {
      currentPageIndex: parseInt(response.headers.get('x-pagination-current-page')),
      totalCount: parseInt(response.headers.get('x-pagination-total-count')),
      lastPageIndex: parseInt(response.headers.get('x-pagination-page-count')),
      canModerate: parseInt(response.headers.get('x-can-moderate'))
    };
    return {
      ...paginationData,
      items: await response.json()
    };
  };


  /**
   * Return users comments information for given identifiers.
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
   *  @method Comments#getCommentsUser
   */
  async getCommentsUser(params = {}) {
    params = {...params};
    const response = await this._fetchRequest(`${this.url}qas/users?${serialize(params)}`);
    const paginationData   = {
      currentPageIndex: parseInt(response.headers.get('x-pagination-current-page')),
      totalCount: parseInt(response.headers.get('x-pagination-total-count')),
      lastPageIndex: parseInt(response.headers.get('x-pagination-page-count')),
      canModerate: parseInt(response.headers.get('x-can-moderate'))
    };
    return {
      ...paginationData,
      items: await response.json()
    };
  };


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
  async addComment (token, params={} ) {
    if (!token.length) {
      throw new Error('Token not found');
    }
    const response = await this._fetchRequest(`${this.url}qas`, token, 'POST', params);
    if (response.status >= 400) {
      throw new Error('Bad server response');
    }
    const headersData   = {
      canModerate: parseInt(response.headers.get('X-Can-Moderate'))
    };
    return {
      ...headersData,
      items: await response.json()
    };
  }


  /**
   * Check for correct id
   * @param id {Number}
   * @returns {boolean}
   * @private
   */
  _isValidId (id) {
    return typeof id == 'number' && id > 0;
  }

  async _fetchRequest (url, token = false, method = 'GET', params={}) {
    const headers = {};
    if(token){
      headers['Authorization'] = token;
    }
    if(method === 'POST' || method === 'PUT' || method === 'PATCH') {
      headers['content-type'] = 'application/x-www-form-urlencoded';
    }
    let responseData = {
      method  : method,
      headers : new Headers(headers)
    };
    if (Object.keys(params).length) {
      responseData['body'] = serialize(params);
    }
    let response  = await fetch(url, responseData);
    if (response.status >= 400) {
      throw new Error('Bad server response');
    }
    return response;
  }
}