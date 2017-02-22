import {assert} from 'chai';
import {expect} from 'chai';
import Reviews from '../src/Reviews';
import serialize from 'tm-serialize';

import fetch from 'isomorphic-fetch';

const getReviewsResult = [{
  id          : 23,
  status      : 4,
  user_id     : 21543,
  user_name   : 'mice mice',
  title       : 'review title',
  content     : 'review content',
  score       : 5,
  template_id : 58444,
  vote_up     : 0,
  vote_down   : 0,
  _links      : {self : {href : 'http://service-reviews.dev/api/v1/reviews/23'}}
}, {
  id          : 22,
  status      : 4,
  user_id     : 21543,
  user_name   : 'mice mice',
  title       : 'review title 22',
  content     : 'some content 22',
  score       : 5,
  template_id : 58444,
  vote_up     : 0,
  vote_down   : 0,
  _links      : {self : {href : 'http://service-reviews.dev/api/v1/reviews/22'}}
}
];
const serviceURL = 'http://service-reviews.dev/api/v1';

describe('Reviews API', function () {
  before(function (done) {
    this.api = new Reviews(serviceURL, 'en');
    this.token = null;
    fetch('http://service-users.dev/api/v1/users/login', {
      method  : 'POST',
      headers : new Headers({
        'content-type' : "application/x-www-form-urlencoded"
      }),
      body    : serialize({
        scope    : 'reviews',
        login    : 'viram@templatemonster.me',
        password : 'mykhaylyak'
      })
    }).then(response => {
      return response.json();
    }).then(response => {
      this.token = response.access_token;
      done();
    }).catch(done);
  });

  it('getReviews result', function (done) {
    this.api.getReviews({
      'per-page' : 2
    }).then(response => {
      assert.deepEqual(getReviewsResult, response.items);
      done();
    }).catch(done);
  });
});
