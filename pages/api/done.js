import connectToDatabase from '../../util/mongodb';
var mongodb = require('mongodb');

export default async function handler(req, res) {
	const { db } = await connectToDatabase();
	const id = req.query._id;

	await db
		.collection('todo')
		.updateOne({ _id: mongodb.ObjectId(id) }, { $set: { done: req.body.done } })
		.then((obj) => {
			res.json({ obj });
		})
		.catch((err) => {
			// eslint-disable-next-line no-console
			console.log('Error: ' + err);
		});
}
