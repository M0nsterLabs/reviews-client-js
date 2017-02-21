import fetch from 'isomorphic-fetch';
import _ from 'lodash';

/**
 * Products API JS client.
 *
 * In order to use Products API you should create an instance of this class.
 * ~~~~
 * import Products from "tm-products-api-client-js";
 * const products = new Products ('http://api.templatemonster.com/products/v1', 'en');
 * const list = products.getProducts ([12345, 55555]);
 * ~~~~
 * @constructor Products
 */
export default class Products {
	constructor(url, locale) {
		this.url = url;
		this.locale = locale;
		this.getProducts = this.getProducts.bind(this);
	}


	/**
	 * Return product information for given identifiers.
	 * @param ids {int[]} Product identifiers
	 * @returns {*}
	 * @method Products#getProducts
	 */
	async getProducts(ids) {
		if (!_.isArray(ids)) {
			throw new Error("An array was expected");
		}

		const url = this.url + "/products/" + this.locale + "?" + this._serialize({ids: ids, is_adult: 0});
		const response = await fetch(url);

		if (response.status >= 400) {
			throw new Error("Bad server response");
		}

		return await response.json();
	}


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
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
		return str.join("&");
	}
}
