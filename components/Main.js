import {
	Heading,
	Avatar,
	Box,
	Center,
	Flex,
	Text,
	Stack,
	Button,
	Wrap,
	WrapItem,
	HStack,
} from '@chakra-ui/react';
import { MdAlarmAdd } from 'react-icons/md';
import { useRouter } from 'next/router';
import { Input } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import {
	FcCheckmark,
	FcAlarmClock,
	FcOk,
	FcSportsMode,
	FcTodoList,
} from 'react-icons/fc';

import { useSnapshot } from 'valtio';
import state from '../store';
import { colors } from '../lib/constent';

const AddTodo = () => {
	const ref = useRef('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const f = ref.current.value;
		ref.current.value = '';
		ref.current.focus();
		await fetch('/api/addTodo', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: f, isDone: false }),
		});
		const getData = await fetch('/api/todos').then((response) =>
			response.json(),
		);

		state.todos = getData.data;
	};
	return (
		<Center m='5%'>
			<Wrap>
				<WrapItem>
					<form onSubmit={handleSubmit}>
						<Input
							ref={ref}
							fontSize='xl'
							rounded='full'
							textAlign='center'
							size='lg'
							isInvalid
							isRequired
							errorBorderColor='green.200'
							placeholder='Add New Todo'
						/>
						<Stack>
							<Button
								fontSize='xl'
								mt='2'
								size='lg'
								rounded='full'
								type='submit'
								colorScheme='teal'
								leftIcon={<MdAlarmAdd fontSize='2.5rem' />}>
								Add
							</Button>
						</Stack>
					</form>
				</WrapItem>
			</Wrap>
		</Center>
	);
};

const ShowTodo = () => {
	const router = useRouter();
	const snap = useSnapshot(state);

	return (
		<>
			{snap.todos.map((todo, index) => {
				return (
					<WrapItem key={todo._id}>
						<Box
							p='4'
							textAlign='center'
							maxW='fit-content'
							w={'full'}
							bg={'white'}
							boxShadow={'2xl'}
							rounded={'md'}
							overflow={'hidden'}>
							<Box
								borderRadius='lg'
								shadow='lg'
								bgGradient={`linear(to-r,${colors.green} , ${colors.blue})`}
								w='full'
								h='20'></Box>
							<Flex justify={'center'} mt={-12}>
								<Avatar
									cursor='pointer'
									p='3'
									bg='whitesmoke'
									size={'xl'}
									onClick={async () => {
										const done = (state.todos[index].isDone = !todo.isDone);

										await fetch('/api/doneTodo?_id=' + todo._id, {
											method: 'PUT',
											body: JSON.stringify({ isDone: done }),
											headers: {
												'Content-Type': 'application/json',
											},
										}).then((response) => response.json());
									}}
									icon={
										todo.isDone ? (
											<FcCheckmark fontSize='5.5rem' />
										) : (
											<FcAlarmClock fontSize='5.5rem' />
										)
									}
									alt={'Author'}
								/>
							</Flex>

							<Center>
								<Heading
									isTruncated
									textOverflow='ellipsis'
									overflow='hidden'
									maxW='20rem'
									maxH='20rem'
									fontSize={'2xl'}
									fontWeight={500}
									textDecor={todo.isDone && 'line-through'}>
									{todo.name}
								</Heading>
							</Center>

							<HStack spacing='4' p='4' align='center'>
								<Button
									w={'full'}
									bg={'tomato'}
									color={'white'}
									rounded={'full'}
									_hover={{
										transform: 'translateY(-2px)',
										boxShadow: 'lg',
									}}
									onClick={async () => {
										state.todos = state.todos.filter(
											(to) => todo._id !== to._id,
										);

										await fetch('/api/delTodo', {
											method: 'DELETE',
											headers: { 'Content-Type': 'application/json' },
											body: JSON.stringify(todo._id),
										});
										const getData = await fetch('/api/todos').then((response) =>
											response.json(),
										);

										state.todos = getData.data;
									}}>
									Delete
								</Button>

								<Button
									w={'full'}
									bg={'blackAlpha.500'}
									color={'white'}
									rounded={'full'}
									_hover={{
										transform: 'translateY(-2px)',
										boxShadow: 'lg',
									}}
									onClick={() => router.push(`/edit/${todo._id}`)}>
									Edit
								</Button>
							</HStack>
						</Box>
					</WrapItem>
				);
			})}
		</>
	);
};

const TheBox = ({ children }) => (
	<WrapItem>
		<Box
			p='4'
			isTruncated
			borderRadius='3xl'
			shadow='lg'
			textAlign='center'
			fontSize='3xl'
			fontFamily='sans-serif'
			fontWeight='bold'
			color='blue.500'>
			{children}
		</Box>
	</WrapItem>
);

export default function Main({ data }) {
	const snap = useSnapshot(state);
	useEffect(() => {
		state.todos = data.data;
	}, [data]);

	return (
		<>
			<Center m='5%'>
				<span
					style={{
						fontSize: '6rem',
						fontWeight: 'bold',
						color: `${colors.green}`,
						transform: 'rotate(-20deg)',
					}}>
					J
				</span>
				<Text
					mb='4'
					mr='2'
					ml='4'
					letterSpacing='wider'
					fontSize='4xl'
					fontWeight='bold'
					color={colors.green}
					textOverflow='ellipsis'
					isTruncated
					fontFamily='sans-serif'>
					UST DO I
				</Text>
				<span
					style={{
						fontSize: '6rem',
						fontWeight: 'bold',
						color: `${colors.green}`,
						transform: 'rotate(20deg)',
					}}>
					T
				</span>
			</Center>
			<AddTodo />
			<Wrap justify='space-around' ml='5%'>
				<TheBox>
					<FcTodoList size='8rem' />
					{snap.todos.length}
				</TheBox>

				<TheBox>
					<FcOk size='8rem' />
					{snap.todos.filter((t) => t.isDone).length}
				</TheBox>

				<TheBox>
					<FcSportsMode size='8rem' />
					{snap.todos.filter((t) => !t.isDone).length}
				</TheBox>
			</Wrap>
			<Center py={6}>
				<Wrap justify='center' spacing='8'>
					<ShowTodo />
				</Wrap>
			</Center>
		</>
	);
}
