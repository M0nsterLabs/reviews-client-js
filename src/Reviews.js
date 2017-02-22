import fetch from 'isomorphic-fetch';
import serialize from 'tm-serialize';

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

export default class Reviews {
  locale = null;
  url = null;

  constructor (url, locale = 'en') {
    this.locale = locale;
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
    params = {...params, ...{locale: this.locale}};
    const response = await fetch(`${this.url}/reviews?${serialize(params)}`);
    if (response.status >= 400) {
      throw new Error('Bad server response');
    }
    const paginationData   = {
      currentPageIndex: parseInt(response.headers.get('x-pagination-current-page')),
      totalCount: parseInt(response.headers.get('x-pagination-total-count')),
      lastPageIndex: parseInt(response.headers.get('x-pagination-page-count'))
    };

    return {
      ...paginationData,
      items: await response.json()
    };
  };

  /**
   * Return review information for given identifiers.
   * @param token {string} User token
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
   * @method Reviews#getReviewsClient
   */
  async getReviewsClient (token, params = {}) {
    params = {...params, ...{locale: this.locale}};
    if (!token.length) {
      throw new Error('Token not found');
    }
    const response = await fetch(`${this.url}/reviews/client?${serialize(params)}`,{
      headers: new Headers({
        'Authorization' : token
      })
    });
    console.log('response', response);
    if (response.status >= 400) {
      throw new Error('Bad server response');
    }
    const paginationData   = {
      currentPageIndex: parseInt(response.headers.get('x-pagination-current-page')),
      totalCount: parseInt(response.headers.get('x-pagination-total-count')),
      lastPageIndex: parseInt(response.headers.get('x-pagination-page-count'))
    };

    return {
      ...paginationData,
      items: await response.json()
    }
  };
}