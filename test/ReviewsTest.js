import {assert} from 'chai';
import Reviews from '../src/Reviews';

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
  beforeEach(function () {
    this.api = new Reviews(serviceURL, 'en');
  });

  it('getReviews result', function () {
    this.api.getReviews({
      'per-page' : 2
    }).then(response => {
      console.log('123', 123);
      assert.equal(getReviewsResult, response);
    });

  });

  //it('getReviewsClient result', function () {
  //  assert.equal(getReviewsResult, this.api.getReviewsClient());
  //});
});
