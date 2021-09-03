import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { Button, Center, Input, Text } from '@chakra-ui/react';
import { MdAlarmAdd } from 'react-icons/md';
import connectToDatabase from '../../util/mongodb';
import Loader from 'react-loader-spinner';
import useSWR from 'swr';
import state from '../../store';
import { useSnapshot } from 'valtio';
var mongodb = require('mongodb');
export default function Edit({ isConnected }) {
	const { _id, name } = isConnected ? isConnected : { name: '', _id: '' };

	const router = useRouter();

	const snapshot = useSnapshot(state);
	const ref = useRef('');
	useEffect(() => {
		state.todoName = isConnected ? isConnected.name : '';
	}, [isConnected]);
	const { data, error } = useSWR('/api/findTodos?_id=' + _id, {
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const name = state.todoName;
		router.back();
		await fetch('/api/updateTodo?_id=' + _id, {
			method: 'PUT',
			body: JSON.stringify({ name }),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((response) => response.json());
	};

	return (
		<>
			<Center mt='10%' pl='25%' pr='25%'>
				<form onSubmit={handleSubmit}>
					<Text
						overflow='scroll'
						textOverflow='ellipsis'
						shadow='sm'
						p='4'
						maxW='40rem'
						maxH='10rem'
						textTransform='capitalize'
						letterSpacing='wide'
						fontSize='4xl'
						fontWeight='bold'
						color='green.500'
						mb='10%'
						textAlign='center'>
						{data.data.name}
					</Text>
					<Input
						textOverflow='ellipsis'
						overflow='hidden'
						maxW='40rem'
						fontSize='1.2rem'
						rounded='full'
						textAlign='center'
						size='lg'
						defaultValue={snapshot.todoName}
						isInvalid
						isRequired
						shadow='2xl'
						errorBorderColor='green.300'
						placeholder='Add New Todo'
						onChange={(e) => (state.todoName = e.target.value)}
					/>
					<Center>
						<Button
							type='submit'
							maxW='20rem'
							shadow='2xl'
							fontSize='1.2rem'
							size='lg'
							mt='2'
							rounded='full'
							colorScheme='teal'
							leftIcon={<MdAlarmAdd fontSize='2.1rem' />}>
							Edit & Save
						</Button>
					</Center>
				</form>
			</Center>
		</>
	);
}

export const getStaticProps = async ({ params }) => {
	const { db } = await connectToDatabase();
	const data = await db
		.collection('todo')
		.findOne({ _id: mongodb.ObjectId(params.id) });
	const isConnected = await JSON.parse(JSON.stringify(data));

	if (!data) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			isConnected,
		},
		revalidate: 1,
	};
};
export async function getStaticPaths() {
	const { db } = await connectToDatabase();
	const data = await db.collection('todo').find({}).toArray();
	const isConnected = await JSON.parse(JSON.stringify(data));

	const paths = isConnected.map((c) => ({
		params: { id: c._id.toString() },
	}));

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: true };
}

/* export async function getServerSideProps({ params }) {
	//const client = await connectToDatabase();

	// client.db() will be the default database passed in the MONGODB_URI
	// You can change the database by calling the client.db() function and specifying a database like:
	// const db = client.db("myDatabase");
	// Then you can execute queries against your database like so:
	// db.find({}) or any of the MongoDB Node Driver commands
	const { db } = await connectToDatabase();
	const data = await db
		.collection('todo')
		.findOne({ _id: mongodb.ObjectId(params.id) });

	const isConnected = JSON.parse(JSON.stringify(data));

	return {
		props: { isConnected },
	};
}
 */
