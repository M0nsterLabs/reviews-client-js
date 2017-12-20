import {assert} from 'chai';
import Review from '../../src/Review';
const serviceURL = 'http://service-reviews.dev/api/v1';
describe('Reviews API Functional', function () {
  beforeEach(function () {
    this.api = new Review(serviceURL);
    this.token = 'qrewqrtqtraessrtgewrtec';
  });

  it('_isValidId', function () {
    assert.isTrue(this.api._isValidId(1));
    assert.isFalse(this.api._isValidId(0));
    assert.isFalse(this.api._isValidId(null));
    assert.isFalse(this.api._isValidId());
  });
});
