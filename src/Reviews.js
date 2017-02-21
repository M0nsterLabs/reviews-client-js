import fetch from 'isomorphic-fetch';

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
   * @returns {Array}
   * @method Reviews#getReviews
   */
  async getReviews(params = {}) {
    params = {...params, ...{locale: this.locale}};
    const response = await fetch(`${this.url}/reviews?${this._serialize(params)}`);
    if (response.status >= 400) {
      throw new Error('Bad server response');
    }
    return await response.json();
  };

  /**
   * Return review information for given identifiers.
   * @param token {string} User token
   * @param params {Object} Reviews parameters
   * @returns {Array}
   * @method Reviews#getReviewsClient
   */
  getReviewsClient = (token, params = {}) => { return false; };

  /**
   * Convert a js object into a query string
   * @param obj
   * @returns {string}
   * @private
   */
  _serialize(obj) {
    let str = [];
    for (let p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
      }
    return str.join("&");
  }
}