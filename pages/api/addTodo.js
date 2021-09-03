import connectToDatabase from '../../util/mongodb';

export default async function handler(req, res) {
	const { db } = await connectToDatabase();

	const data = await db.collection('todo').insertOne(req.body);
	//console.log(connectToDatabase());
	//const { client } = await connectToDatabase();
	//console.log( client && client.close());
	res.json({ data });
}
