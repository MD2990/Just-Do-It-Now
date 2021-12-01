import Head from 'next/head';
import connectToDatabase from '../util/mongodb';
import Main from '../components/Main';
import { Center } from '@chakra-ui/react';
import useSWR from 'swr';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

export default function Home({  todo }) {
	const { data, error } = useSWR('/api/todos', {
		initialData: todo,
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
		<>
			<Head>
				<title>Just Do It </title>
			</Head>

			{!todo ? (
				<Center mt='25%'>Lodding ...</Center>
			) : (
				<Main data={data} />
			)}
		</>
	);
}

export async function getStaticProps() {

	const { db } = await connectToDatabase();
	const data = await db.collection('todo').find({}).toArray();
	const todo = await JSON.parse(JSON.stringify(data));

	return {
		props: {
			 todo,
		},
		revalidate: 1,
	};
}
