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
   * Return approve review information for given identifiers.
   * @param token {String} Access token
   * @param id {Number} Review id
   * @returns {Object} <pre>{
   * "canModerate": 1,
   * "item":
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

    if (!this._idExist(id)) {
      throw new Error('Id is not correct');
    }

    const response = await fetch(`${this.url}/reviews/approve/${id}`, {
      method  : 'POST',
      headers: new Headers({
        'content-type' : 'application/x-www-form-urlencoded',
        'Authorization' : token
      })
    });

    if (response.status >= 400) {
      throw new Error('Bad server response');
    }

    const headersData   = {
      canModerate: parseInt(response.headers.get('X-CAN-MODERATE'))
    };

    return {
      ...headersData,
      item: await response.json()
    };
  }

  /**
   * Return complete review information for given identifiers.
   * @param token {String} Access token
   * @param id {Number} Review id
   * @returns {Object} <pre>{
   * "canModerate": 1,
   * "item":
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
  async completeReview (token, id) {
    if (!token.length) {
      throw new Error('Token not found');
    }

    if (!this._idExist(id)) {
      throw new Error('Id is not correct');
    }

    const response = await fetch(`${this.url}/reviews/${id}`, {
      method  : 'POST',
      headers: new Headers({
        'content-type' : 'application/x-www-form-urlencoded',
        'Authorization' : token
      })
    });

    if (response.status >= 400) {
      throw new Error('Bad server response');
    }

    const headersData   = {
      canModerate: parseInt(response.headers.get('X-CAN-MODERATE'))
    };

    return {
      ...headersData,
      item: await response.json()
    };
  }

  /**
   * Return decline review information for given identifiers.
   * @param token {String} Access token
   * @param id {Number} Review id
   * @returns {Object} <pre>{
   * "canModerate": 1,
   * "item":
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

    if (!this._idExist(id)) {
      throw new Error('Id is not correct');
    }

    const response = await fetch(`${this.url}/reviews/decline/${id}`, {
      method  : 'POST',
      headers: new Headers({
        'content-type' : 'application/x-www-form-urlencoded',
        'Authorization' : token
      })
    });

    if (response.status >= 400) {
      throw new Error('Bad server response');
    }

    const headersData   = {
      canModerate: parseInt(response.headers.get('X-CAN-MODERATE'))
    };

    return {
      ...headersData,
      item: await response.json()
    };
  }

  /**
   * Return add the review vote: increment vote_up or vote_down field.
   * @param token {String} Access token
   * @param id {Number} Review id
   * @returns {Object} <pre>{
   * "canModerate": 1,
   * "item":
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
  async addReviewVote (token, id) {
    if (!token.length) {
      throw new Error('Token not found');
    }

    if (!this._idExist(id)) {
      throw new Error('Id is not correct');
    }

    const response = await fetch(`${this.url}/reviews/${id}`, {
      method  : 'POST',
      headers: new Headers({
        'content-type' : 'application/x-www-form-urlencoded',
        'Authorization' : token
      })
    });

    if (response.status >= 400) {
      throw new Error('Bad server response');
    }

    const headersData   = {
      canModerate: parseInt(response.headers.get('X-CAN-MODERATE'))
    };

    return {
      ...headersData,
      item: await response.json()
    };
  }

  /**
   * Return reply the review information for given identifiers.
   * @param token {String} Access token
   * @param review_id {Number} ID of the parent review
   * @returns {Object} <pre>{
   * "canModerate": 1,
   * "item":
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
  async replayTheReview (token, review_id) {
    if (!token.length) {
      throw new Error('Token not found');
    }

    if (!this._idExist(review_id)) {
      throw new Error('Review id is not correct');
    }

    const response =  await fetch(`${this.url}/reviews/${review_id}/comments`, {
      method  : 'POST',
      headers: new Headers({
        'content-type' : 'application/x-www-form-urlencoded',
        'Authorization' : token
      })
    });

    if (response.status >= 400) {
      throw new Error('Bad server response');
    }

    const headersData   = {
      canModerate: parseInt(response.headers.get('X-CAN-MODERATE'))
    };

    return {
      ...headersData,
      item: await response.json()
    };
  }

  /**
   * Return request review comments list.
   * @param review_id {Number} ID of the parent review
   * @returns {Object} <pre>{
   * "canModerate": 1,
   * "item":
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
    if (!this._idExist(review_id)) {
      throw new Error('Review id is not correct');
    }

    const response = await fetch(`${this.url}/reviews/${review_id}/comments`);

    if (response.status >= 400) {
      throw new Error('Bad server response');
    }

    const headersData   = {
      canModerate: parseInt(response.headers.get('X-CAN-MODERATE'))
    };

    return {
      ...headersData,
      item: await response.json()
    };
  }

  /**
   * Return vote the review comment.
   * @param token {String} Access token
   * @param id {Number} ID of the comment
   * @param review_id {Number} ID of the parent review
   * @returns {Object} <pre>{
   * "canModerate": 1,
   * "item":
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

    if (!this._idExist(id)) {
      throw new Error('Id is not correct');
    }

    if (!this._idExist(review_id)) {
      throw new Error('Review id is not correct');
    }

    const response =  await fetch(`${this.url}/reviews/${review_id}/comments/${id}`, {
      method  : 'POST',
      headers: new Headers({
        'content-type' : 'application/x-www-form-urlencoded',
        'Authorization' : token
      })
    });

    if (response.status >= 400) {
      throw new Error('Bad server response');
    }

    const headersData   = {
      canModerate: parseInt(response.headers.get('X-CAN-MODERATE'))
    };

    return {
      ...headersData,
      item: await response.json()
    };
  }


  /**
   * Check for correct id
   * @param id {Number}
   * @returns {boolean}
   * @private
   */
  _idExist (id) {
    return !(isNaN(id)) && (id !== null) && (id > 0);
  }
}