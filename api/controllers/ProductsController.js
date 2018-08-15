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
	detail: (req, res) =>{
		let sql = 'SELECT * FROM PRODUCTS WHERE ID = ?';
		db.query(sql, [req.params.productId], (err, response) =>{
			if (err) throw err;

			res.json(response);
		})
	},

	store: (req, res) =>{
		let data = req.body;
		let sql = 'INSERT INTO products SET ?';
		console.log(data)
		db.query(sql, [data], (err, response) => {
			if(err) throw err

			res.json({message: 'inset success'});
		})
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