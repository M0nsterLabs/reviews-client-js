import fetch from 'isomorphic-fetch';
import serialize from 'plasma-serialize';

/**
 * Comments API JS client.
 *
 * In order to use Comments API you should create an instance of this class.
 * ~~~~
 * import Comments from "tm-reviews-api-client-js";
 * const comments = new Comments ('http://api.templatemonster.com/reviews/v1', 'en');
 * const list = comments.getComments ([12345, 55555]);
 * ~~~~
 * @constructor Comments
 */

export default class Comments {
  url = null;

  constructor (url) {
    this.url = url;
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
   * @method Comments#getComments
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