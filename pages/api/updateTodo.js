import connectToDatabase from '../../util/mongodb';
var mongodb = require('mongodb');

export default async function handler(req, res) {
	const { db } = await connectToDatabase();
	const id = req.query._id;

	await db
		.collection('todo')
		.updateOne({ _id: mongodb.ObjectId(id) }, { $set: { name: req.body.name } })
		.then((obj) => {
			res.json({ obj });
		})
		.catch((err) => {
			console.log('Error: ' + err);
		});
}
