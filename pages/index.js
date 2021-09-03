import Head from 'next/head';
import connectToDatabase from '../util/mongodb';
import Main from '../components/Main';
import { Center } from '@chakra-ui/react';
import useSWR from 'swr';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

export default function Home({ isConnected }) {
	const { data, error } = useSWR('/api/todos', {
		initialData: isConnected,
		revalidateOnMount: true,
	});
	if (error)
		return <Center mt='25%'>failed to load Please try again ...</Center>;
	if (!data)
		return (
			<Center mt='25%'>
				<Loader
					type='Puff'
					color='#00BFFF'
					height={100}
					width={100}
					timeout={3000} //3 secs
				/>
			</Center>
		);

	return (
		<div className='container'>
			<Head>
				<title>Just Do It </title>
			</Head>

			{!isConnected ? (
				<Center mt='25%'>Lodding ...</Center>
			) : (
				<Main data={data} />
			)}
		</div>
	);
}

export async function getStaticProps() {
	//const client = await connectToDatabase();

	// client.db() will be the default database passed in the MONGODB_URI
	// You can change the database by calling the client.db() function and specifying a database like:
	// const db = client.db("myDatabase");
	// Then you can execute queries against your database like so:
	// db.find({}) or any of the MongoDB Node Driver commands
	const { db } = await connectToDatabase();
	const data = await db.collection('todo').find({}).toArray();
	const isConnected = await JSON.parse(JSON.stringify(data));

	return {
		props: {
			isConnected,
		},
		revalidate: 1,
	};
}
