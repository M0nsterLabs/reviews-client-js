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



  it('addReviewVote result', function (done) {
    const mockRequest = {
      id: 23,
      vote_up: 0,
      vote_down: 0
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

    this.api.addReviewVote(this.token, 23).then(response => {
      assert.deepEqual(response, mockData);
      done();
    }).catch(done);
  });



  it('replayTheReview result', function (done) {
    const mockRequest = {
      id: 23,
      review_id: 1,
      vote_up: 0,
      vote_down: 0
    };
    const mockData = {
      canModerate: 1,
      item: mockRequest
    };

    nock(serviceURL)
      .post('/reviews/1/comments')
      .reply(200, mockRequest, {
        'X-CAN-MODERATE': 1
      });

    this.api.replayTheReview(this.token, 1).then(response => {
      assert.deepEqual(response, mockData);
      done();
    }).catch(done);
  });



  it('requestReviewComments result', function (done) {
    const mockRequest = {
      id: 23,
      review_id: 1,
      content: 'I had font problem with flash cms. Now I have no problem with html'
    };
    const mockData = {
      canModerate: 1,
      item: mockRequest
    };

    nock(serviceURL)
      .get('/reviews/1/comments')
      .reply(200, mockRequest, {
        'X-CAN-MODERATE': 1
      });

    this.api.requestReviewComments(1).then(response => {
      assert.deepEqual(response, mockData);
      done();
    }).catch(done);
  });



  it('voteComments result', function (done) {
    const mockRequest = {
      id: 23,
      review_id: 1,
      vote_up: 0,
      vote_down: 0
    };
    const mockData = {
      canModerate: 1,
      item: mockRequest
    };

    nock(serviceURL)
      .post('/reviews/1/comments/23')
      .reply(200, mockRequest, {
        'X-CAN-MODERATE': 1
      });

    this.api.voteComments(this.token, 23, 1).then(response => {
      assert.deepEqual(response, mockData);
      done();
    }).catch(done);
  });

});
