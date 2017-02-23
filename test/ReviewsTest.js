import {assert, expect} from 'chai';
import Reviews from '../src/Reviews';
import serialize from 'tm-serialize';
import nock from 'nock';

const serviceURL = 'http://service-reviews.dev/api/v1';

describe('Reviews API', function () {
  beforeEach(function () {
    this.api = new Reviews(serviceURL, 'en');
    this.token = 'qrewqrtqtraessrtgewrtec';
    this.willReturnGetResponse = function (url, data) {
      nock(serviceURL)
        .get(url)
        .reply(200, data);
    };

    this.willReturnPostResponse = function (url, data) {
      nock(serviceURL)
        .post(url)
        .reply(200, data);
    };

    this.willGetReturn404 = function (url, data) {
      nock(serviceURL)
        .get(url)
        .reply(404);
    };

    this.willPostReturn404 = function (url) {
      nock(serviceURL)
        .post(url)
        .reply(404);
    }
  });

  it('getReviews result', function (done) {
    const getReviewsResult = [{
      id: 23,
      status: 4
    }, {
      id: 22,
      status: 4
    }];

    const mockData = {
      currentPageIndex: 0,
      totalCount: 0,
      lastPageIndex: 0,
      items: getReviewsResult
    };

    nock(serviceURL)
      .get('/reviews?locale=en')
      .reply(200, getReviewsResult, {
        'x-pagination-current-page': 0,
        'x-pagination-total-count': 0,
        'x-pagination-page-count': 0
      });

    this.api.getReviews().then(response => {
      assert.deepEqual(response, mockData);
      done();
    }).catch(done);
  });



  it('approveReview result', function (done) {
    const mockRequest = {
      id: 23,
      status : 'initial'
    };
    const mockData = {
      canModerate: 1,
      item: mockRequest
    };

    nock(serviceURL)
      .post('/reviews/approve/23')
      .reply(200, mockRequest, {
        'X-CAN-MODERATE': 1
      });

    this.api.approveReview(this.token, 23).then(response => {
      assert.deepEqual(response, mockData);
      done();
    }).catch(done);
  });



  it('completeReview result', function (done) {
    const mockRequest = {
      id: 23,
      status : 'initial'
    };
    const mockData = {
      canModerate: 1,
      item: mockRequest
    };

    nock(serviceURL)
      .post('/reviews/23')
      .reply(200, mockRequest, {
        'X-CAN-MODERATE': 1
      });

    this.api.completeReview(this.token, 23).then(response => {
      assert.deepEqual(response, mockData);
      done();
    }).catch(done);
  });



  it('declineReview result', function (done) {
    const mockRequest = {
      id: 23,
      status : 'initial'
    };
    const mockData = {
      canModerate: 1,
      item: mockRequest
    };

    nock(serviceURL)
      .post('/reviews/decline/23')
      .reply(200, mockRequest, {
        'X-CAN-MODERATE': 1
      });

    this.api.declineReview(this.token, 23).then(response => {
      assert.deepEqual(response, mockData);
      done();
    }).catch(done);
  });

});
