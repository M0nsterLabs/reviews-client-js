import {assert} from 'chai';
import Reviews from '../src/Reviews';
import nock from 'nock';

const serviceURL = 'http://service-reviews.dev/api/v1';

describe('Reviews API', function () {
  beforeEach(function () {
    this.api = new Reviews(serviceURL, 'en');
    this.token = 'qrewqrtqtraessrtgewrtec';
    this.nockPost = function(request, data, headers = {}){nock(serviceURL).post(request).reply(200, data, headers);};
    this.nockGet = function(request, data, headers = {}) {nock(serviceURL).get(request).reply(200, data, headers);};
    this.getReviewsResult = [{id: 23, status: 4}];
  });

  it('getReviews result', function (done) {
    const mockData = {currentPageIndex: 0, totalCount: 0, lastPageIndex: 0, items: this.getReviewsResult};
    this.nockGet('/reviews?locale=en', this.getReviewsResult,  {'x-pagination-current-page': 0, 'x-pagination-total-count': 0, 'x-pagination-page-count': 0});
    this.api.getReviews().then(response => {
      assert.deepEqual(response, mockData);
      done();
    }).catch(done);
  });

  it('approveReview result', function (done) {
    const mockData = {canModerate: 1, item: this.getReviewsResult[0]};
    this.nockPost('/reviews/approve/23', this.getReviewsResult[0], {'X-CAN-MODERATE': 1} );
    this.api.approveReview(this.token, 23).then(response => {
      assert.deepEqual(response, mockData);
      done();
    }).catch(done);
  });

  it('completeReview result', function (done) {
    const mockData = {canModerate: 1, item: this.getReviewsResult[0]};
    this.nockPost('/reviews/23', this.getReviewsResult[0], {'X-CAN-MODERATE': 1} );
    this.api.completeReview(this.token, 23).then(response => {
      assert.deepEqual(response, mockData);
      done();
    }).catch(done);
  });

  it('declineReview result', function (done) {
    const mockData = {canModerate: 1, item: this.getReviewsResult[0]};
    this.nockPost('/reviews/decline/23', this.getReviewsResult[0], {'X-CAN-MODERATE': 1} );
    this.api.declineReview(this.token, 23).then(response => {
      assert.deepEqual(response, mockData);
      done();
    }).catch(done);
  });

  it('addReviewVote result', function (done) {
    const mockData = {canModerate: 1, item: this.getReviewsResult[0]};
    this.nockPost('/reviews/23', this.getReviewsResult[0], {'X-CAN-MODERATE': 1} );
    this.api.addReviewVote(this.token, 23).then(response => {
      assert.deepEqual(response, mockData);
      done();
    }).catch(done);
  });

  it('replayTheReview result', function (done) {
    const mockData = {canModerate: 1, item: this.getReviewsResult[0]};
    this.nockPost('/reviews/1/comments', this.getReviewsResult[0], {'X-CAN-MODERATE': 1} );
    this.api.replayTheReview(this.token, 1).then(response => {
      assert.deepEqual(response, mockData);
      done();
    }).catch(done);
  });

  it('requestReviewComments result', function (done) {
    const mockData = {canModerate: 1, item: this.getReviewsResult[0]};
    this.nockGet('/reviews/1/comments', this.getReviewsResult[0],  {'X-CAN-MODERATE': 1});
    this.api.requestReviewComments(1).then(response => {
      assert.deepEqual(response, mockData);
      done();
    }).catch(done);
  });

  it('voteComments result', function (done) {
    const mockData = {canModerate: 1, item: this.getReviewsResult[0]};
    this.nockPost('/reviews/1/comments/23', this.getReviewsResult[0], {'X-CAN-MODERATE': 1} );
    this.api.voteComments(this.token, 23, 1).then(response => {
      assert.deepEqual(response, mockData);
      done();
    }).catch(done);
  });
});
