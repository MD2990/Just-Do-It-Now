import connectToDatabase from '../../util/mongodb';
var mongodb = require('mongodb');

export default async function handler(req, res) {
	const { db } = await connectToDatabase();

	const response = await db.collection('todo').deleteOne({
		_id: mongodb.ObjectId(req.body),
	});

	/* 	const response = await db
		.collection('todo')
		.deleteMany({ _id: req.body }, true); */

	res.json(response);
}
