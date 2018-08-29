// controller
'use strict';

const util = require('util');
const mysql = require('mysql');
const db = require('./../db');

module.exports = {

	// get
	get: (req, res) => {
		let sql = 'SELECT * FROM PRODUCTS';
		db.query(sql, (err, response) =>{
			if(err) throw err;

			res.json(response);
		})
	},

	//detail
	detail: (req, res) => {
		let sql = 'SELECT * FROM PRODUCTS WHERE ID = ?';
		db.query(sql, [req.params.productId], (err, response) =>{
			if (err) throw err;

			res.json(response);
		})
	},

	store: (req, res) => {
		let data = req.body;
		let sql = 'INSERT INTO products (name, size, color) values ?';
		let arr = [];
		if(data.colors && data.sizes){
			arr = module.exports.createManyProduct(data);
		} else {
			arr.push(data);
		}
		console.log(arr)
		db.query(sql, [arr], (err, response) => {
			if(err) throw err
			res.json({message: 'insert success'});
		})
	},

	createManyProduct: (data) => {
		let arrColor = data.colors || [];
		let arrSize = data.sizes || [];
		let arr = [];
		// let sql = 'insert into products (name, size, color)	values ';
		for (var i = 0;i< arrColor.length; i++){
			for (var j = 0;j< arrSize.length; j++){
				let sql = ["name", arrColor[i],arrSize[j]];
				arr.push(sql);
			}	
		}
		return arr;
	},

	update: (req, res) => {
		//SET HEADER BEFORE RUN WITH POSTMAN OR OTHER APPLICATION TO TEST THIS API
		// .set('content-type', 'application/json')
		let sql = 'UPDATE products SET ? WHERE id = ?';
		let data = req.body;
		let productId = req.params.productId;
		db.query(sql, [data, productId], (err, reponse) => {
			if (err) throw err;

			res.json({message: 'updated succesfully'});
		})
	},

	delete: (req, res) => {
		let sql = 'DELETE FROM PRODUCTS WHERE ID = ?';

		db.query(sql, [req.params.productId], (err, response)=>{
			if (err) throw err;

			res.json({message: 'Delete product successfully'});
		})
	}

}