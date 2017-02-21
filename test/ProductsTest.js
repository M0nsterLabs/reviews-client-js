import Products from "../src/";
import {assert} from 'chai';
import nock from 'nock';

const serviceUrl = 'http://api.templatemonster.com/products/v1';
const singleTemplate12345 = {id: 12345, title: "Sample title"};
const singleTemplate55555 = {id: 55555, title: "Monstroid"};
const singleTemplate24963 = {id: 24963, title: "Wordpress theme"};


describe('Products API', function () {
	beforeEach(function () {
		this.api = new Products(serviceUrl, 'en');

		this.willReturnResponse = function (url, data) {
			nock(serviceUrl)
				.get(url)
				.reply(200, data);
		};

		this.willReturn404 = function (url) {
			nock(serviceUrl)
				.get(url)
				.reply(404);
		}
	});


	it('converts an object to query string', function () {
		assert.equal(this.api._serialize({a: 1}), 'a=1');
		assert.equal(this.api._serialize({a: 1, b: 2}), 'a=1&b=2');
		assert.equal(this.api._serialize({a: 1, b: 2, c: [3, 4, 5]}), 'a=1&b=2&c=3%2C4%2C5');
		assert.equal(this.api._serialize({email: "enny+111@templatemonster.me"}), 'email=enny%2B111%40templatemonster.me');
	});


	it('gets product info', function (done) {
		this.willReturnResponse('/products/en?ids=12345&is_adult=0', [singleTemplate12345]);

		this.api.getProducts([12345]).then(function (response) {
			assert.deepEqual([singleTemplate12345], response);
			done();
		});
	});


	it('matches several ids', function (done) {
		this.willReturnResponse('/products/en?ids=12345%2C55555%2C24963&is_adult=0', [singleTemplate12345, singleTemplate55555, singleTemplate24963]);

		this.api.getProducts([12345, 55555, 24963]).then(function (response) {
			assert.deepEqual(response, [singleTemplate12345, singleTemplate55555, singleTemplate24963]);
			done();
		})
	});


	it('catches 404 errors', function (done) {
		this.willReturn404('/products/en?ids=12345&is_adult=0');

		this.api.getProducts([12345]).then(function (response) {
			assert.fail(true, false, "This branch should not have been called");
			done();
		}).catch((e) => {
			done();
		})
	});
});
