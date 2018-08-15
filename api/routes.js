//routes
'use strict';

module.exports = function(app){
	let productCtrl = require('./controllers/ProductsController');
	
	// to do
	app.route('/products')
		.get(productCtrl.get)
		.post(productCtrl.store);
		
	app.route('/products/:productId')
		.get(productCtrl.detail)
		.put(productCtrl.update)
		.delete(productCtrl.delete);
};