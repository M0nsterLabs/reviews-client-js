import {assert} from 'chai';
import Review from '../../src/Review';
import nock from 'nock';
const serviceURL = 'http://service-reviews.dev/api/v1';
describe('Reviews API Unit', function () {
  beforeEach(function () {
    this.api = new Review(serviceURL);
    this.token = 'qrewqrtqtraessrtgewrtec';
    this.getReviewsResult = [{id: 23, status: 4}];
    this.getCommentsResult = {id: 1, status: 'approved'};
    this.assertResponse = function (p, d, done) {
      p.then ((response) => {
        assert.deepEqual (response, d);
        done ();
      }).catch (done);
    };
    this.defaultResponse = {items: this.getReviewsResult[0], canModerate: 1};
    this.nockPost = function (request, data) {
      nock(serviceURL).post(request).reply(200, data, {'X-Can-Moderate': 1});
    };
    this.nockPatch = function (request, data) {
      nock(serviceURL).patch(request).reply(200, data, {'X-Can-Moderate': 1});
    };
    this.nockPut = function (request, data) {
      nock(serviceURL).put(request).reply(200, data, {'X-Can-Moderate': 1});
    };
    this.nockGet = function(request, data, headers = {}) {
      nock(serviceURL).get(request).reply(200, data, headers)
    };
  });
  it('getReviews result', function (done) {
    const mockData = {currentPageIndex: 0, totalCount: 0, lastPageIndex: 0, canModerate: 0, items: this.getReviewsResult};
    this.nockGet('reviews?', this.getReviewsResult,  {'x-pagination-current-page': 0, 'x-pagination-total-count': 0, 'x-pagination-page-count': 0, 'x-can-moderate': 0});
    this.assertResponse (this.api.getReviews(), mockData, done);
  });
  it('getReviewsUser result', function (done) {
    const mockData = {currentPageIndex: 0, totalCount: 0, lastPageIndex: 0, canModerate: 1, poweredBy: '', items: this.getReviewsResult};
    this.nockGet('reviews/users?', this.getReviewsResult,  {'x-pagination-current-page': 0, 'x-pagination-total-count': 0, 'x-pagination-page-count': 0, 'X-Can-Moderate': 1, 'X-Powered-By': ''});
    this.assertResponse (this.api.getReviewsUser(), mockData, done);
  });
  it('approveReview result', function (done) {
    this.nockPost('reviews/approve/23', this.defaultResponse.items);
    this.assertResponse (this.api.approveReview(this.token, 23), this.defaultResponse, done);
  });
  it('completeReview result', function (done) {
    this.nockPut('reviews/23', this.defaultResponse.items);
    this.assertResponse (this.api.completeReview(this.token, 23), this.defaultResponse, done);
  });
  it('declineReview result', function (done) {
    this.nockPost('reviews/decline/23', this.defaultResponse.items);
    this.assertResponse (this.api.declineReview(this.token, 23), this.defaultResponse, done);
  });
  it('addReviewVote result', function (done) {
    this.nockPatch('reviews/23', this.defaultResponse.items);
    this.assertResponse (this.api.addReviewVote(this.token, 23), this.defaultResponse, done);
  });
  it('replayTheReview result', function (done) {
    this.nockPost('reviews/1/comments', this.defaultResponse.items);
    this.assertResponse (this.api.replayTheReview(this.token, 1), this.defaultResponse, done);
  });
  it('requestReviewComments result', function (done) {
    this.nockGet('reviews/1/comments', this.getReviewsResult[0],  {'X-Can-Moderate': 1});
    this.assertResponse (this.api.requestReviewComments(1), this.defaultResponse, done);
  });
  it('voteComments result', function (done) {
    this.nockPost('reviews/1/comments/23', this.defaultResponse.items);
    this.assertResponse (this.api.voteComments(this.token, 23, 1), this.defaultResponse, done);
  });
  it('getComments result', function (done) {
    const mockData = {currentPageIndex: 0, totalCount: 0, lastPageIndex: 0, canModerate: 1, items: this.getCommentsResult};
    this.nockGet('qas?', this.getCommentsResult, {'x-pagination-current-page': 0, 'x-pagination-total-count': 0, 'x-pagination-page-count': 0, 'X-Can-Moderate': 1});
    this.assertResponse (this.api.getComments(), mockData, done);
  });
  it('getCommentsUser result', function (done) {
    const mockData = {currentPageIndex: 0, totalCount: 0, lastPageIndex: 0, canModerate: 1, items: this.getCommentsResult};
    this.nockGet('qas/users?', this.getCommentsResult, {'x-pagination-current-page': 0, 'x-pagination-total-count': 0, 'x-pagination-page-count': 0, 'X-Can-Moderate': 1});
    this.assertResponse (this.api.getCommentsUser(), mockData, done);
  });
  it('addComment result', function (done) {
    this.nockPost('qas', this.getReviewsResult[0]);
    this.assertResponse (this.api.addComment(this.token, this.getReviewsResult[0]), this.defaultResponse, done);
  });
  it('addCommentVote result', function (done) {
    this.nockPatch('qas/23', this.getReviewsResult[0]);
    this.assertResponse (this.api.addCommentVote(this.token, 23, this.getReviewsResult[0]), this.defaultResponse, done);
  });
});
